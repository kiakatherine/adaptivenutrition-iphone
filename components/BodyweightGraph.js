import React from 'react';
import PropTypes from 'prop-types';

import { StackedAreaChart, YAxis } from 'react-native-svg-charts';
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

class BodyweightGraph extends React.Component {
   render() {
      const colors = [Colors.paleGreen];
      const keys = ['weight'];
      const obj = this.props.data;
      const timestamp = Number(this.props.clientTimestamp);
      let data = [];

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

      const x = Object.keys(data).map(function(key) {
        return data[key].date;
      });

      return (
          <ScrollView>
            <StackedAreaChart
              style={{ height: 200, paddingVertical: 16 }}
              data={data}
              keys={keys}
              colors={colors}
              showGrid={false}
            />
            <Text>{x}</Text>
          </ScrollView>
      );
   }
}

export default BodyweightGraph;

BodyweightGraph.propTypes = { };

const styles = StyleSheet.create ({ });
