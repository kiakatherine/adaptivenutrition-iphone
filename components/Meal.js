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

class Meal extends React.Component {
   state = {
     selected: false,
   }

   changeMeal(dir) {
     let meal = 0;
     let totalMeals = 3;

     if(this.props.phase === 3 && this.props.trainingIntensity > 0) {
       totalMeals = 4;
     }

     if(dir === 'prev') {
       meal = (this.props.currentMeal - 1 >= 0) ? (this.props.currentMeal - 1) : totalMeals;
     } else {
       meal = 4;
       meal = (this.props.currentMeal + 1 <= totalMeals) ? (this.props.currentMeal + 1) : 0;
     }

     this.props.changeMeal(meal);
   }

   render() {
     let label;
     let time;
     let bedtime = false;
     let pwo = false;
     let viewAllMeals = this.props.viewAllMeals;

     let proteinMeasurementInput = 0;
     let carbMeasurementInput = 0;
     let fatMeasurementInput = 0;
     let veggieMeasurementInput = 0;

     // label
     if(this.props.phase === 3) {
       if(this.props.trainingIntensity === 0) {
         label = labels.x.low[this.props.currentMeal];
       } else if(this.props.trainingIntensity === 1) {
         label = labels.x.moderate[this.props.mealsBeforeWorkout][this.props.currentMeal];
       } else if(this.props.trainingIntensity === 2) {
         label = labels.x.high[this.props.mealsBeforeWorkout][this.props.currentMeal];
       }
     } else {
       label = labels.x.low[this.props.currentMeal];
     }

     // bedtime
     if(this.props.trainingIntensity === 0 && this.props.currentMeal === 4) {
       bedtime = true;
     } else if(this.props.phase === 3 && this.props.trainingIntensity > 0 && this.props.currentMeal === 5) {
       bedtime = true;
     }

     // pwo
     if(this.props.pwo || label && label.indexOf('PWO') > -1) {
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
          {!viewAllMeals && <TouchableHighlight
            underlayColor={Colors.white}
            onPress={() => this.changeMeal('prev')}>
            <Text style={styles.mealRowHeaderColArrowLeft}>
              <FontAwesome
                name='arrow-left'
                size={24}
              />
            </Text>
          </TouchableHighlight>}

          <View style={styles.mealRowHeaderColLong}>
            <Text style={[styles.mealRowHeaderColText, styles.mealLabel]}>{label ? label: ''}</Text>
            <Text style={styles.mealRowHeaderColText}>{this.props.timing}{time}</Text>
          </View>

          {!viewAllMeals && <TouchableHighlight
            underlayColor={Colors.white}
            onPress={() => this.changeMeal('next')}>
            <Text style={styles.mealRowHeaderColArrowRight}>
              <FontAwesome
                name='arrow-right'
                size={24}
              />
            </Text>
          </TouchableHighlight>}
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowColPhase3}>PROTEIN OPTIONS</Text>

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

          {this.props.phase === 2 &&
            <View style={styles.phase2Measurement}>
              <Text style={styles.phase2PickerLabel}>Enter your portion weight</Text>
              <MeasurementInput
                macro='protein'
                currentMeal={this.props.currentMeal}
                measurement={this.props.currentMeal === 0 ? this.props.meal1proteinMeasurement :
                  this.props.currentMeal === 1 ? this.props.meal2proteinMeasurement :
                  this.props.currentMeal === 2 ? this.props.meal3proteinMeasurement :
                  this.props.currentMeal === 3 ? this.props.meal4proteinMeasurement : null}
                updateMeasurement={this.props.updateMeasurement} />
            </View>}
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowColPhase3}>STARCH OPTIONS</Text>

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

          {this.props.phase === 2 &&
            <View style={styles.phase2Measurement}>
              <Text style={styles.phase2PickerLabel}>Enter your portion measurement</Text>
              <MeasurementInput
                macro='carbs'
                currentMeal={this.props.currentMeal}
                measurement={this.props.currentMeal === 0 ? this.props.meal1carbsMeasurement :
                  this.props.currentMeal === 1 ? this.props.meal2carbsMeasurement :
                  this.props.currentMeal === 2 ? this.props.meal3carbsMeasurement :
                  this.props.currentMeal === 3 ? this.props.meal4carbsMeasurement : null}
                updateMeasurement={this.props.updateMeasurement} />
          </View>}
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowColPhase3}>FAT OPTIONS</Text>

          {pwo && <Text style={Styles.emptyMessage}>None</Text>}

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

          {this.props.phase === 2 &&
            <View style={styles.phase2Measurement}>
              <Text style={styles.phase2PickerLabel}>Enter your portion measurement</Text>
              <MeasurementInput
                macro='fats'
                currentMeal={this.props.currentMeal}
                measurement={this.props.currentMeal === 0 ? this.props.meal1fatsMeasurement :
                  this.props.currentMeal === 1 ? this.props.meal2fatsMeasurement :
                  this.props.currentMeal === 2 ? this.props.meal3fatsMeasurement :
                  this.props.currentMeal === 3 ? this.props.meal4fatsMeasurement : null}
                updateMeasurement={this.props.updateMeasurement} />
            </View>}
        </View>

        {!this.props.showInGrams && <View style={styles.mealRow}>
          {this.props.phase === 3 &&
            <View>
              <Text style={styles.mealRowColPhase3}>VEGGIES</Text>

              {pwo && <Text style={Styles.emptyMessage}>None</Text>}

              {!pwo && <FoodOptions style={styles.mealRowColLong}
                macro='veggies'/>}
            </View>}

          {this.props.phase < 3 &&
            <View>
              <Text style={styles.mealRowColPhase3}>VEGGIES</Text>
              <Text style={styles.macroLabelsWithIconPhase2}>Portion size</Text>
              <Image source={require('../assets/icons/veggies.jpg')}
                style={{ width: 60, height: 60, resizeMode: 'contain' }} />
            </View>}

          {this.props.phase === 2 &&
            <View style={styles.phase2Measurement}>
              <Text style={styles.phase2PickerLabel}>Enter your portion measurement</Text>
              <MeasurementInput
                macro='veggies'
                currentMeal={this.props.currentMeal}
                measurement={this.props.currentMeal === 0 ? this.props.meal1veggiesMeasurement :
                  this.props.currentMeal === 1 ? this.props.meal2veggiesMeasurement :
                  this.props.currentMeal === 2 ? this.props.meal3veggiesMeasurement :
                  this.props.currentMeal === 3 ? this.props.meal4veggiesMeasurement : null}
                updateMeasurement={this.props.updateMeasurement} />
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
  template: PropTypes.string,
  currentMeal: PropTypes.number,
  age: PropTypes.number,
  gender: PropTypes.string,
  height: PropTypes.number,
  bodyweight: PropTypes.number,
  bodyfat: PropTypes.number,
  showInGrams: PropTypes.bool,
  meal1proteinMeasurement: PropTypes.string
};

const styles = StyleSheet.create ({
  mealContainer: {
    marginTop: 30,
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
  mealRowHeaderColArrowLeft: {
    textAlign: 'left'
  },
  mealRowHeaderColArrowRight: {
    textAlign: 'right'
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
