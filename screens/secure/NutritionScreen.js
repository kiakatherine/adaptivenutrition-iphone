import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import * as labels from '../../constants/MealLabels';

import { calcProtein, calcCarbs, calcFat, calcVeggies } from '../../utils/calculate-macros';
import { changeUnit, calculateTotals } from '../../utils/helpers';

import {
  Alert,
  Button,
  Image,
  Picker,
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

  constructor(props) {
    super(props);
    this.state = {
      showInGrams: false,
      wakeTime: '8 a.m.',
      trainingIntensity: 0,
      mealsBeforeWorkout: 3,
      currentMeal: 1,
      phase: 3, //make dynamic
      trainingIntensity: 1,
      showModal: false,
      showEnergyBalancePicker: false
    };
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    // this.setState({ showLoading: true });

    client.on('value', snapshot => {
      const c = snapshot.val();

      this.setState({
        client: c,
        showLoading: false
      });
    });
  }

  saveTemplateType(template) {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    t = template === 0 ? 'Maintenance' :
      template === 1 ? 'Cut 1' :
      template === 2 ? 'Cut 2' :
      template === 3 ? 'Cut 3' :
      template === 4 ? 'Bulk 1' :
      template === 5 ? 'Bulk 2' :
      template === 6 ? 'Bulk 3' : null;

    client.update({ templateType: t });

    this.setState({
      showEnergyBalancePicker: false,
      showModal: false,
      template: template
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    let bodyweight;
    let bodyfat;
    let age;
    let gender;
    let height;
    let leanMass;
    let proteinDelta;

    let template;
    let currentMeal;
    let mealsBeforeWorkout;
    let trainingIntensity;
    let showInGrams;

    let customMacros;
    let customRestDayProtein;
    let customRestDayCarbs;
    let customRestDayFat;
    let customModerateDayProtein;
    let customModerateDayCarbs;
    let customModerateDayFat;
    let customHeavyDayProtein;
    let customHeavyDayCarbs;
    let customHeavyDayFat;

    let labels = [];
    let proteins = [];
    let carbs = [];
    let fats = [];
    let veggies = [];

    if(this.state.client) {
      const client = this.state.client;

      bodyweight = client.bodyweight;
      bodyfat = client.bodyfat;
      age = client.age;
      gender = client.gender;
      height = client.height;
      leanMass = client.leanMass;
      proteinDelta = bodyweight > 150 ? 25 : 20;

      template = client.templateType === 'Maintenance' ? 0 :
        client.templateType === 'Cut 1' ? 1 :
        client.templateType === 'Cut 2' ? 2 :
        client.templateType === 'Cut 3' ? 3 :
        client.templateType === 'Bulk 1' ? 4 :
        client.templateType === 'Bulk 2' ? 5 :
        client.templateType === 'Bulk 3' ? 6 : null;
      currentMeal = this.state.currentMeal;
      mealsBeforeWorkout = this.state.mealsBeforeWorkout;
      trainingIntensity = this.state.trainingIntensity;
      showInGrams = this.state.showInGrams;

      customMacros = client.customMacros;
      customRestDayProtein = client.customRestDayProtein;
      customRestDayCarbs = client.customRestDayCarbs;
      customRestDayFat = client.customRestDayFat;
      customModerateDayProtein = client.customModerateDayProtein;
      customModerateDayCarbs = client.customModerateDayCarbs;
      customModerateDayFat = client.customModerateDayFat;
      customHeavyDayProtein = client.customHeavyDayProtein;
      customHeavyDayCarbs = client.customHeavyDayCarbs;
      customHeavyDayFat = client.customHeavyDayFat;

      const totals = calculateTotals(age, gender, height, bodyfat, bodyweight, leanMass,
        template, trainingIntensity, customMacros,
        customRestDayProtein, customRestDayCarbs, customRestDayFat,
        customModerateDayProtein, customModerateDayCarbs, customModerateDayFat,
        customHeavyDayProtein, customHeavyDayCarbs, customHeavyDayFat);
      const totalProtein = totals['totalProtein'];
      const totalCarbs = totals['totalCarbs'];
      const totalFat = totals['totalFat'];
      const totalCalories = totals['totalCalories'];

      protein = calcProtein(trainingIntensity, mealsBeforeWorkout, totalProtein, proteinDelta);
      carbs = calcCarbs(trainingIntensity, mealsBeforeWorkout, totalCarbs);
      fat = calcFat(trainingIntensity, mealsBeforeWorkout, totalFat);
      veggies = calcVeggies(trainingIntensity, mealsBeforeWorkout);

      protein1 = changeUnit(showInGrams, 'protein', protein[0]);
      protein2 = changeUnit(showInGrams, 'protein', protein[1]);
      protein3 = changeUnit(showInGrams, 'protein', protein[2]);
      protein4 = changeUnit(showInGrams, 'protein', protein[3]);
      protein5 = changeUnit(showInGrams, 'protein', protein[4]);
      protein6 = changeUnit(showInGrams, 'protein', protein[5]);

      protein5casein = changeUnit(true, 'protein', protein[4]);
      protein6casein = changeUnit(true, 'protein', protein[5]);

      protein1Grams = changeUnit(true, 'protein', protein[0]);
      protein2Grams = changeUnit(true, 'protein', protein[1]);
      protein3Grams = changeUnit(true, 'protein', protein[2]);
      protein4Grams = changeUnit(true, 'protein', protein[3]);
      protein5Grams = changeUnit(true, 'protein', protein[4]);
      protein6Grams = changeUnit(true, 'protein', protein[5]);

      proteins = {
        protein1: protein1,
        protein2: protein2,
        protein3: protein3,
        protein4: protein4,
        protein5: protein5,
        protein6: protein6,
        protein5casein: protein5casein,
        protein6casein: protein6casein,
        protein1Grams: protein1Grams,
        protein2Grams: protein2Grams,
        protein3Grams: protein3Grams,
        protein4Grams: protein4Grams,
        protein5Grams: protein5Grams,
        protein6Grams: protein6Grams
      };

      carbs1 = changeUnit(showInGrams, 'carbs', carbs[0]);
      carbs2 = changeUnit(showInGrams, 'carbs', carbs[1]);
      carbs3 = changeUnit(showInGrams, 'carbs', carbs[2]);
      carbs4 = changeUnit(showInGrams, 'carbs', carbs[3]);
      carbs5 = changeUnit(showInGrams, 'carbs', carbs[4]);
      carbs6 = changeUnit(showInGrams, 'carbs', carbs[5]);

      carbs1potatoes = changeUnit(showInGrams, 'carbs', carbs[0], 'potatoes');
      carbs2potatoes = changeUnit(showInGrams, 'carbs', carbs[1], 'potatoes');
      carbs3potatoes = changeUnit(showInGrams, 'carbs', carbs[2], 'potatoes');
      carbs4potatoes = changeUnit(showInGrams, 'carbs', carbs[3], 'potatoes');
      carbs5potatoes = changeUnit(showInGrams, 'carbs', carbs[4], 'potatoes');
      carbs6potatoes = changeUnit(showInGrams, 'carbs', carbs[5], 'potatoes');

      carbs1sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs[0], 'sweetPotatoes');
      carbs2sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs[1], 'sweetPotatoes');
      carbs3sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs[2], 'sweetPotatoes');
      carbs4sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs[3], 'sweetPotatoes');
      carbs5sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs[4], 'sweetPotatoes');
      carbs6sweetPotatoes = changeUnit(showInGrams, 'carbs', carbs[5], 'sweetPotatoes');

      carbs1quinoa = changeUnit(showInGrams, 'carbs', carbs[0], 'quinoa');
      carbs2quinoa = changeUnit(showInGrams, 'carbs', carbs[1], 'quinoa');
      carbs3quinoa = changeUnit(showInGrams, 'carbs', carbs[2], 'quinoa');
      carbs4quinoa = changeUnit(showInGrams, 'carbs', carbs[3], 'quinoa');
      carbs5quinoa = changeUnit(showInGrams, 'carbs', carbs[4], 'quinoa');
      carbs6quinoa = changeUnit(showInGrams, 'carbs', carbs[5], 'quinoa');

      carbs1banana = changeUnit(showInGrams, 'carbs', carbs[0], 'banana');
      carbs2banana = changeUnit(showInGrams, 'carbs', carbs[1], 'banana');
      carbs3banana = changeUnit(showInGrams, 'carbs', carbs[2], 'banana');
      carbs4banana = changeUnit(showInGrams, 'carbs', carbs[3], 'banana');
      carbs5banana = changeUnit(showInGrams, 'carbs', carbs[4], 'banana');
      carbs6banana = changeUnit(showInGrams, 'carbs', carbs[5], 'banana');

      carbs1acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs[0], 'acornButternutSquash');
      carbs2acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs[1], 'acornButternutSquash');
      carbs3acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs[2], 'acornButternutSquash');
      carbs4acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs[3], 'acornButternutSquash');
      carbs5acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs[4], 'acornButternutSquash');
      carbs6acornButternutSquash = changeUnit(showInGrams, 'carbs', carbs[5], 'acornButternutSquash');

      carbs1blueberries = changeUnit(showInGrams, 'carbs', carbs[0], 'blueberries');

      carbs1pwo = changeUnit(showInGrams, 'carbs', carbs[0], 'pwo');
      carbs2pwo = changeUnit(showInGrams, 'carbs', carbs[1], 'pwo');
      carbs3pwo = changeUnit(showInGrams, 'carbs', carbs[2], 'pwo');
      carbs4pwo = changeUnit(showInGrams, 'carbs', carbs[3], 'pwo');
      carbs5pwo = changeUnit(showInGrams, 'carbs', carbs[4], 'pwo');
      carbs6pwo = changeUnit(showInGrams, 'carbs', carbs[5], 'pwo');

      carbs = {
        carbs1: carbs1,
        carbs2: carbs2,
        carbs3: carbs3,
        carbs4: carbs4,
        carbs5: carbs5,
        carbs6: carbs6,
        carbs1potatoes: carbs1potatoes,
        carbs2potatoes: carbs2potatoes,
        carbs3potatoes: carbs3potatoes,
        carbs4potatoes: carbs4potatoes,
        carbs5potatoes: carbs5potatoes,
        carbs6potatoes: carbs6potatoes,
        carbs1sweetPotatoes: carbs1sweetPotatoes,
        carbs2sweetPotatoes: carbs2sweetPotatoes,
        carbs3sweetPotatoes: carbs3sweetPotatoes,
        carbs4sweetPotatoes: carbs4sweetPotatoes,
        carbs5sweetPotatoes: carbs5sweetPotatoes,
        carbs6sweetPotatoes: carbs6sweetPotatoes,
        carbs1quinoa: carbs1quinoa,
        carbs2quinoa: carbs2quinoa,
        carbs3quinoa: carbs3quinoa,
        carbs4quinoa: carbs4quinoa,
        carbs5quinoa: carbs5quinoa,
        carbs6quinoa: carbs6quinoa,
        carbs1banana: carbs1banana,
        carbs2banana: carbs2banana,
        carbs3banana: carbs3banana,
        carbs4banana: carbs4banana,
        carbs5banana: carbs5banana,
        carbs6banana: carbs6banana,
        carbs1acornButternutSquash: carbs1acornButternutSquash,
        carbs2acornButternutSquash: carbs2acornButternutSquash,
        carbs3acornButternutSquash: carbs3acornButternutSquash,
        carbs4acornButternutSquash: carbs4acornButternutSquash,
        carbs5acornButternutSquash: carbs5acornButternutSquash,
        carbs6acornButternutSquash: carbs6acornButternutSquash,
        carbs1blueberries: carbs1blueberries,
        carbs1pwo: carbs1pwo,
        carbs2pwo: carbs2pwo,
        carbs3pwo: carbs3pwo,
        carbs4pwo: carbs4pwo,
        carbs5pwo: carbs5pwo,
        carbs6pwo: carbs6pwo
      };

      fat1 = changeUnit(showInGrams, 'fat', fat[0], 'oil');
      fat2 = changeUnit(showInGrams, 'fat', fat[1], 'oil');
      fat3 = changeUnit(showInGrams, 'fat', fat[2], 'oil');
      fat4 = changeUnit(showInGrams, 'fat', fat[3], 'oil');
      fat5 = changeUnit(showInGrams, 'fat', fat[4], 'oil');
      fat6 = changeUnit(showInGrams, 'fat', fat[5], 'oil');

      fat1butter = changeUnit(showInGrams, 'fat', fat[0], 'butter');
      fat2butter = changeUnit(showInGrams, 'fat', fat[1], 'butter');
      fat3butter = changeUnit(showInGrams, 'fat', fat[2], 'butter');
      fat4butter = changeUnit(showInGrams, 'fat', fat[3], 'butter');
      fat5butter = changeUnit(showInGrams, 'fat', fat[4], 'butter');
      fat6butter = changeUnit(showInGrams, 'fat', fat[5], 'butter');

      fat1nutButter = changeUnit(showInGrams, 'fat', fat[0], 'nutButter');
      fat2nutButter = changeUnit(showInGrams, 'fat', fat[1], 'nutButter');
      fat3nutButter = changeUnit(showInGrams, 'fat', fat[2], 'nutButter');
      fat4nutButter = changeUnit(showInGrams, 'fat', fat[3], 'nutButter');
      fat5nutButter = changeUnit(showInGrams, 'fat', fat[4], 'nutButter');
      fat6nutButter = changeUnit(showInGrams, 'fat', fat[5], 'nutButter');

      fat1avocado = changeUnit(showInGrams, 'fat', fat[0], 'avocado');
      fat2avocado = changeUnit(showInGrams, 'fat', fat[1], 'avocado');
      fat3avocado = changeUnit(showInGrams, 'fat', fat[2], 'avocado');
      fat4avocado = changeUnit(showInGrams, 'fat', fat[3], 'avocado');
      fat5avocado = changeUnit(showInGrams, 'fat', fat[4], 'avocado');
      fat6avocado = changeUnit(showInGrams, 'fat', fat[5], 'avocado');

      fats = {
        fat1: fat1,
        fat2: fat2,
        fat3: fat3,
        fat4: fat4,
        fat5: fat5,
        fat6: fat6,
        fat1butter: fat1butter,
        fat2butter: fat2butter,
        fat3butter: fat3butter,
        fat4butter: fat4butter,
        fat5butter: fat5butter,
        fat6butter: fat6butter,
        fat1nutButter: fat1nutButter,
        fat2nutButter: fat2nutButter,
        fat3nutButter: fat3nutButter,
        fat4nutButter: fat4nutButter,
        fat5nutButter: fat5nutButter,
        fat6nutButter: fat6nutButter,
        fat1avocado: fat1avocado,
        fat2avocado: fat2avocado,
        fat3avocado: fat3avocado,
        fat4avocado: fat4avocado,
        fat5avocado: fat5avocado,
        fat6avocado: fat6avocado
      };

      veggies = {
        veggies1: veggies[0],
        veggies2: veggies[1],
        veggies3: veggies[2],
        veggies4: veggies[3],
        veggies5: veggies[4],
        veggies6: veggies[5]
      };
    }

    const firstMealIcon = this.state.mealsBeforeWorkout === 0 ?
      <Image source={require('../../assets/icons/workout.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} /> :
      <Image source={require('../../assets/icons/breakfast.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />;

    const secondMealIcon = this.state.mealsBeforeWorkout === 1 ?
      <Image source={require('../../assets/icons/workout.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} /> :
      <Image source={require('../../assets/icons/half-sun.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />;

    const thirdMealIcon = this.state.mealsBeforeWorkout === 2 ?
      <Image source={require('../../assets/icons/workout.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} /> :
      <Image source={require('../../assets/icons/sun.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />;

    const fourthMealIcon = this.state.mealsBeforeWorkout === 3 ?
      <Image source={require('../../assets/icons/workout.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} /> :
      <Image source={require('../../assets/icons/sun.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />;

    const fifthMealIcon = this.state.mealsBeforeWorkout === 4 ?
      <Image source={require('../../assets/icons/workout.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} /> :
      <Image source={require('../../assets/icons/sunset.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />;

    const sixthMealIcon = <Image source={require('../../assets/icons/moon.png')} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />;

    // style based on state:
    // style={[styles.container, { borderRadius: !value ? Colors.gray : Colors.primaryColor }]}

    // passing new values from component actions:
    // this.props.onCheckboxChecked(newVal) - function passed in from parent, then you pass new value back from component

    return (
      <View style={Styles.body}>
        <ScrollView>
          <View style={Styles.title}>
            <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
          </View>

          <View>
            <View style={styles.optionWrapper}>
              <Text style={styles.optionTitle}>What time did you wake up?</Text>
              <TouchableHighlight style={styles.optionTooltip} onPress={() => {}}>
                <FontAwesome
                  style={styles.tooltipIcon}
                  name='info-circle'
                  size={16}
                />
              </TouchableHighlight>
            </View>

            <View style={styles.optionSection}>
              <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
                 <Text style={styles.optionButtonText}>8:00 a.m.</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.optionWrapper}>
              <Text style={styles.optionTitle}>Are you training today?</Text>
              <FontAwesome
                name='info-circle'
                size={16}
              />
            </View>

            <View style={styles.optionSection}>
              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.trainingIntensity === 0 ? Colors.primaryColor : 0 }]}
                onPress={() => { this.setState({ trainingIntensity: 0 }) }}>
                <Text style={styles.optionButtonText}>Rest or low-intensity exercise</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.trainingIntensity === 1 ? Colors.primaryColor : 0 }]}
                onPress={() => { this.setState({trainingIntensity: 1}) }}>
                 <Text style={styles.optionButtonText}>&#60; 90 min of high-intensity exercise</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.trainingIntensity === 2 ? Colors.primaryColor : 0 }]}
                onPress={() => { this.setState({ trainingIntensity: 2 }) }}>
                 <Text style={styles.optionButtonText}>&#62; 90 min of high-intensity exercise</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.optionWrapper}>
              <Text style={styles.optionTitle}>How many meals before your workout?</Text>
              <FontAwesome
                name='info-circle'
                size={16}
              />
            </View>

            <View style={styles.optionSection}>
              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 0 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({mealsBeforeWorkout: 0}) }}>
                 <Text style={styles.optionButtonText}>0</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 1 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({mealsBeforeWorkout: 1}) }}>
                 <Text style={styles.optionButtonText}>1</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 2 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({mealsBeforeWorkout: 2}) }}>
                 <Text style={styles.optionButtonText}>2</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 3 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({mealsBeforeWorkout: 3}) }}>
                 <Text style={styles.optionButtonText}>3</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 4 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({mealsBeforeWorkout: 4}) }}>
                 <Text style={styles.optionButtonText}>4</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.mealPlanSection}>
              <Text style={Styles.h1}>Todays Meal Plan</Text>
              <Text>Phase {this.state.phase}</Text>

              <View style={styles.mealsMenu}>
                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: this.state.currentMeal === 0 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({currentMeal: 0}) }}>
                    {firstMealIcon}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: this.state.currentMeal === 1 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({ currentMeal: 1 }) }}>
                   {secondMealIcon}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: this.state.currentMeal === 2 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({ currentMeal: 2 }) }}>
                   {thirdMealIcon}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: this.state.currentMeal === 3 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({currentMeal: 3}) }}>
                   <Text style={styles.optionButtonText}>4</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: this.state.currentMeal === 4 ? Colors.primaryColor : 0 }]}
                  onPress={() => { this.setState({currentMeal: 4}) }}>
                   {fifthMealIcon}
                </TouchableHighlight>

                {this.state.trainingIntensity !== 0 &&
                  <TouchableHighlight style={[styles.optionButton,
                    { borderColor: this.state.currentMeal === 5 ? Colors.primaryColor : 0 }]}
                    onPress={() => { this.setState({currentMeal: 5}) }}>
                     {sixthMealIcon}
                  </TouchableHighlight>
                }
              </View>

              <Meal
                trainingIntensity={this.state.trainingIntensity}
                mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                template={this.state.template}
                phase={this.state.phase}
                currentMeal={this.state.currentMeal}
                age={age}
                gender={gender}
                height={height}
                bodyweight={bodyweight}
                bodyfat={bodyfat}
                proteins={proteins}
                carbs={carbs}
                fats={fats}
                veggies={veggies}
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
              <Text style={[Styles.h2, Styles.textCenter]}>Meal Plan Settings</Text>

              <View style={styles.mealSettingsSectionList}>
                <TouchableHighlight onPress={() => {}}>
                   <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>View by day</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => {}}>
                   <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>View in macros</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => { this.setState({ showEnergyBalancePicker: true, showModal: true }) }}>
                   <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>Adjust energy balance</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>

        {this.state.showModal &&
          <View style={styles.showModal}></View>}

        <View style={styles.energyBalancePickerWrapper}>
          {this.state.showEnergyBalancePicker &&
            <Picker
              style={styles.picker}
              selectedValue={this.state.template}
              onValueChange={(itemValue, itemIndex) => this.saveTemplateType(itemValue)}>
              <Picker.Item label="Surplus 3" value={6} />
              <Picker.Item label="Surplus 2" value={5} />
              <Picker.Item label="Surplus 1" value={4} />
              <Picker.Item label="Base" value={0} />
              <Picker.Item label="Deficit 1" value={1} />
              <Picker.Item label="Deficit 2" value={2} />
              <Picker.Item label="Deficit 3" value={3} />
            </Picker>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  optionSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  optionTitle: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 10
  },
  optionTooltip: {
    paddingTop: 10
  },
  optionButton: {
    flex: 1,
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 5,
    borderBottomWidth: 3,
    borderColor: 0,
    backgroundColor: Colors.paleBlue
  },
  optionButtonText: {
    textAlign: 'center'
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
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20
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
    borderRadius: 1,
    marginRight: 5
  },
  progressButtonBad: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.paleRed,
    borderRadius: 1,
    marginLeft: 5
  },
  mealSettingsSection: {
    marginTop: 20,
    marginBottom: 20
  },
  mealSettingsLink: {
    paddingTop: 10,
    paddingBottom: 10
  },
  // energyBalancePickerWrapper: {
  //   position: 'absolute',
  //   top: 0,
  //   bottom: 0,
  //   borderColor: Colors.lightGray,
  //   borderWidth: 1,
  //   margin: 10,
  //   borderRadius: 2
  // },
  picker: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray
  },
  showModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.lightGray,
    opacity: 0.8
  }
});
