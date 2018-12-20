import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Image,
  Keyboard,
  Modal,
  Picker,
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
import * as labels from '../constants/MealLabels';

class MealOption extends React.Component {
  state = { }

  render() {
    const phase = this.props.phase;
    const currentMeal = this.props.currentMeal;
    const mealsBeforeWorkout = this.props.mealsBeforeWorkout;
    const trainingIntensity = this.props.trainingIntensity;
    let isPwo = false;
    let time;
    const mealNumber = Number(this.props.mealNumber) - 1;

    // label
    if(phase === 3) {
      if(trainingIntensity === 0) {
        label = labels.x.low[mealNumber];
      } else if(trainingIntensity === 1) {
        label = labels.x.moderate[mealsBeforeWorkout][mealNumber];
      } else if(trainingIntensity === 2) {
        label = labels.x.high[mealsBeforeWorkout][mealNumber];
      }
    } else {
      label = labels.x.low[mealNumber];
    }

    // pwo
    if(label && label.indexOf('PWO') > -1) {
      isPwo = true;
    }

    // timing
    if(isPwo) {
      time = 'Post-workout';
    } else if(label === 'Breakfast') {
      time = this.props.breakfastTime;
    } else if(label === 'Lunch 1') {
      time = this.props.earlyLunchTime;
    } else if(label === 'Lunch 2') {
      time = this.props.lateLunchTime;
    } else if(label === 'Dinner') {
      time = this.props.dinnerTime;
    }

    return (
      <View style={[Styles.flexCol, {alignItems: 'center'}]}>
        <TouchableHighlight
          style={[styles.mealOption, currentMeal === mealNumber ? styles.mealOptionSelected : null]}
          underlayColor={Colors.white}
          onPress={() => { this.props.saveCurrentMeal(mealNumber) }}>
          <Text style={[Styles.textCenter,
            Styles.uppercaseText,
            styles.mealOptionText,
            mealNumber === 0 ? styles.mealOptionTextSelected : null]}>
              {label}
          </Text>
        </TouchableHighlight>

        <Text style={[Styles.uppercaseText, styles.mealTime]}>
          {currentMeal === mealNumber ? time : null}
        </Text>
      </View>
     );
   }
}

export default MealOption;

MealOption.propTypes = { };

const styles = StyleSheet.create({
  mealOption: {
    alignSelf: 'center',
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: Colors.white
  },
  mealOptionSelected: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.black
  },
  mealOptionText: {
    fontSize: 12
  },
  mealTime: {
    fontSize: 12,
    paddingTop: 10,
    letterSpacing: 0
    // textAlign: 'center'
  }
});
