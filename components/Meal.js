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

import FoodOptions from './FoodOptions';
import MeasurementInput from './MeasurementInput';
import MealCompletionButtons from './MealCompletionButtons';

class Meal extends React.Component {
   constructor(props) {
     super(props);

     this.state = {
       selected: false
     }

     this._clickCompleteMeal = this._clickCompleteMeal.bind(this);
   }

   _clickCompleteMeal(phase, currentMeal, completion) {
     this.props.completeMeal(phase, currentMeal, completion);
   }

   render() {
     let label;
     let time;
     let pwo = false;
     let viewAllMeals = this.props.viewAllMeals;
     let phase = this.props.phase;
     let currentMeal = this.props.currentMeal;

     let proteinMeasurementInput = 0;
     let carbMeasurementInput = 0;
     let fatMeasurementInput = 0;
     let veggieMeasurementInput = 0;

     // // label
     // if(this.props.phase === 3) {
     //   if(this.props.trainingIntensity === 0) {
     //     label = labels.x.low[this.props.currentMeal];
     //   } else if(this.props.trainingIntensity === 1) {
     //     label = labels.x.moderate[this.props.mealsBeforeWorkout][this.props.currentMeal];
     //   } else if(this.props.trainingIntensity === 2) {
     //     label = labels.x.high[this.props.mealsBeforeWorkout][this.props.currentMeal];
     //   }
     // } else {
     //   label = labels.x.low[this.props.currentMeal];
     // }
     //
     // // pwo
     // if(this.props.pwo || label && label.indexOf('PWO') > -1) {
     //   pwo = true;
     // }
     //
     // // timing
     // if(pwo) {
     //   time = 'Post-workout';
     // } else if(label === 'Breakfast') {
     //   time = this.props.breakfastTime;
     // } else if(label === 'Early lunch') {
     //   time = this.props.earlyLunchTime;
     // } else if(label === 'Late lunch') {
     //   time = this.props.lateLunchTime;
     // } else if(label === 'Dinner') {
     //   time = this.props.dinnerTime;
     // }

     return (
       <View style={styles.mealContainer}>
        <View style={styles.mealRowHeader}>
          <View style={styles.mealRowHeaderColLong}>
            {/*<Text style={[styles.mealRowHeaderColText, styles.mealLabel]}>{label ? label: ''}</Text>*/}
            {/*<Text style={styles.mealRowHeaderColText}>{this.props.timing}{time}</Text>*/}
          </View>
        </View>

        {!viewAllMeals &&
          <MealCompletionButtons
            currentMeal={currentMeal}
            phase={phase}
            phase1meal1={this.props.phase1meal1}
            phase1meal2={this.props.phase1meal2}
            phase1meal3={this.props.phase1meal3}
            phase1meal4={this.props.phase1meal4}
            phase2meal1={this.props.phase2meal1}
            phase2meal2={this.props.phase2meal2}
            phase2meal3={this.props.phase2meal3}
            phase2meal4={this.props.phase2meal4}
            phase3meal1={this.props.phase3meal1}
            phase3meal2={this.props.phase3meal2}
            phase3meal3={this.props.phase3meal3}
            phase3meal4={this.props.phase3meal4}
            phase3meal5={this.props.phase3meal5}
            completeMeal={this._clickCompleteMeal} />}

        <View style={styles.mealRow}>
          <View style={Styles.flexRow}>
            <Text style={styles.mealRowColPhase3}>PROTEIN OPTIONS</Text>
            {this.props.phase < 3 && <Image source={require('../assets/icons/protein.png')}
              style={{ width: 60, height: 60, resizeMode: 'contain', alignItems: 'flex-start' }} />}
          </View>

          <FoodOptions style={styles.mealRowColLong}
            macro='protein'
            sources={this.props.proteins}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            template={this.props.template}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>

        <View style={styles.mealRow}>
          <View style={Styles.flexRow}>
            <Text style={styles.mealRowColPhase3}>STARCH OPTIONS</Text>
            {this.props.phase < 3 && this.props.trainingIntensity === 1 &&
              <Image source={require('../assets/icons/carbs-training.png')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />}
            {this.props.phase < 3 && this.props.trainingIntensity === 0 &&
              <Image source={require('../assets/icons/carbs-rest.png')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />}
          </View>

          <FoodOptions style={styles.mealRowColLong}
            macro='carbs'
            sources={this.props.carbs}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            template={this.props.template}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>

        <View style={styles.mealRow}>
          <View style={Styles.flexRow}>
            <Text style={styles.mealRowColPhase3}>FAT OPTIONS</Text>
            {this.props.phase < 3 && <Image source={require('../assets/icons/fats.png')}
              style={{ width: 60, height: 60, resizeMode: 'contain' }} />}
          </View>

          <FoodOptions style={styles.mealRowColLong}
            macro='fats'
            sources={this.props.fats}
            trainingIntensity={this.props.trainingIntensity}
            mealsBeforeWorkout={this.props.mealsBeforeWorkout}
            template={this.props.template}
            phase={this.props.phase}
            currentMeal={this.props.currentMeal}
            pwo={pwo}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showInGrams={this.props.showInGrams} />
        </View>

        {!this.props.showInGrams && <View style={styles.mealRow}>
          {this.props.phase === 3 &&
            <View>
              <Text style={styles.mealRowColPhase3}>VEGGIES</Text>

              <FoodOptions style={styles.mealRowColLong}
                macro='veggies'
                sources={this.props.veggies}
                trainingIntensity={this.props.trainingIntensity}
                mealsBeforeWorkout={this.props.mealsBeforeWorkout}
                template={this.props.template}
                phase={this.props.phase}
                currentMeal={this.props.currentMeal}
                pwo={pwo}
                age={this.props.age}
                gender={this.props.gender}
                height={this.props.height}
                bodyweight={this.props.bodyweight}
                bodyfat={this.props.bodyfat}
                showInGrams={this.props.showInGrams} />
            </View>}

          {this.props.phase < 3 &&
            <View>
              <Text style={styles.mealRowColPhase3}>VEGGIES</Text>
              <Text style={styles.macroLabelsWithIconPhase2}>Portion size</Text>
              <Image source={require('../assets/icons/veggies.jpg')}
                style={{ width: 60, height: 60, resizeMode: 'contain' }} />
            </View>}
        </View>}
       </View>
     );
   }
}

export default Meal;

Meal.propTypes = {
  // trainingIntensity: PropTypes.number,
  mealsBeforeWorkout: PropTypes.number,
  template: PropTypes.number,
  currentMeal: PropTypes.number,
  age: PropTypes.number,
  gender: PropTypes.string,
  height: PropTypes.string,
  bodyweight: PropTypes.string,
  bodyfat: PropTypes.string,
  showInGrams: PropTypes.bool
};

const styles = StyleSheet.create ({
  mealContainer: {
    // marginTop: 30,
    marginBottom: 30,
    // paddingLeft: 20,
    // paddingRight: 20
  },
  // mealRow: {
  //   alignSelf: 'stretch',
  //   alignItems: 'flex-start',
  //   flexDirection: 'row',
  //   paddingTop: 10,
  //   paddingBottom: 10
  // },
  mealRow: {
    // paddingLeft: 15,
    // paddingRight: 15,
    marginBottom: 10
  },
  mealRowCol: {
    width: 100,
    height: 75
  },
  mealRowColLong: {
    flex: 2
  },
  mealRowColPhase3: {
    color: Colors.black,
    letterSpacing: 2,
    paddingTop: 20,
    marginBottom: 10
  },
  mealRowHeader: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 15
  },
  mealRowHeaderCol: {
    textAlign: 'center',
    letterSpacing: 1,
    flex: 1
  },
  mealRowHeaderColLong: {
    flex: 2,
    marginBottom: 40
  },
  mealLabel: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Futura',
    marginTop: -5
  },
  mealRowHeaderColText: {
    width: '100%',
    textAlign: 'center',
    letterSpacing: 1
  },
  macroLabelsWithIcon: {
    textAlign: 'left',
    fontSize: 12,
    marginTop: 10
  },
  macroLabelsWithIconPhase2: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 10
  },
  phase2PickerLabel: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center'
  },
  phase2Measurement: {
    marginBottom: 40
  },
  veggieText: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20
  }
});
