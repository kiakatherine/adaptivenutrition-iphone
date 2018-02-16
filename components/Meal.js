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
import * as labels from '../constants/MealLabels';

import FoodOptions from './FoodOptions';

class Meal extends React.Component {
   state = {
     selected: false,
   }

   render() {
     let label;
     let time;
     let bedtime = false;
     let pwo = false;

     // label
     if(this.props.trainingIntensity === 0) {
       label = labels.x.low[this.props.currentMeal];
     } else if(this.props.trainingIntensity === 1) {
       label = labels.x.moderate[this.props.mealsBeforeWorkout][this.props.currentMeal];
     } else if(this.props.trainingIntensity === 2) {
       label = labels.x.high[this.props.mealsBeforeWorkout][this.props.currentMeal];
     }

     // bedtime
     if(this.props.trainingIntensity === 0 && this.props.currentMeal === 4) {
       bedtime = true;
     } else if(this.props.phase === 3 && this.props.trainingIntensity > 0 && this.props.currentMeal === 5) {
       bedtime = true;
     }

     // pwo
     if(label.indexOf('PWO') > -1) {
       pwo = true;
     }

     // timing
     if(bedtime) {
       time = 'Before bed';
     } else if (pwo) {
       time = 'Post-workout';
     } else if(label === 'Breakfast') {
       time = this.props.breakfastTime;
     } else if(label === 'Early lunch') {
       time = this.props.earlyLunchTime;
     } else if(label === 'Late lunch') {
       time = this.props.lateLunchTime;
     } else if(label === 'Dinner') {
       time = this.props.dinnerTime;
     }

     return (
       <View style={styles.mealContainer}>
        <View style={styles.mealRowHeader}>
          <Text style={styles.mealRowHeaderCol}>{label.toUpperCase()}</Text>
          <Text style={styles.mealRowHeaderColTime}>{this.props.timing}{time}</Text>
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Protein</Text>
          <FoodOptions style={styles.mealRowColLong}
            macro='protein'
            sources={this.props.proteins}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            bedtime={bedtime}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Starches</Text>
          <FoodOptions style={styles.mealRowColLong}
            macro='carbs'
            sources={this.props.carbs}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            template={this.props.template}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            bedtime={bedtime}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Fats</Text>
          <FoodOptions style={styles.mealRowColLong}
            macro='fats'
            sources={this.props.fats}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            template={this.props.template}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            bedtime={bedtime}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>

        {!this.props.showInGrams && <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Veggies</Text>
          <FoodOptions style={styles.mealRowColLong}
            macro='veggies'
            sources={this.props.veggies}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            template={this.props.template}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            bedtime={bedtime}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>}
       </View>
     );
   }
}

export default Meal;

Meal.propTypes = {
  trainingIntensity: PropTypes.number,
  mealsBeforeWorkout: PropTypes.number,
  template: PropTypes.number,
  currentMeal: PropTypes.number,
  age: PropTypes.number,
  gender: PropTypes.string,
  height: PropTypes.number,
  bodyweight: PropTypes.number,
  bodyfat: PropTypes.number,
  showInGrams: PropTypes.bool
};

const styles = StyleSheet.create ({
  mealContainer: {
    marginTop: 30,
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
  },
  mealRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  mealRowCol: {
    flex: 1
  },
  mealRowColLong: {
    flex: 2
  },
  mealRowHeader: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
  },
  mealRowHeaderCol: {
    width: '50%',
    letterSpacing: 1
  },
  mealRowHeaderColTime: {
    width: '50%',
    textAlign: 'right',
    letterSpacing: 1
  }
});
