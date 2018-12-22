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

class MealCompletionButtons extends React.Component {
  state = { }

  render() {
    let phase = this.props.phase;
    let currentMeal = this.props.currentMeal;

    let meal1 = phase === 1 ? this.props.phase1meal1 :
                phase === 2 ? this.props.phase2meal1 :
                phase === 3 ? this.props.phase3meal1 : null;
    let meal2 = phase === 1 ? this.props.phase1meal2 :
                phase === 2 ? this.props.phase2meal2 :
                phase === 3 ? this.props.phase3meal2 : null;
    let meal3 = phase === 1 ? this.props.phase1meal3 :
                phase === 2 ? this.props.phase2meal3 :
                phase === 3 ? this.props.phase3meal3 : null;
    let meal4 = phase === 1 ? this.props.phase1meal4 :
                phase === 2 ? this.props.phase2meal4 :
                phase === 3 ? this.props.phase3meal4 : null;
    let meal5 = phase === 3 ? this.props.phase3meal5 : null;

    return (
      <View style={styles.wrapper}>
        <View style={styles.innerWrapper}><TouchableHighlight
           style={[Styles.buttonCircular, styles.progressButtonGood,
             (currentMeal === 0 && meal1 === 1) ? styles.completedMealButton :
             (currentMeal === 1 && meal2 === 1) ? styles.completedMealButton :
             (currentMeal === 2 && meal3 === 1) ? styles.completedMealButton :
             (currentMeal === 3 && meal4 === 1) ? styles.completedMealButton :
             (currentMeal === 4 && meal5 === 1) ? styles.completedMealButton : styles.incompleteMealButton]}
           underlayColor={Colors.darkerPrimaryColor}
           onPress={() => { this.props.completeMeal(phase, currentMeal, 1) }}>
            <Text style={[Styles.buttonCircularIcon, styles.progressButtonText,
              (currentMeal === 0 && meal1 === 1) ? styles.completedMealButtonText :
              (currentMeal === 1 && meal2 === 1) ? styles.completedMealButtonText :
              (currentMeal === 2 && meal3 === 1) ? styles.completedMealButtonText :
              (currentMeal === 3 && meal4 === 1) ? styles.completedMealButtonText :
              (currentMeal === 4 && meal5 === 1) ? styles.completedMealButtonText : styles.incompleteMealButtonText]}>
              <FontAwesome
                style={styles.progressButtonGoodIcon}
                name='check'
                size={16}
              />
            </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[Styles.buttonCircular, styles.progressButtonBad,
          (currentMeal === 0 && meal1 === 2) ? styles.completedMealButtonBad :
          (currentMeal === 1 && meal2 === 2) ? styles.completedMealButtonBad :
          (currentMeal === 2 && meal3 === 2) ? styles.completedMealButtonBad :
          (currentMeal === 3 && meal4 === 2) ? styles.completedMealButtonBad :
          (currentMeal === 4 && meal5 === 2) ? styles.completedMealButtonBad : styles.incompleteMealButtonBad]}
          underlayColor={Colors.darkerRed}
          onPress={() => { this.props.completeMeal(phase, currentMeal, 2) }}>
           <Text style={[Styles.buttonCircularIcon, styles.progressButtonText,
              (currentMeal === 0 && meal1 === 2) ? styles.completedMealButtonBad :
              (currentMeal === 1 && meal2 === 2) ? styles.completedMealButtonBad :
              (currentMeal === 2 && meal3 === 2) ? styles.completedMealButtonBad :
              (currentMeal === 3 && meal4 === 2) ? styles.completedMealButtonBad :
              (currentMeal === 4 && meal5 === 2) ? styles.completedMealButtonBad : styles.incompleteMealButtonTextBad]}>
              <FontAwesome
                style={styles.progressButtonBadIcon}
                name='remove'
                size={16} />
          </Text>
        </TouchableHighlight></View>
      </View>
     );
   }
}

export default MealCompletionButtons;

MealCompletionButtons.propTypes = { };

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 40
  },
  innerWrapper: {
    flexDirection: 'row'
  },

  progressButtonText: {
    textAlign: 'center',
    color: Colors.white
  },
  progressButtonGood: {
    marginRight: 5
  },
  progressButtonGoodIcon: {
    color: Colors.white
  },
  progressButtonBadIcon: {
    color: Colors.white
  },
  progressButtonBad: {
    backgroundColor: Colors.paleRed,
    marginLeft: 5
  },

  completedMealButton: {
    backgroundColor: Colors.primaryColor
  },
  completedMealButtonText: {
    color: Colors.white
  },
  completedMealButtonBad: {
    backgroundColor: Colors.paleRed
  },
  completedMealButtonTextBad: {
    color: Colors.white
  },
  incompleteMealButton: {
    backgroundColor: Colors.darkGray
  },
  incompleteMealButtonBad: {
    backgroundColor: Colors.darkGray
  },
  incompleteMealButtonText: {
    color: Colors.darkGray
  },
  incompleteMealButtonTextBad: {
    color: Colors.white
  },
  completedPhaseTwoMeal: {
    backgroundColor: Colors.primaryColor
  },
  incompletePhaseTwoMeal: {
    backgroundColor: Colors.gray
  },
  incompletePhaseTwoMealText: {
    color: Colors.darkGray
  }
});
