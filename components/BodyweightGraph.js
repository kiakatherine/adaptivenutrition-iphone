import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../services/FirebaseService';

import { LineChart, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { Circle, G, Line, Rect } from 'react-native-svg';
import * as shape from 'd3-shape';
import moment from 'moment';
import { formatBodyweightLogDate, toDate } from '../utils/helpers';

import {
  Button,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

// onPressIn, onPressOut, and onMove from
// https://github.com/FormidableLabs/victory-native/issues/25

class BodyweightGraph extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      showAllData: false,
      showConfirmDeleteEntry: false
    }
   }

   clickDataPoint(value, x, y, index, dates) {
     // alert(index)
     this.setState({
       showTooltip: true,
       tooltipWeight: value,
       tooltipDate: dates[index],
       tooltipX: x(index),
       tooltipY: y(index)
     });
   }

   clickShowAllData() {
     this.setState({
       showAllData: !this.state.showAllData,
       showTooltip: false
     });
   }

   confirmDeleteEntry(weight, date) {
     this.setState({
       showConfirmDeleteEntry: true,
       weightToDelete: weight,
       dateToDelete: date
     });
   }

   clickDeleteDataPoint() {
     const records = this.props.data;
     let recordKey;
     const weight = this.state.weightToDelete;
     const date = this.state.dateToDelete;

     Object.keys(records).map(key => {
       const obj = records[key];
       if(Number(obj.timestamp) === Number(this.props.clientTimestamp)) {
         if(obj.date === date) {
           recordKey = key;
         }
       }
     });

     const recordRef = firebase.database().ref('bodyweightRecords/' + recordKey);
     recordRef.remove();

     this.setState({
       showTooltip: false,
       showConfirmDeleteEntry: false,
       tooltipWeight: null,
       tooltipDate: null,
       tooltipX: null,
       tooltipY: null
     });
   }

   onPressIn({nativeEvent:{locationX,locationY, target}}) {
    // Android will send multiple events with different targets
    // so we will store the target so we may filter move events
    this.pressInfo = {
      startX: locationX,
      startY: locationY,
      lastX: locationX,
      lastY: locationY,
      target: target
    }
  }

   onMove({nativeEvent:{locationX,locationY, target}}) {
    if (this.pressInfo && this.pressInfo.target == target) {
      this.pressInfo.lastX = locationX
      this.pressInfo.lastY = locationY
    }
  }

   onPressOut(item,{nativeEvent:{locationX,locationY,target}}) {

    // locationX and LocationY are undefined on iOS if the event
    // was cancelled by a pan/scroll type action. On Android it seems
    // to return the coordinates at the moment it was cancelled, so we
    // will have to distance (radius) test.
    //
    // Note1: Logging the onResponderMove shows Android emits two move events for
    //        each move, each with different targets. Also the onPressIn event
    //        will see a different target than the onPressOut event, so
    //        we will filter onResponderMove events for the target used during
    //        the onPressIn event and ignore the one for onPressOut

    if (locationX == undefined || !this.pressInfo) {
      return;
    }

    // adjust move distance as required, 3 seems to work, anything larger is
    // likely a pan/scroll type situation, or a very fat thumb
    if (Math.abs(
          Math.sqrt(
            Math.pow((this.pressInfo.lastX - this.pressInfo.startX), 2) +
            Math.pow((this.pressInfo.lastY - this.pressInfo.startY), 2)
          )
        ) > 3) {
      return;
    }

     // emulated onPress happened - DO YOUR ONPRESS WORK HERE
  }

   render() {
      // const obj = this.props.data;
      const bodyweightRecords = firebase.database().ref().child('bodyweightRecords');
      const timestamp = Number(this.props.clientTimestamp);
      let data = [];
      let sortedData;

      bodyweightRecords.once('value', snapshot => {
        d = snapshot.val();

        Object.keys(d).map(function(key) {
          if(Number(d[key].timestamp) === timestamp) {
            // ref = firebase.database().ref('bodyweightRecords/' + key);
            // ref.remove();

            data.push({
              date: d[key].date,
              weight: d[key].weight,
              key
            });
          }
        });

        // sort dates
        data = data.sort(function compare(a, b) {
          var dateA = toDate(a.date);
          var dateB = toDate(b.date);

          return dateB - dateA;
        });

        let dataArr = [];

        sortedData = Object.keys(data).map(key => {
          dataArr.push({
            date: data[key].date,
            weight: data[key].weight
          });
        });

        sortedData = dataArr.reverse();
      });

      return (
        <View>
        {this.state.showTooltip &&
          <View style={styles.tooltip}>
            <Text style={styles.tooltipWeight}>{this.state.tooltipWeight} lbs</Text>
            <Text style={styles.tooltipDate} key={'tooltip'}>{this.state.tooltipDate}</Text>
            <TouchableHighlight
              onPress={() => { this.confirmDeleteEntry() }}>
              <FontAwesome
                name='trash'
                size={24}
                style={styles.trashIcon}
              />
            </TouchableHighlight>
          </View>}

          {sortedData && <ScrollView
            style={{ width: '100%' }}
            horizontal={true}
            alwaysBounceHorizontal={true}
            showsHorizontalScrollIndicator={true}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{
                this.scrollView.scrollToEnd({animated: true});
            }}>
            {/*<LineChart
              style={{ width: (this.state.showAllData ? weights.length*10 : '100%'), minWidth: '100%', height: 200 }}
              data={weights}
              svg={{
                stroke: Colors.paleGreen,
                strokeWidth: 3,
              }}
              contentInset={{ top: 20, bottom: 20 }}
              curve={shape.curveLinear}
              showGrid={false}
              renderDecorator={({ x, y, index, value }) => (
                <G
                  onResponderMove={this.onMove}
                  onPressIn={this.onPressIn}
                  onPressOut={this.onPressOut.bind(this, index)}
                  onPress={() => {this.clickDataPoint(value, x, y, index, dates)}} key={index}>
                  <Circle
                    cx={x(index)}
                    cy={y(value)}
                    r={this.state.showAllData ? 10 : 0}
                    fill={Colors.paleGreen}
                  />
                </G>
              )}
            />*/}
            {sortedData && sortedData.map((rec, i) =>
              <View style={styles.bodyweightLogWrapper} key={i}>
                <Text>{rec.weight}</Text>
                <View style={{ height: Number(rec.weight), width: 35, marginLeft: 10, marginRight: 10, backgroundColor: Colors.white }}>
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    onPress={() => { this.confirmDeleteEntry(rec.weight, rec.date) }}>
                    <View style={{ backgroundColor: Colors.primaryColor, borderRadius: 100, width: 10, height: 10 }}></View>
                  </TouchableHighlight>
                </View>
                <Text>{formatBodyweightLogDate(rec.date)}</Text>
              </View>)}
          </ScrollView>}

          {!sortedData && <View>
              <Text style={Styles.loadingMessage}>No bodyweight data yet</Text>
            </View>}

          {!this.props.data &&
            <Text style={[Styles.loadingMessage, styles.loadingMessage]}>Getting data...</Text>}

          {this.state.showConfirmDeleteEntry &&
            <ScrollView style={Styles.tooltip}>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={() => { this.setState({ showConfirmDeleteEntry: false }) }}>
                <FontAwesome
                  style={[Styles.textCenter, Styles.tooltipClose]}
                  name='remove'
                  size={24}
                />
              </TouchableHighlight>
              <Text style={Styles.tooltipParagraph}>{'Are you sure you want to delete this entry?'}</Text>
              <TouchableHighlight
                underlayColor={Colors.darkerPrimaryColor}
                style={Styles.button}
                onPress={() => { this.clickDeleteDataPoint() }}>
                <Text style={Styles.buttonText}>Yes</Text>
              </TouchableHighlight>
            </ScrollView>}

          {/*{this.props.data &&
            <TouchableHighlight style={Styles.button} onPress={() => { this.clickShowAllData(); }}>
              <Text style={Styles.buttonText}>{this.state.showAllData ? 'Zoom out' : 'Zoom in'}</Text>
            </TouchableHighlight>} */}
        </View>
      );
   }
}

export default BodyweightGraph;

BodyweightGraph.propTypes = { };

const styles = StyleSheet.create ({
  tooltip: {
    backgroundColor: Colors.paleBlue,
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  tooltipWeight: {
    flex: 1,
    fontSize: 18
  },
  tooltipDate: {
    flex: 1,
    fontSize: 18
  },
  trashIcon: {
    flex: 1,
    textAlign: 'right'
  },
  loadingMessage: {
    marginBottom: 20
  },
  bodyweightLogWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 10,
    paddingBottom: 10,
    height: 300,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray
  }
});
