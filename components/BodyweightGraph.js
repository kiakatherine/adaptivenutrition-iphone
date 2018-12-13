import React from 'react';
import { AsyncStorage } from 'react-native';
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

class BodyweightGraph extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      showAllData: false,
      showConfirmDeleteEntry: false
    }
   }

   confirmDeleteEntry(weight, date) {
     this.setState({
       showConfirmDeleteEntry: true,
       weightToDelete: weight,
       dateToDelete: date
     });
   }

   async clickDeleteDataPoint() {
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    //  const uid = firebase.auth().currentUser.uid;
     const records = this.props.data;
     let recordKey;
     const weight = this.state.weightToDelete;
     const date = this.state.dateToDelete;
     
     let weightObjRef;
     let clientWeightRef;

     records.map(rec => {
       if(rec.record.date === date) {
         recordKey = rec.key
       }
     })

     clientWeightRef = firebase.database().ref('/clients/' + uid + '/weights/' + recordKey);
     weightObjRef = firebase.database().ref('/weights/' + recordKey);

     clientWeightRef.remove();

     weightObjRef.remove((error) => {
       // TO DO: these aren't firing
       if(error) {
         alert('failed');
       } else {
         // alert('success!');
         this.setState({
           showTooltip: false,
           showConfirmDeleteEntry: false,
           tooltipWeight: null,
           tooltipDate: null,
           tooltipX: null,
           tooltipY: null
         }, () => {
           this.props.sortingWeightByDate()
         });
       }
     });
   }

   render() {
     const data = this.props.data;
     let sortedData = [];

     if(data) {
       data.map(dt => {
         sortedData.push({
           date: dt.record.date,
           weight: dt.record.weight,
           key: dt.key
         })
       })      
     }
     sortedData = sortedData.reverse();

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
            }}
            >
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

          {this.state.showConfirmDeleteEntry &&
            <View style={[Styles.tooltip, {height: '100%'}]}>
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
            </View>}
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
