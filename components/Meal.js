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

   render() {
     let label;
     let time;
     let bedtime = false;
     let pwo = false;
     let viewAllMeals = this.props.viewAllMeals;

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
          <Text style={styles.mealRowHeaderCol}>{label ? label.toUpperCase(): ''}</Text>
          <Text style={styles.mealRowHeaderColTime}>{this.props.timing}{time}</Text>
        </View>

        <View style={styles.mealRow}>
          {this.props.phase === 3 &&
            <Text style={styles.mealRowColPhase3}>Protein</Text>}
          {this.props.phase < 3 &&
            <View style={styles.mealRowCol}>
              <Image source={require('../assets/icons/protein.jpg')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />
              <Text style={styles.macroLabelsWithIcon}>Protein</Text>
            </View>}
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
            <View>

            <Picker
              style={styles.picker}
              itemStyle={{height: 50, textAlign: 'left', fontSize: 22, marginRight: 60}}
              selectedValue={this.props.currentMeal === 0 ? this.props.meal1proteinMeasurement :
                this.props.currentMeal === 1 ? this.props.meal2proteinMeasurement :
                this.props.currentMeal === 2 ? this.props.meal3proteinMeasurement :
                this.props.currentMeal === 3 ? this.props.meal4proteinMeasurement : null}
              onValueChange={(itemValue, itemIndex) => this.props.updateMeasurement(this.props.currentMeal, 'protein', itemValue)}>
              <Picker.Item label="2 oz" value="2" />
              <Picker.Item label="3 oz" value="3" />
              <Picker.Item label="4 oz" value="4" />
              <Picker.Item label="5 oz" value="5" />
              <Picker.Item label="6 oz" value="6" />
              <Picker.Item label="7 oz" value="7" />
              <Picker.Item label="8 oz" value="8" />
            </Picker></View>}
        </View>

        <View style={styles.mealRow}>
          {this.props.phase === 3 && <Text style={styles.mealRowColPhase3}>Starches</Text>}
          {(this.props.phase < 3 && this.props.trainingIntensity === true) && <View style={styles.mealRowCol}>
              <Image source={require('../assets/icons/carbs-training.jpg')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />
              <Text style={styles.macroLabelsWithIcon}>Starches</Text>
            </View>}
          {(this.props.phase < 3 && this.props.trainingIntensity === false) && <View style={styles.mealRowCol}>
              <Image source={require('../assets/icons/carbs-rest.jpg')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />
              <Text style={styles.macroLabelsWithIcon}>Starches</Text>
            </View>}
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
            <View>
            <Picker
              style={styles.picker}
              itemStyle={{height: 50, textAlign: 'left', fontSize: 22, marginRight: 60}}
              selectedValue={this.props.currentMeal === 0 ? this.props.meal1carbsMeasurement :
                this.props.currentMeal === 1 ? this.props.meal2carbsMeasurement :
                this.props.currentMeal === 2 ? this.props.meal3carbsMeasurement :
                this.props.currentMeal === 3 ? this.props.meal4carbsMeasurement : null}
              onValueChange={(itemValue, itemIndex) => this.props.updateMeasurement(this.props.currentMeal, 'carbs', itemValue)}>
              <Picker.Item label="1/4 cup" value=".25" />
              <Picker.Item label="1/2 cup" value=".5" />
              <Picker.Item label="3/4 cup" value=".75" />
              <Picker.Item label="1 cup" value="1" />
              <Picker.Item label="1 1/4 cup" value="1.25" />
              <Picker.Item label="1 1/2 cup" value="1.5" />
              <Picker.Item label="1 3/4 cup" value="1.75" />
              <Picker.Item label="2 cup" value="2" />
              <Picker.Item label="2 1/4 cup" value="2.25" />
              <Picker.Item label="2 1/2 cup" value="2.5" />
              <Picker.Item label="2 3/4 cup" value="2.75" />
              <Picker.Item label="3 cup" value="3" />
            </Picker></View>}
        </View>

        <View style={styles.mealRow}>
          {this.props.phase === 3 && <Text style={styles.mealRowColPhase3}>Fats</Text>}
          {this.props.phase < 3 && <View style={styles.mealRowCol}>
              <Image source={require('../assets/icons/fats.jpg')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />
              <Text style={styles.macroLabelsWithIcon}>Fats</Text>
            </View>}
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
            <View>
              <Picker
                style={styles.picker}
                itemStyle={{height: 50, textAlign: 'left', fontSize: 22, marginRight: 60}}
                selectedValue={this.props.currentMeal === 0 ? this.props.meal1fatsMeasurement :
                  this.props.currentMeal === 1 ? this.props.meal2fatsMeasurement :
                  this.props.currentMeal === 2 ? this.props.meal3fatsMeasurement :
                  this.props.currentMeal === 3 ? this.props.meal4fatsMeasurement : null}
                onValueChange={(itemValue, itemIndex) => this.props.updateMeasurement(this.props.currentMeal, 'fats', itemValue)}>
                <Picker.Item label="1 tsp" value="1" />
                <Picker.Item label="2 tsp" value="2" />
                <Picker.Item label="3 tsp" value="3" />
                <Picker.Item label="4 tsp" value="4" />
                <Picker.Item label="5 tsp" value="5" />
                <Picker.Item label="6 tsp" value="6" />
                <Picker.Item label="7 tsp" value="7" />
                <Picker.Item label="8 tsp" value="8" />
                <Picker.Item label="9 tsp" value="9" />
                <Picker.Item label="10 tsp" value="10" />
                <Picker.Item label="11 tsp" value="11" />
                <Picker.Item label="12 tsp" value="12" />
              </Picker></View>}
        </View>

        {!this.props.showInGrams && <View style={styles.mealRow}>
          {this.props.phase === 3 && <Text style={styles.mealRowColPhase3}>Veggies</Text>}
          {this.props.phase < 3 && <View style={styles.mealRowCol}>
              <Image source={require('../assets/icons/veggies.jpg')}
                style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />
              <Text style={styles.macroLabelsWithIcon}>Veggies</Text>
            </View>}
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
          {this.props.phase === 2 &&
            <View>

            <Picker
              style={styles.picker}
              itemStyle={{height: 50, textAlign: 'left', fontSize: 22, marginRight: 60}}
              selectedValue={this.props.currentMeal === 0 ? this.props.meal1veggiesMeasurement :
                this.props.currentMeal === 1 ? this.props.meal2veggiesMeasurement :
                this.props.currentMeal === 2 ? this.props.meal3veggiesMeasurement :
                this.props.currentMeal === 3 ? this.props.meal4veggiesMeasurement : null}
              onValueChange={(itemValue, itemIndex) => this.props.updateMeasurement(this.props.currentMeal, 'veggies', itemValue)}>
              <Picker.Item label="1 cup" value="1" />
              <Picker.Item label="2 cups" value="2" />
              <Picker.Item label="3 cups" value="3" />
            </Picker></View>}
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
  // mealRow: {
  //   alignSelf: 'stretch',
  //   alignItems: 'flex-start',
  //   flexDirection: 'row',
  //   paddingTop: 10,
  //   paddingBottom: 10
  // },
  // mealRowCol: {
  //   width: 100,
  //   height: 75
  // },
  // mealRowColPhase3: {
  //   flex: 1
  // },
  // mealRowColLong: {
  //   flex: 2
  // },
  mealRowColPhase3: {
    marginTop: 10,
    color: Colors.darkGray
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
  },
  macroLabelsWithIcon: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10
  }
});
