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
import MealOption from './MealOption';

class MealOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }

    this._saveCurrentMeal = this._saveCurrentMeal.bind(this);
  }

  _saveCurrentMeal(meal) {
    this.props.saveCurrentMeal(meal);
  }

  render() {
    const phase = this.props.phase;
    const currentMeal = this.props.currentMeal;
    const mealsBeforeWorkout = this.props.mealsBeforeWorkout;
    const trainingIntensity = this.props.trainingIntensity;
    const meals = phase === 3 ? [1,2,3,4,5] : [1,2,3,4];

    return (
      <View style={[Styles.flexRow, styles.mealOptions]}>
        {meals.map(i => <MealOption
          key={i}
          mealNumber={i}
          phase={phase}
          currentMeal={currentMeal}
          mealsBeforeWorkout={mealsBeforeWorkout}
          trainingIntensity={trainingIntensity}
          saveCurrentMeal={this._saveCurrentMeal} />)}
      </View>
     );
   }
}

export default MealOptions;

MealOptions.propTypes = { };

const styles = StyleSheet.create({
  mealOptions: {
    marginTop: 10,
    marginBottom: 30
  }
});
