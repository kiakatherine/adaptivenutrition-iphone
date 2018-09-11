import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../services/FirebaseService';

import { LineChart, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { Circle, G, Line, Rect } from 'react-native-svg';
import * as shape from 'd3-shape';
import moment from 'moment';
import { formatBodyweightLogDate } from '../utils/helpers';

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
      showAllData: false
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

   clickDeleteDataPoint() {
     const records = this.props.data;
     let recordKey;

     Object.keys(records).map(key => {
       const obj = records[key];
       if(Number(obj.timestamp) === Number(this.props.clientTimestamp)) {
         if(obj.date === this.state.tooltipDate) {
           recordKey = key;
         }
       }
     });

     const recordRef = firebase.database().ref('bodyweightRecords/' + recordKey);
     recordRef.remove();

     this.setState({
       showTooltip: false,
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
      let dates, weights;

      // filter bodyweight records by client
      // if(obj) {
        // Object.keys(obj).map(function(key) {
        //   if(Number(obj[key].timestamp) === timestamp) {
        //     data.push({
        //       date: obj[key].date,
        //       weight: obj[key].weight
        //     });
        //   }
        // });

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
            var dateA = moment(a.date, "MM-DD-YY");
            var dateB = moment(b.date, "MM-DD-YY");

            return dateB - dateA;
          });

          let datesArr = [];

          dates = Object.keys(data).map(key => {
            datesArr.push(data[key].date);
          });

          dates = datesArr.reverse();

          let weightsArr = [];

          weights = Object.keys(data).map(key => {
            weightsArr.push(data[key].weight);
          });

          weights = weightsArr.reverse();
        });
      // }

      // const keys = ['weight'];
      // const colors = [Colors.paleGreen];
      //
      // return (
      //     <ScrollView>
      //       <StackedAreaChart
      //         style={{ height: 200, paddingVertical: 16 }}
      //         data={data}
      //         keys={keys}
      //         colors={colors}
      //         showGrid={false}
      //         renderDecorator={({ x, y, index, value }) => (
      //           <G
      //             onResponderMove={this.onMove}
      //             onPressIn={this.onPressIn}
      //             onPressOut={this.onPressOut.bind(this, index)}
      //             onPress={() => {this.clickDataPoint(value, x, y, index, dates)}} key={index}>
      //           <Circle
      //             cx={x(index)}
      //             cy={y(value)}
      //             r={6}
      //             stroke={Colors.paleGreen}
      //             fill={Colors.paleGreen}
      //           />
      //           <Text x={x(index)} y={y(value)} font-family="Verdana" font-size="35">hi</Text>
      //           </G>)}
      //       />
      //     </ScrollView>
      // );

        return (
          <View>
          {this.state.showTooltip &&
            <View style={styles.tooltip}>
              <Text style={styles.tooltipWeight}>{this.state.tooltipWeight} lbs</Text>
              <Text style={styles.tooltipDate} key={'tooltip'}>{this.state.tooltipDate}</Text>
              <TouchableHighlight
                onPress={() => { this.clickDeleteDataPoint() }}>
                <FontAwesome
                  name='trash'
                  size={24}
                  style={styles.trashIcon}
                />
              </TouchableHighlight>
            </View>}

            {weights && <ScrollView
              style={{ width: '100%' }}
              horizontal={true}
              alwaysBounceHorizontal={true}
              showsHorizontalScrollIndicator={true}>
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
              {data && data.map((rec, i) =>
                <View style={styles.bodyweightLogWrapper} key={i}>
                  <Text>{rec.weight}</Text>
                  <View style={{ height: Number(rec.weight), width: 15, marginRight: 30, backgroundColor: Colors.white }}>
                    <TouchableHighlight
                      underlayColor={Colors.darkerPrimaryColor}
                      style={{ borderRadius: 100, height: 10, width: 10, backgroundColor: Colors.primaryColor }}
                      onPress={() => { this.clickDeleteDataPoint() }}>
                      <Text></Text>
                    </TouchableHighlight>
                  </View>
                </View>)}
            </ScrollView>}

            {!weights && <View>
                <Text style={Styles.loadingMessage}>No bodyweight data yet</Text>
              </View>}

            {!this.props.data &&
              <Text style={[Styles.loadingMessage, styles.loadingMessage]}>Getting data...</Text>}

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
    paddingTop: 10,
    height: 300,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray
  }
});
