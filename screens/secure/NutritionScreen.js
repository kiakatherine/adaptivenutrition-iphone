import React from 'react';

import AuthService from '../../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import { changeUnit } from '../../utils/helpers';

import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import Meal from '../../components/Meal';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Nutrition',
  };

  state = {
    showInGrams: false
  }

  render() {
    const { navigate } = this.props.navigation;

    const showInGrams = this.state.showInGrams;

    const bodyweight = 128;
    const bodyfat = 17;
    const age = 28;
    const gender = 'female';
    const height = 62;

    const totalProtein = 200;
    const totalCarbs = 150;
    const totalFat = 70;
    const totalCalories = 2200;

    const proteinDelta = bodyweight > 150 ? 25 : 20;

    const template = null;
    const selectedMeal = 1;
    const trainingTime = 3;
    const trainingIntensity = 1;

    let label1 = null;
    let label2 = null;
    let label3 = null;
    let label4 = null;
    let label5 = null;
    let label6 = null;

    let protein1 = null;
    let protein2 = null;
    let protein3 = null;
    let protein4 = null;
    let protein5 = null;
    let protein6 = null;

    let carbs1 = null;
    let carbs2 = null;
    let carbs3 = null;
    let carbs4 = null;
    let carbs5 = null;
    let carbs6 = null;

    let fat1 = null;
    let fat2 = null;
    let fat3 = null;
    let fat4 = null;
    let fat5 = null;
    let fat6 = null;

    let veggies1 = null;
    let veggies2 = null;
    let veggies3 = null;
    let veggies4 = null;
    let veggies5 = null;
    let veggies6 = null;

    if(trainingIntensity === 0) {
      label1 = 'Breakfast';
      label2 = 'Early lunch';
      label3 = 'Late lunch';
      label4 = 'Dinner';
      label5 = 'Bedtime shake';
    } else {
      if(trainingTime === 0) {
        label1 = 'PWO Shake';
        label2 = 'Breakfast';
        label3 = 'Early lunch';
        label4 = 'Late lunch';
        label5 = 'Dinner';
        label6 = 'Bedtime shake';
      } else if(trainingTime === 1) {
        label1 = 'Breakfast';
        label2 = 'PWO Shake';
        label3 = 'Early lunch';
        label4 = 'Late lunch';
        label5 = 'Dinner';
        label6 = 'Bedtime shake';
      } else if(trainingTime === 2) {
        label1 = 'Breakfast';
        label2 = 'Early lunch';
        label3 = 'PWO Shake';
        label4 = 'Late lunch';
        label5 = 'Dinner';
        label6 = 'Bedtime shake';
      } else if(trainingTime === 3) {
        label1 = 'Breakfast';
        label2 = 'Early lunch';
        label3 = 'Late lunch';
        label4 = 'PWO Shake';
        label5 = 'Dinner';
        label6 = 'Bedtime shake';
      } else if(trainingTime === 4) {
        label1 = 'Breakfast';
        label2 = 'Early lunch';
        label3 = 'Late lunch';
        label4 = 'Dinner';
        label5 = 'PWO Shake';
        label6 = 'Bedtime shake';
      }
    }

    if(trainingIntensity === 0) {
      label1 = 'Breakfast';
      label2 = 'Early lunch';
      label3 = 'Late lunch';
      label4 = 'Dinner';
      label5 = 'Bedtime';

      protein1 = (totalProtein - proteinDelta) * 0.25;
      protein2 = (totalProtein - proteinDelta) * 0.25;
      protein3 = (totalProtein - proteinDelta) * 0.25;
      protein4 = (totalProtein - proteinDelta) * 0.25;
      protein5 = proteinDelta;

      carbs1 = Math.round(totalCarbs * 0.25);
      carbs2 = Math.round(totalCarbs * 0.25);
      carbs3 = Math.round(totalCarbs * 0.25);
      carbs4 = Math.round(totalCarbs * 0.25);
      carbs5 = '---';

      fat1 = Math.round(totalFat * 0.3);
      fat2 = Math.round(totalFat * 0.2);
      fat3 = Math.round(totalFat * 0.2);
      fat4 = Math.round(totalFat * 0.3);
      fat5 = '---';

      veggies1 = '1+ cups';
      veggies2 = '1+ cups';
      veggies3 = '1+ cups';
      veggies4 = '1+ cups';
      veggies5 = '---';
    } else if(trainingIntensity === 1 || trainingIntensity === 2) {
      if(trainingTime === 0) {
        label1 = 'PWO shake';
        label2 = 'Breakfast';
        label3 = 'Early lunch';
        label4 = 'Late lunch';
        label5 = 'Dinner';
        label6 = 'Bedtime';

        protein1 = proteinDelta;
        protein2 = (totalProtein - proteinDelta) * 0.25;
        protein3 = (totalProtein - proteinDelta) * 0.25;
        protein4 = (totalProtein - proteinDelta) * 0.25;
        protein5 = (totalProtein - proteinDelta) * 0.25;
        protein6 = proteinDelta;

        carbs1 = Math.round(totalCarbs * 0.2);
        carbs2 = Math.round(totalCarbs * 0.3);
        carbs3 = Math.round(totalCarbs * 0.2);
        carbs4 = Math.round(totalCarbs * 0.1);
        carbs5 = Math.round(totalCarbs * 0.1);
        carbs6 = Math.round(totalCarbs * 0.1);

        fat1 = '---';
        fat2 = '---';
        fat3 = Math.round(totalFat * 0.1);
        fat4 = Math.round(totalFat * 0.3);
        fat5 = Math.round(totalFat * 0.3);
        fat6 = Math.round(totalFat * 0.3);

        veggies1 = '---';
        veggies2 = '1+ cups';
        veggies3 = '1+ cups';
        veggies4 = '1+ cups';
        veggies5 = '1+ cups';
        veggies6 = '---';
      } else if(trainingTime === 1) {
        label1 = 'Breakfast';
        label2 = 'PWO shake';
        label3 = 'Early lunch';
        label4 = 'Late lunch';
        label5 = 'Dinner';
        label6 = 'Bedtime';

        protein1 = (totalProtein - proteinDelta) * 0.25;
        protein2 = proteinDelta;
        protein3 = (totalProtein - proteinDelta) * 0.25;
        protein4 = (totalProtein - proteinDelta) * 0.25;
        protein5 = (totalProtein - proteinDelta) * 0.25;
        protein6 = proteinDelta;

        carbs1 = Math.round(totalCarbs * 0.15);
        carbs2 = Math.round(totalCarbs * 0.15);
        carbs3 = Math.round(totalCarbs * 0.3);
        carbs4 = Math.round(totalCarbs * 0.2);
        carbs5 = Math.round(totalCarbs * 0.1);
        carbs6 = Math.round(totalCarbs * 0.1);

        fat1 = Math.round(totalFat * 0.1);
        fat2 = '---';
        fat3 = '---';
        fat4 = Math.round(totalFat * 0.3);
        fat5 = Math.round(totalFat * 0.3);
        fat6 = Math.round(totalFat * 0.3);

        veggies1 = '1+ cups';
        veggies2 = '---';
        veggies3 = '1+ cups';
        veggies4 = '1+ cups';
        veggies5 = '1+ cups';
        veggies6 = '---';
      } else if(trainingTime === 2) {
        label1 = 'Breakfast';
        label2 = 'Early lunch';
        label3 = 'PWO shake';
        label4 = 'Late lunch';
        label5 = 'Dinner';
        label6 = 'Bedtime';

        protein1 = (totalProtein - proteinDelta) * 0.25;
        protein2 = (totalProtein - proteinDelta) * 0.25;
        protein3 = proteinDelta;
        protein4 = (totalProtein - proteinDelta) * 0.25;
        protein5 = (totalProtein - proteinDelta) * 0.25;
        protein6 = proteinDelta;

        carbs1 = Math.round(totalCarbs * 0.1);
        carbs2 = Math.round(totalCarbs * 0.15);
        carbs3 = Math.round(totalCarbs * 0.15);
        carbs4 = Math.round(totalCarbs * 0.3);
        carbs5 = Math.round(totalCarbs * 0.2);
        carbs6 = Math.round(totalCarbs * 0.1);

        fat1 = Math.round(totalFat * 0.3);
        fat2 = Math.round(totalFat * 0.1);
        fat3 = '---';
        fat4 = '---';
        fat5 = Math.round(totalFat * 0.3);
        fat6 = Math.round(totalFat * 0.3);

        veggies1 = '1+ cups';
        veggies2 = '1+ cups';
        veggies3 = '---';
        veggies4 = '1+ cups';
        veggies5 = '1+ cups';
        veggies6 = '---';
      } else if(trainingTime === 3) {
        label1 = 'Breakfast';
        label2 = 'Early lunch';
        label3 = 'Late lunch';
        label4 = 'PWO shake';
        label5 = 'Dinner';
        label6 = 'Bedtime';

        protein1 = (totalProtein - proteinDelta) * 0.25;
        protein2 = (totalProtein - proteinDelta) * 0.25;
        protein3 = (totalProtein - proteinDelta) * 0.25;
        protein4 = proteinDelta;
        protein5 = (totalProtein - proteinDelta) * 0.25;
        protein6 = proteinDelta;

        carbs1 = Math.round(totalCarbs * 0.1);
        carbs2 = Math.round(totalCarbs * 0.1);
        carbs3 = Math.round(totalCarbs * 0.15);
        carbs4 = Math.round(totalCarbs * 0.15);
        carbs5 = Math.round(totalCarbs * 0.3);
        carbs6 = Math.round(totalCarbs * 0.2);

        fat1 = Math.round(totalFat * 0.3);
        fat2 = Math.round(totalFat * 0.3);
        fat3 = Math.round(totalFat * 0.1);
        fat4 = '---';
        fat5 = '---';
        fat6 = Math.round(totalFat * 0.3);

        veggies1 = '1+ cups';
        veggies2 = '1+ cups';
        veggies3 = '1+ cups';
        veggies4 = '---';
        veggies5 = '1+ cups';
        veggies6 = '---';
      } else if(trainingTime === 4) {
        label1 = 'Breakfast';
        label2 = 'Early lunch';
        label3 = 'Late lunch';
        label4 = 'Dinner';
        label5 = 'PWO shake';
        label6 = 'Bedtime';

        protein1 = (totalProtein - proteinDelta) * 0.25;
        protein2 = (totalProtein - proteinDelta) * 0.25;
        protein3 = (totalProtein - proteinDelta) * 0.25;
        protein4 = (totalProtein - proteinDelta) * 0.25;
        protein5 = proteinDelta;
        protein6 = proteinDelta;

        carbs1 = Math.round(totalCarbs * 0.1);
        carbs2 = Math.round(totalCarbs * 0.1);
        carbs3 = Math.round(totalCarbs * 0.15);
        carbs4 = Math.round(totalCarbs * 0.2);
        carbs5 = Math.round(totalCarbs * 0.15);
        carbs6 = Math.round(totalCarbs * 0.3);

        fat1 = Math.round(totalFat * 0.3);
        fat2 = Math.round(totalFat * 0.3);
        fat3 = Math.round(totalFat * 0.3);
        fat4 = Math.round(totalFat * 0.1);
        fat5 = '---';
        fat6 = '---';

        veggies1 = '1+ cups';
        veggies2 = '1+ cups';
        veggies3 = '1+ cups';
        veggies4 = '1+ cups';
        veggies5 = '---';
        veggies6 = '---';
      }
    }

    label1 = label1;
    label2 = label2;
    label3 = label3;
    label4 = label4;
    label5 = label5;
    label6 = label6;

    protein1 = changeUnit(showInGrams, 'protein', protein1);
    protein2 = changeUnit(showInGrams, 'protein', protein2);
    protein3 = changeUnit(showInGrams, 'protein', protein3);
    protein4 = changeUnit(showInGrams, 'protein', protein4);
    protein5 = changeUnit(showInGrams, 'protein', protein5);
    protein6 = changeUnit(showInGrams, 'protein', protein6);

    protein5casein = changeUnit(true, 'protein', protein5);
    protein6casein = changeUnit(true, 'protein', protein6);

    protein1Grams = changeUnit(true, 'protein', protein1);
    protein2Grams = changeUnit(true, 'protein', protein2);
    protein3Grams = changeUnit(true, 'protein', protein3);
    protein4Grams = changeUnit(true, 'protein', protein4);
    protein5Grams = changeUnit(true, 'protein', protein5);
    protein6Grams = changeUnit(true, 'protein', protein6);

    carbs1 = changeUnit(showInGrams, 'carbs', carbs1);
    carbs2 = changeUnit(showInGrams, 'carbs', carbs2);
    carbs3 = changeUnit(showInGrams, 'carbs', carbs3);
    carbs4 = changeUnit(showInGrams, 'carbs', carbs4);
    carbs5 = changeUnit(showInGrams, 'carbs', carbs5);
    carbs6 = changeUnit(showInGrams, 'carbs', carbs6);

    carbs1potatoes = changeUnit(showInGrams, 'carbs', carbs1, 'potatoes');
    carbs2potatoes = changeUnit(showInGrams, 'carbs', carbs2, 'potatoes');
    carbs3potatoes = changeUnit(showInGrams, 'carbs', carbs3, 'potatoes');
    carbs4potatoes = changeUnit(showInGrams, 'carbs', carbs4, 'potatoes');
    carbs5potatoes = changeUnit(showInGrams, 'carbs', carbs5, 'potatoes');
    carbs6potatoes = changeUnit(showInGrams, 'carbs', carbs6, 'potatoes');

    carbs1sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs1, 'sweetPotatoes');
    carbs2sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs2, 'sweetPotatoes');
    carbs3sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs3, 'sweetPotatoes');
    carbs4sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs4, 'sweetPotatoes');
    carbs5sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs5, 'sweetPotatoes');
    carbs6sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs6, 'sweetPotatoes');

    carbs1quinoa = changeUnit(showInGrams, 'carbs', carbs1, 'quinoa');
    carbs2quinoa = changeUnit(showInGrams, 'carbs', carbs2, 'quinoa');
    carbs3quinoa = changeUnit(showInGrams, 'carbs', carbs3, 'quinoa');
    carbs4quinoa = changeUnit(showInGrams, 'carbs', carbs4, 'quinoa');
    carbs5quinoa = changeUnit(showInGrams, 'carbs', carbs5, 'quinoa');
    carbs6quinoa = changeUnit(showInGrams, 'carbs', carbs6, 'quinoa');

    carbs1banana = changeUnit(showInGrams, 'carbs', carbs1, 'banana');
    carbs2banana = changeUnit(showInGrams, 'carbs', carbs2, 'banana');
    carbs3banana = changeUnit(showInGrams, 'carbs', carbs3, 'banana');
    carbs4banana = changeUnit(showInGrams, 'carbs', carbs4, 'banana');
    carbs5banana = changeUnit(showInGrams, 'carbs', carbs5, 'banana');
    carbs6banana = changeUnit(showInGrams, 'carbs', carbs6, 'banana');

    carbs1acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs1, 'acornButternutSquash');
    carbs2acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs2, 'acornButternutSquash');
    carbs3acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs3, 'acornButternutSquash');
    carbs4acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs4, 'acornButternutSquash');
    carbs5acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs5, 'acornButternutSquash');
    carbs6acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs6, 'acornButternutSquash');

    carbs1blueberries = changeUnit(showInGrams, 'carbs', carbs1, 'blueberries');

    carbs1pwo = changeUnit(showInGrams, 'carbs', carbs1, 'pwo');
    carbs2pwo = changeUnit(showInGrams, 'carbs', carbs2, 'pwo');
    carbs3pwo = changeUnit(showInGrams, 'carbs', carbs3, 'pwo');
    carbs4pwo = changeUnit(showInGrams, 'carbs', carbs4, 'pwo');
    carbs5pwo = changeUnit(showInGrams, 'carbs', carbs5, 'pwo');
    carbs6pwo = changeUnit(showInGrams, 'carbs', carbs6, 'pwo');

    fat1 = changeUnit(showInGrams, 'fat', fat1, 'oil');
    fat2 = changeUnit(showInGrams, 'fat', fat2, 'oil');
    fat3 = changeUnit(showInGrams, 'fat', fat3, 'oil');
    fat4 = changeUnit(showInGrams, 'fat', fat4, 'oil');
    fat5 = changeUnit(showInGrams, 'fat', fat5, 'oil');
    fat6 = changeUnit(showInGrams, 'fat', fat6, 'oil');

    fat1butter = changeUnit(showInGrams, 'fat', fat1, 'butter');
    fat2butter = changeUnit(showInGrams, 'fat', fat2, 'butter');
    fat3butter = changeUnit(showInGrams, 'fat', fat3, 'butter');
    fat4butter = changeUnit(showInGrams, 'fat', fat4, 'butter');
    fat5butter = changeUnit(showInGrams, 'fat', fat5, 'butter');
    fat6butter = changeUnit(showInGrams, 'fat', fat6, 'butter');

    fat1nutButter = changeUnit(showInGrams, 'fat', fat1, 'nutButter');
    fat2nutButter = changeUnit(showInGrams, 'fat', fat2, 'nutButter');
    fat3nutButter = changeUnit(showInGrams, 'fat', fat3, 'nutButter');
    fat4nutButter = changeUnit(showInGrams, 'fat', fat4, 'nutButter');
    fat5nutButter = changeUnit(showInGrams, 'fat', fat5, 'nutButter');
    fat6nutButter = changeUnit(showInGrams, 'fat', fat6, 'nutButter');

    fat1avocado = changeUnit(showInGrams, 'fat', fat1, 'avocado');
    fat2avocado = changeUnit(showInGrams, 'fat', fat2, 'avocado');
    fat3avocado = changeUnit(showInGrams, 'fat', fat3, 'avocado');
    fat4avocado = changeUnit(showInGrams, 'fat', fat4, 'avocado');
    fat5avocado = changeUnit(showInGrams, 'fat', fat5, 'avocado');
    fat6avocado = changeUnit(showInGrams, 'fat', fat6, 'avocado');

    veggies1 = veggies1;
    veggies2 = veggies2;
    veggies3 = veggies3;
    veggies4 = veggies4;
    veggies5 = veggies5;
    veggies6 = veggies6;

    return (
      <ScrollView style={Styles.body}>
        <View style={Styles.title}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
        </View>

        <View>
          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>What time did you wake up?</Text>
          </View>

          <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text style={styles.optionTitle}>8:00 a.m.</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>Are you training today?</Text>
          </View>

          <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>Rest or low-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>&#60; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>&#62; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>How many meals before your workout?</Text>
          </View>

          <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>None</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>1</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>2</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>3</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>4</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.mealPlanSection}>
            <Text style={Styles.h1}>Todays Meal Plan</Text>
            <Text>Phase 3</Text>

            <View style={styles.mealsMenu}>
              <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
                 <Text>1</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
                 <Text>2</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
                 <Text>3</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
                 <Text>4</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
                 <Text>5</Text>
              </TouchableHighlight>
            </View>

            <Meal
              trainingIntensity={trainingIntensity}
              trainingTime={trainingTime}
              template={template}
              selectedMeal={selectedMeal}
              age={age}
              gender={gender}
              height={height}
              bodyweight={bodyweight}
              bodyfat={bodyfat}
              showMacros={this.state.showMacros} />
          </View>

          <View style={styles.progressSection}>
            <TouchableHighlight style={styles.progressButtonGood} onPress={() => {}}>
               <Text style={styles.progressButtonText}>
                 <FontAwesome
                   name='check'
                   size={16}
                 />
                 Ate meal on plan!
               </Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.progressButtonBad} onPress={() => {}}>
               <Text style={styles.progressButtonText}>
                 <FontAwesome
                   name='remove'
                   size={16}
                 />
                 Ate off plan
               </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.mealSettingsSection}>
            <Text style={Styles.h2}>Meal Plan Settings</Text>

            <TouchableHighlight onPress={() => {}}>
               <Text style={Styles.link}>View by day</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {}}>
               <Text style={Styles.link}>View in macros</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => {}}>
               <Text style={Styles.link}>Adjust energy balance</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  optionWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  optionSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  optionTitle: {
    color: Colors.black,
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10
  },
  optionButton: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.paleBlue
  },
  mealPlanSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 50
  },
  mealsMenu: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  progressSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30
  },
  progressButtonText: {
    textAlign: 'center'
  },
  progressButtonGood: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.paleGreen,
    borderRadius: 1
  },
  progressButtonBad: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.paleRed,
    borderRadius: 1
  },
  mealSettingsSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
