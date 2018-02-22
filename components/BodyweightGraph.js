import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { Circle, G, Line, Rect } from 'react-native-svg';
import * as shape from 'd3-shape';
import moment from 'moment';

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

import { calculateSevenDayAverageBodyweight } from '../utils/helpers';

// onPressIn, onPressOut, and onMove from
// https://github.com/FormidableLabs/victory-native/issues/25

class BodyweightGraph extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      showTooltip: false
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
      const obj = this.props.data;
      const timestamp = Number(this.props.clientTimestamp);
      let data = [];

      // filter bodyweight records by client
      if(obj) {
        Object.keys(obj).map(function(key) {
          if(Number(obj[key].timestamp) === timestamp) {
            data.push({
              date: obj[key].date,
              weight: obj[key].weight
            });
          }
        });
      }

      // order data by date
      data = data.sort((a,b) => {
        a = a.date.split('-').reverse().join('');
        b = b.date.split('-').reverse().join('');
        return a > b ? 1 : a < b ? -1 : 0;
      });

      data = data.sort((a, b) => {
        return a - b;
      });

      const dates = Object.keys(data).map(key => {
        return data[key].date;
      });

      const weights = Object.keys(data).map(key => {
        return data[key].weight;
      });

      const sevenDayAverage = calculateSevenDayAverageBodyweight(data);

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
            <Text>{sevenDayAverage}</Text>
            <LineChart
              style={{ height: 200 }}
              data={weights}
              svg={{
                stroke: Colors.paleGreen,
                strokeWidth: 1,
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
                  r={6}
                  stroke={Colors.paleGreen}
                  fill={Colors.paleGreen}
                />
                <Text x={x(index)} y={y(value)} font-family="Verdana" font-size="35">hi</Text>
                </G>
              )}
            />
            {this.state.showTooltip &&
              <Text key={'tooltip'}>{this.state.locationX} {this.state.locationY} {this.state.tooltipX} {this.state.tooltipY} {this.state.tooltipDate} : {this.state.tooltipWeight}</Text>}
          </View>
        );
   }
}

export default BodyweightGraph;

BodyweightGraph.propTypes = { };

const styles = StyleSheet.create ({ });
