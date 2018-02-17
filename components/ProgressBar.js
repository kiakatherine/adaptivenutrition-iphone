import React from 'react';
import PropTypes from 'prop-types';

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

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

class ProgressBar extends React.Component {
   // state = {
   //   selection: this.props.selection || null
   // }

   render() {
     return (
       <View style={styles.progressBar}>
        <View style={[styles.meal, this.props.complete1 === 1 ? styles.complete : '', this.props.complete1 === 2 ? styles.incomplete : '']}></View>
        <View style={[styles.meal, this.props.complete2 === 1 ? styles.complete : '', this.props.complete2 === 2 ? styles.incomplete : '']}></View>
        <View style={[styles.meal, this.props.complete3 === 1 ? styles.complete : '', this.props.complete3 === 2 ? styles.incomplete : '']}></View>
        <View style={[styles.meal, this.props.complete4 === 1 ? styles.complete : '', this.props.complete4 === 2 ? styles.incomplete : '']}></View>
        <View style={[styles.meal, this.props.trainingIntensity > 0 ? '' : styles.lastMeal, this.props.complete5 === 1 ? styles.complete : '', this.props.complete5 === 2 ? styles.incomplete : '']}></View>
        {this.props.trainingIntensity > 0 && <View style={[styles.meal, styles.lastMeal, this.props.complete6 === 1 ? styles.complete : '', this.props.complete6 === 2 ? styles.incomplete : '']}></View>}
       </View>
     );
   }
}

export default ProgressBar;

ProgressBar.propTypes = {
  trainingIntensity: PropTypes.number
};

const styles = StyleSheet.create ({
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20
  },
  meal: {
    flex: 1,
    height: 20,
    backgroundColor: Colors.lightGray,
    marginRight: 5
  },
  lastMeal: {
    marginRight: 0
  },
  complete: {
    backgroundColor: Colors.paleGreen
  },
  incomplete: {
    backgroundColor: Colors.paleRed
  }
});
