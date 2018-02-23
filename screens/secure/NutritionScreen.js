import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import * as labels from '../../constants/MealLabels';
import moment from 'moment';

import { calcProtein, calcCarbs, calcFat, calcVeggies } from '../../utils/calculate-macros';
import { changeUnit, calculateTotals, convertTrainingIntensity, setMealTimes } from '../../utils/helpers';

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
import ProgressBar from '../../components/ProgressBar';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Meal Plan',
  };

  constructor(props) {
    super(props);
    this.state = {
      mealsBeforeWorkout: 3,
      currentMeal: 1,

      showModal: false,
      showTimeTooltip: false,
      showTrainingTooltip: false,
      showMealsTooltip: false,
      showWakeTimePicker: false,
      showEnergyBalancePicker: false,

      phase: null,

      phase1meal1: null,
      phase1meal2: null,
      phase1meal3: null,
      phase1meal4: null,
      phase3meal1: null,
      phase3meal2: null,
      phase3meal3: null,
      phase3meal4: null,
      phase3meal5: null,
      phase3meal6: null
    };
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    client.on('value', snapshot => {
      this.setState({
        client: snapshot.val(),
        phase: snapshot.val().phase
      });
    });
  }

  componentDidMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    var dayStatuses = firebase.database().ref('dayStatuses');
    let clientResponse = null;

    client.on('value', snapshot => {
      clientResponse = snapshot.val();
    });

    dayStatuses.on('value', snapshot => {
      const date = new Date();
      const dayStatuses = snapshot.val();
      let filteredDayStatuses = [];
      Object.keys(dayStatuses).map(key => {
        if(dayStatuses[key].timestamp === clientResponse.timestamp) {
          filteredDayStatuses.push(dayStatuses[key]);
        }
      });
      let today;
      filteredDayStatuses.forEach(day => {
        if(day && day.date === moment(date).format('MM-DD-YY')) {
          today = day;
        }
      });

      let phase1meal1 = null;
      let phase1meal2 = null;
      let phase1meal3 = null;
      let phase1meal4 = null;
      let phase3meal1 = null;
      let phase3meal2 = null;
      let phase3meal3 = null;
      let phase3meal4 = null;
      let phase3meal5 = null;
      let phase3meal6 = null;

      if(today) {
        const phase = today.phase;

        phase1meal1 = (phase === 1 ? today.meal1 : null);
        phase1meal2 = (phase === 1 ? today.meal2 : null);
        phase1meal3 = (phase === 1 ? today.meal3 : null);
        phase1meal4 = (phase === 1 ? today.meal4 : null);

        phase3meal1 = (phase === 3 ? today.meal1 : null);
        phase3meal2 = (phase === 3 ? today.meal2 : null);
        phase3meal3 = (phase === 3 ? today.meal3 : null);
        phase3meal4 = (phase === 3 ? today.meal4 : null);
        phase3meal5 = (phase === 3 ? today.meal5 : null);
        phase3meal6 = (phase === 3 ? today.meal6 : null);
      }

      this.setState({
        dayStatuses: snapshot.val(),
        phase1meal1: phase1meal1,
        phase1meal2: phase1meal2,
        phase1meal3: phase1meal3,
        phase1meal4: phase1meal4,
        phase3meal1: phase3meal1,
        phase3meal2: phase3meal2,
        phase3meal3: phase3meal3,
        phase3meal4: phase3meal4,
        phase3meal5: phase3meal5,
        phase3meal6: phase3meal6
      });
    });
  }

  saveTemplateType(template) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

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

  saveWakeTime(time) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ wakeTime: time });
    this.setState({
      showModal: false,
      showWakeTimePicker: false
    });
  }

  saveTrainingIntensity(intensity) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    if(this.state.phase === 3) {
      client.update({ trainingIntensity: intensity });
    } else {
      client.update({ phase1training: intensity });
    }
  }

  saveCurrentMeal(meal) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ selectedMeal: meal });
  }

  toggleView(viewAllMeals) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ viewAllMeals: !viewAllMeals });
  }

  toggleUnits(showInGrams) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ showInGrams: !showInGrams });
  }

  completeMeal(phase, currentMeal, completion) {
    const client = this.state.client;
    const dayStatuses = this.state.dayStatuses;
    const mealToSave = 'meal' + (Number(currentMeal) + 1);
    const date = new Date();
    let todayKey;
    let todayRef;
    let today;

    Object.keys(dayStatuses).map(key => {
      if(dayStatuses[key].timestamp === client.timestamp) {
        if(dayStatuses[key].date === moment(date).format('MM-DD-YY')) {
          todayKey = key;
          today = dayStatuses[key];
        }
      }
    });

    if(today && todayKey) {
      // set meal completed boolean
      if(today[mealToSave] === completion) {
        today[mealToSave] = 3;
        this.setState({ [mealToSave]: 3 });
      } else {
        today[mealToSave] = completion;
        this.setState({ [mealToSave]: completion });
      }

      todayRef = firebase.database().ref().child('dayStatuses/' + todayKey);

      todayRef.update({ [mealToSave]: today[mealToSave] }).then(resp => {
        const team = client.challengeGroupTeam;

        if(team) {
          const meal1 = today.meal1 < 3 ? true : false;
          const meal2 = today.meal2 < 3 ? true : false;
          const meal3 = today.meal3 < 3 ? true : false;
          const meal4 = today.meal4 < 3 ? true : false;
          const meal5 = today.meal5 < 3 ? true : false;
          const meal6 = today.meal6 < 3 ? true : false;
          let numberOfMealsToComplete = 4;
          let mealsCompleted = false;

          if(phase === 3) {
            if(client.trainingIntensity === 0) {
              numberOfMealsToComplete = numberOfMealsToComplete + 1;
            } else {
              numberOfMealsToComplete = numberOfMealsToComplete + 2;
            }
          }

          if(numberOfMealsToComplete === 4 && meal1 && meal2 && meal3 && meal4) {
            mealsCompleted = true;
          } else if(numberOfMealsToComplete === 5 && meal1 && meal2 && meal3 && meal4 && meal5) {
            mealsCompleted = true;
          } else if(numberOfMealsToComplete === 6 && meal1 && meal2 && meal3 && meal4 && meal5 && meal6) {
            mealsCompleted = true;
          }

          const todayMealsCompleted = today.allMealsCompleted;
          if(todayMealsCompleted && today.meal1 === 3 ||
           todayMealsCompleted && today.meal2 === 3 ||
           todayMealsCompleted && today.meal3 === 3 ||
           todayMealsCompleted && today.meal4 === 3 ||
           todayMealsCompleted && today.meal5 === 3 ||
           todayMealsCompleted && today.meal6 === 3) {
             // clean up code
             const challengeGroupTeamsRef = firebase.database().ref().child('challengeGroupTeams');
             let teamKey;

             challengeGroupTeamsRef.on('value', snapshot => {
               const teams = snapshot.val();

               Object.keys(teams).map(key => {
                 if(teams[key].name === team) {
                   teamKey = key;
                   return teams[key];
                 }
               });

               if(teamKey) {
                 const challengeGroupTeamRef = firebase.database().ref().child('challengeGroupTeams/' + teamKey);
                 const points = challengeGroupTeamRef.points ? challengeGroupTeamRef.points : 0;
                 challengeGroupTeamRef.update({ points: (points - 1) > -1 ? (points - 1) : 0 });
                 todayRef.update({ allMealsCompleted: false });
               }
             });

             return;
          }

          if(mealsCompleted) {
            // clean up code
            const challengeGroupTeamsRef = firebase.database().ref().child('challengeGroupTeams');
            let teamKey;

            challengeGroupTeamsRef.on('value', snapshot => {
              const teams = snapshot.val();

              Object.keys(teams).map(key => {
                if(teams[key].name === team) {
                  teamKey = key;
                  return teams[key];
                }
              });

              if(teamKey) {
                const challengeGroupTeamRef = firebase.database().ref().child('challengeGroupTeams/' + teamKey);
                const points = challengeGroupTeamRef.points ? challengeGroupTeamRef.points : 0;
                challengeGroupTeamRef.update({ points: (points + 1) });
                todayRef.update({ allMealsCompleted: true });
              }
            });
            return;
          }
        }
      }, reason => {
        alert('uh oh...');
      });
    } else {
      alert('new today');
      // save date and selected meal and whether completed or not
      this.store.createRecord('day-status', {
        date: moment(date).format('MM-DD-YY'),
        fullDate: date,
        timestamp: this.get('timestamp'),
        phase: phase,
        meal1: 3,
        meal2: 3,
        meal3: 3,
        meal4: 3,
        meal5: 3,
        meal6: 3
      }).save().then(resp => {
        Ember.Logger.log('saved meal completion', 'meal:', resp.get(mealToSave));

        resp.set(mealToSave, completion);

        resp.save().then(resp => {
          Ember.Logger.log('saved meal completion', 'meal:', resp.get(mealToSave));
        }, reason => {
          Ember.Logger.error('could not save meal completion', reason);
        });
      }, reason => {
        Ember.Logger.error('could not save meal completion', reason);
      });
    }
  }

  clickNavPhase(phase) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ phase: phase });
    this.setState({ phase: phase });
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
    let phase;
    let currentMeal;
    let mealsBeforeWorkout;
    let trainingIntensity;
    let showInGrams;
    let viewAllMeals;
    let isPwoMeal;
    let wakeTime;
    let mealTimes = {
      breakfastTime: null,
      earlyLunchTime: null,
      lateLunchTime: null,
      dinnerTime: null
    };

    let complete1;
    let complete2;
    let complete3;
    let complete4;
    let complete5;
    let complete6;
    let enablePhase2;
    let enablePhase3;
    let showRestDay;

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
      phase = client.phase;
      currentMeal = client.selectedMeal ? client.selectedMeal : 0;
      trainingIntensity = phase === 3 ? convertTrainingIntensity(client.trainingIntensity) : client.phase1training;
      enablePhase2 = client.enablePhase2;
      enablePhase3 = client.enablePhase3;

      if(phase === 3) {
        mealsBeforeWorkout = this.state.mealsBeforeWorkout;
        showInGrams = client.showInGrams;
        viewAllMeals = client.viewAllMeals;
        isPwoMeal = (trainingIntensity > 0 && mealsBeforeWorkout === (currentMeal + 1)) ? true : false;
      }

      wakeTime = client.wakeTime;

      if(wakeTime) {
        mealTimes = setMealTimes(wakeTime, phase, trainingIntensity, mealsBeforeWorkout);
      }

      if(phase === 3) {
        phase3meal1 = client.phase3meal1;
        phase3meal2 = client.phase3meal2;
        phase3meal3 = client.phase3meal3;
        phase3meal4 = client.phase3meal4;
        phase3meal5 = client.phase3meal5;
        phase3meal6 = client.phase3meal6;

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
      } else {
        proteins = ['Chicken', 'Turkey', 'Lean beef', 'Fish', 'Lean pork', 'Game meats'];
        carbs = ['White rice', 'Brown rice', 'White potatoes', 'Sweet potatoes', 'Rolled oats', 'Quinoa', 'Acorn squash', 'Butternut squash'];
        fats = ['Avocado', 'Grass-fed butter', 'Olive oil', 'Coconut oil', 'Nut butter'];
        veggies = ['Spinach', 'Broccoli', 'Lettuce', 'Onions', 'Asparagus', 'Kale', 'Bell peppers', 'Cabbage', 'Cauliflower', 'Celery', 'Cucumbers', 'Mushrooms', 'Yellow squash', 'Zucchini', 'Mixed veggies'];
      }
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

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>What time did you wake up?</Text>
            <TouchableHighlight
              style={styles.optionTooltip}
              underlayColor={Colors.paleBlue}
              onPress={() => { this.setState({ showModal: true, showTimeTooltip: true }) }}>
              <FontAwesome
                style={styles.tooltipIcon}
                name='info-circle'
                size={16}
              />
            </TouchableHighlight>
          </View>

          <View>
            <TouchableHighlight
              style={styles.optionButton}
              underlayColor={Colors.paleBlue}
              onPress={() => { this.setState({ showModal: true, showWakeTimePicker: true }) }}>
              <Text style={styles.optionButtonText}>{wakeTime ? wakeTime : '7:00 a.m.'}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>Are you training today?</Text>
            <TouchableHighlight
              style={styles.optionTooltip}
              underlayColor={Colors.paleBlue}
              onPress={() => { this.setState({ showModal: true, showTrainingTooltip: true }) }}>
              <FontAwesome
                style={styles.tooltipIcon}
                name='info-circle'
                size={16}
              />
            </TouchableHighlight>
          </View>

          {this.state.phase < 3 && <View style={styles.optionSection}>
            <TouchableHighlight style={[styles.optionButton,
              { borderColor: trainingIntensity === true ? Colors.primaryColor : 0 }]}
              underlayColor={Colors.paleBlue}
              onPress={() => { this.saveTrainingIntensity(true) }}>
              <Text style={styles.optionButtonText}>Yes</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.optionButton,
              { borderColor: trainingIntensity === false ? Colors.primaryColor : 0 }]}
               underlayColor={Colors.paleBlue}
               onPress={() => { this.saveTrainingIntensity(false) }}>
               <Text style={styles.optionButtonText}>No</Text>
            </TouchableHighlight>
          </View>}

          {this.state.phase === 3 && <View style={styles.optionSection}>
            <TouchableHighlight style={[styles.optionButton,
              { borderColor: trainingIntensity === 0 ? Colors.primaryColor : 0 }]}
              underlayColor={Colors.paleBlue}
              onPress={() => { this.saveTrainingIntensity('rest') }}>
              <Text style={styles.optionButtonText}>Rest or low-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.optionButton,
               { borderColor: trainingIntensity === 1 ? Colors.primaryColor : 0 }]}
               underlayColor={Colors.paleBlue}
               onPress={() => { this.saveTrainingIntensity('moderate') }}>
               <Text style={styles.optionButtonText}>&#60; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.optionButton,
              { borderColor: trainingIntensity === 2 ? Colors.primaryColor : 0 }]}
               underlayColor={Colors.paleBlue}
               onPress={() => { this.saveTrainingIntensity('hard') }}>
               <Text style={styles.optionButtonText}>&#62; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>
          </View>}

          {(this.state.phase === null) &&
            <Text style={Styles.centerText}>Loading...</Text>}

          {(this.state.phase === 1) &&
            <Text style={Styles.centerText}>Phase 1</Text>}

          {(this.state.phase === 2) &&
            <Text style={Styles.centerText}>Phase 2</Text>}

          <View>
            {(this.state.phase === 3) && <View><View style={styles.optionWrapper}>
              <Text style={styles.optionTitle}>How many meals before your workout?</Text>
              <TouchableHighlight style={styles.optionTooltip} underlayColor={Colors.paleBlue} onPress={() => { this.setState({ showModal: true, showMealsTooltip: true }) }}>
                <FontAwesome
                  style={styles.tooltipIcon}
                  name='info-circle'
                  size={16}
                />
              </TouchableHighlight>
            </View>

            <View style={styles.optionSection}>
              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 0 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.setState({mealsBeforeWorkout: 0}) }}>
                 <Text style={styles.optionButtonText}>0</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 1 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.setState({mealsBeforeWorkout: 1}) }}>
                 <Text style={styles.optionButtonText}>1</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 2 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.setState({mealsBeforeWorkout: 2}) }}>
                 <Text style={styles.optionButtonText}>2</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 3 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.setState({mealsBeforeWorkout: 3}) }}>
                 <Text style={styles.optionButtonText}>3</Text>
              </TouchableHighlight>

              <TouchableHighlight style={[styles.optionButton,
                { borderColor: this.state.mealsBeforeWorkout === 4 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.setState({mealsBeforeWorkout: 4}) }}>
                 <Text style={styles.optionButtonText}>4</Text>
              </TouchableHighlight>
            </View></View>}

            <View style={styles.mealPlanSection}>
              <Text style={Styles.h1}>Todays Meal Plan</Text>
              <Text>Phase {phase}</Text>

              {!viewAllMeals && <View style={styles.mealsMenu}>
                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: currentMeal === 0 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.saveCurrentMeal(0) }}>
                    {firstMealIcon}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: currentMeal === 1 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.saveCurrentMeal(1) }}>
                   {secondMealIcon}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: currentMeal === 2 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.saveCurrentMeal(2) }}>
                   {thirdMealIcon}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.optionButton,
                  { borderColor: currentMeal === 3 ? Colors.primaryColor : 0 }]}
                   underlayColor={Colors.paleBlue}
                   onPress={() => { this.saveCurrentMeal(3) }}>
                   <Text style={styles.optionButtonText}>4</Text>
                </TouchableHighlight>

                {this.state.phase === 3 &&
                  <TouchableHighlight style={[styles.optionButton,
                    { borderColor: currentMeal === 4 ? Colors.primaryColor : 0 }]}
                     underlayColor={Colors.paleBlue}
                     onPress={() => { this.saveCurrentMeal(4) }}>
                     {fifthMealIcon}
                  </TouchableHighlight>}

                {(this.state.phase === 3 && trainingIntensity !== 0) &&
                  <TouchableHighlight style={[styles.optionButton,
                    { borderColor: currentMeal === 5 ? Colors.primaryColor : 0 }]}
                     underlayColor={Colors.paleBlue}
                     onPress={() => { this.saveCurrentMeal(5) }}>
                     {sixthMealIcon}
                  </TouchableHighlight>}
              </View>}

              {!viewAllMeals && <Meal
                trainingIntensity={trainingIntensity}
                mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                template={template}
                phase={phase}
                currentMeal={currentMeal}
                breakfastTime={mealTimes['breakfastTime']}
                earlyLunchTime={mealTimes['earlyLunchTime']}
                lateLunchTime={mealTimes['lateLunchTime']}
                dinnerTime={mealTimes['dinnerTime']}
                age={age}
                gender={gender}
                height={height}
                bodyweight={bodyweight}
                bodyfat={bodyfat}
                proteins={proteins}
                carbs={carbs}
                fats={fats}
                veggies={veggies}
                showInGrams={showInGrams} />}

              {(this.state.phase === 3 && viewAllMeals) && <View>
                <Meal
                  trainingIntensity={trainingIntensity}
                  mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                  template={template}
                  phase={phase}
                  currentMeal={0}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  age={age}
                  gender={gender}
                  height={height}
                  bodyweight={bodyweight}
                  bodyfat={bodyfat}
                  proteins={proteins}
                  carbs={carbs}
                  fats={fats}
                  veggies={veggies}
                  pwo={isPwoMeal}
                  showInGrams={showInGrams} />
                <Meal
                  trainingIntensity={trainingIntensity}
                  mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                  template={template}
                  phase={phase}
                  currentMeal={1}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  age={age}
                  gender={gender}
                  height={height}
                  bodyweight={bodyweight}
                  bodyfat={bodyfat}
                  proteins={proteins}
                  carbs={carbs}
                  fats={fats}
                  veggies={veggies}
                  pwo={isPwoMeal}
                  showInGrams={showInGrams} />
                <Meal
                  trainingIntensity={trainingIntensity}
                  mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                  template={template}
                  phase={phase}
                  currentMeal={2}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  age={age}
                  gender={gender}
                  height={height}
                  bodyweight={bodyweight}
                  bodyfat={bodyfat}
                  proteins={proteins}
                  carbs={carbs}
                  fats={fats}
                  veggies={veggies}
                  pwo={isPwoMeal}
                  showInGrams={showInGrams} />
                <Meal
                  trainingIntensity={trainingIntensity}
                  mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                  template={template}
                  phase={phase}
                  currentMeal={3}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  age={age}
                  gender={gender}
                  height={height}
                  bodyweight={bodyweight}
                  bodyfat={bodyfat}
                  proteins={proteins}
                  carbs={carbs}
                  fats={fats}
                  veggies={veggies}
                  pwo={isPwoMeal}
                  showInGrams={showInGrams} />
                <Meal
                  trainingIntensity={trainingIntensity}
                  mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                  template={template}
                  phase={phase}
                  currentMeal={4}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  age={age}
                  gender={gender}
                  height={height}
                  bodyweight={bodyweight}
                  bodyfat={bodyfat}
                  proteins={proteins}
                  carbs={carbs}
                  fats={fats}
                  veggies={veggies}
                  pwo={isPwoMeal}
                  showInGrams={showInGrams} />
                <Meal
                  trainingIntensity={trainingIntensity}
                  mealsBeforeWorkout={this.state.mealsBeforeWorkout}
                  template={template}
                  phase={phase}
                  currentMeal={5}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  age={age}
                  gender={gender}
                  height={height}
                  bodyweight={bodyweight}
                  bodyfat={bodyfat}
                  proteins={proteins}
                  carbs={carbs}
                  fats={fats}
                  veggies={veggies}
                  pwo={isPwoMeal}
                  showInGrams={showInGrams} />
                </View>}
            </View>
          </View>

          <View style={styles.progressSection}>
            {!viewAllMeals &&
              <TouchableHighlight
                style={styles.progressButtonGood}
                underlayColor='white'
                onPress={() => { this.completeMeal(phase, currentMeal, 1) }}>
                 <Text style={[styles.progressButtonText, styles.progressButtonGoodText]}>
                   <FontAwesome
                     style={styles.progressButtonGoodIcon}
                     name='check'
                     size={16}
                   /> Ate meal on plan!
                 </Text>
            </TouchableHighlight>}

            {!viewAllMeals && <TouchableHighlight style={styles.progressButtonBad} underlayColor='white' onPress={() => { this.completeMeal(phase, currentMeal, 2) }}>
               <Text style={[styles.progressButtonText, styles.progressButtonBadText]}>
                 <FontAwesome
                   style={styles.progressButtonBadIcon}
                   name='remove'
                   size={16}
                 /> Ate off plan
               </Text>
            </TouchableHighlight>}
          </View>

          <View>
            {viewAllMeals &&
              <Text>View by meal to see meal completion buttons.</Text>}
          </View>

          <View>
            <ProgressBar
              complete1={this.state.phase3meal1}
              complete2={this.state.phase3meal2}
              complete3={this.state.phase3meal3}
              complete4={this.state.phase3meal4}
              complete5={this.state.phase3meal5}
              complete6={this.state.phase3meal6}
              phase={phase}
              enablePhase2={enablePhase2}
              enablePhase3={enablePhase3}
              trainingIntensity={trainingIntensity} />
          </View>

          <View style={styles.phaseNavButtons}>
            {(this.state.phase === 2) &&
              <TouchableHighlight style={styles.phaseNavButton}
                onPress={() => { this.clickNavPhase(1) }}>
                <Text style={styles.phaseNavButtonText}>
                  <FontAwesome
                    style={styles.phaseNavButtonIconLeft}
                    name='arrow-left'
                    size={24}
                  />
                  Phase 1
                </Text>
              </TouchableHighlight>}

            {(this.state.phase > 2) &&
              <TouchableHighlight style={styles.phaseNavButton}
                onPress={() => { this.clickNavPhase(2) }}>
                <Text style={styles.phaseNavButtonText}>
                  <FontAwesome
                    style={styles.phaseNavButtonIconLeft}
                    name='arrow-left'
                    size={24}
                  />
                  Phase 2
                </Text>
              </TouchableHighlight>}

            {(this.state.phase === 2) &&
              <TouchableHighlight style={styles.phaseNavButton}
                onPress={() => { this.clickNavPhase(3) }}>
                <Text style={styles.phaseNavButtonText}>
                Phase 3
                <FontAwesome
                  style={styles.phaseNavButtonIconRight}
                  name='arrow-right'
                  size={24}
                />
                </Text>
              </TouchableHighlight>}

            {(this.state.phase === 1) &&
              <View style={styles.phaseNavButton}>
              </View>}

            {(this.state.phase === 1) &&
              <TouchableHighlight style={styles.phaseNavButton}
                onPress={() => { this.clickNavPhase(2) }}>
                <Text style={styles.phaseNavButtonText}>
                  Phase 2
                  <FontAwesome
                    style={styles.phaseNavButtonIconRight}
                    name='arrow-right'
                    size={24}
                  />
                </Text>
              </TouchableHighlight>}
          </View>

          {this.state.phase === 3 && <View style={styles.mealSettingsSection}>
            <Text style={[Styles.h2, Styles.textCenter]}>Meal Plan Settings</Text>

            <View style={styles.mealSettingsSectionList}>
              <TouchableHighlight underlayColor='white' onPress={() => { this.toggleView(viewAllMeals) }}>
                 <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>
                 {viewAllMeals && 'View by meal'}
                 {!viewAllMeals && 'View by day'}
                 </Text>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='white' onPress={() => { this.toggleUnits(showInGrams) }}>
                 <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>
                  {showInGrams && 'View in serving sizes'}
                  {!showInGrams && 'View in macros'}
                 </Text>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='white' onPress={() => { this.setState({ showEnergyBalancePicker: true, showModal: true }) }}>
                 <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>Adjust energy balance</Text>
              </TouchableHighlight>
            </View>
          </View>}
        </ScrollView>

        {this.state.showModal &&
          <View style={Styles.showModal}></View>}

        {this.state.showWakeTimePicker && <View style={styles.wakeTimePicker}>
          <Picker
            selectedValue={wakeTime ? wakeTime : '7:00 a.m.'}
            onValueChange={(itemValue, itemIndex) => this.saveWakeTime(itemValue)}>
            <Picker.Item label="12:00 a.m." value="12:00 a.m." />
            <Picker.Item label="12:30 a.m." value="12:30 a.m." />
            <Picker.Item label="1:00 a.m." value="1:00 a.m." />
            <Picker.Item label="1:30 a.m." value="1:30 a.m." />
            <Picker.Item label="2:00 a.m." value="2:00 a.m." />
            <Picker.Item label="2:30 a.m." value="2:30 a.m." />
            <Picker.Item label="3:00 a.m." value="3:00 a.m." />
            <Picker.Item label="3:30 a.m." value="3:30 a.m." />
            <Picker.Item label="4:00 a.m." value="4:00 a.m." />
            <Picker.Item label="4:30 a.m." value="4:30 a.m." />
            <Picker.Item label="5:00 a.m." value="5:00 a.m." />
            <Picker.Item label="5:30 a.m." value="5:30 a.m." />
            <Picker.Item label="6:00 a.m." value="6:00 a.m." />
            <Picker.Item label="6:30 a.m." value="6:30 a.m." />
            <Picker.Item label="7:00 a.m." value="7:00 a.m." />
            <Picker.Item label="7:30 a.m." value="7:30 a.m." />
            <Picker.Item label="8:00 a.m." value="8:00 a.m." />
            <Picker.Item label="8:30 a.m." value="8:30 a.m." />
            <Picker.Item label="9:00 a.m." value="9:00 a.m." />
            <Picker.Item label="9:30 a.m." value="9:30 a.m." />
            <Picker.Item label="10:00 a.m." value="10:00 a.m." />
            <Picker.Item label="10:30 a.m." value="10:30 a.m." />
            <Picker.Item label="11:00 a.m." value="11:00 a.m." />
            <Picker.Item label="11:30 a.m." value="11:30 a.m." />

            <Picker.Item label="12:00 p.m." value="12:00 p.m." />
            <Picker.Item label="12:30 p.m." value="12:30 p.m." />
            <Picker.Item label="1:00 p.m." value="1:00 p.m." />
            <Picker.Item label="1:30 p.m." value="1:30 p.m." />
            <Picker.Item label="2:00 p.m." value="2:00 p.m." />
            <Picker.Item label="2:30 p.m." value="2:30 p.m." />
            <Picker.Item label="3:00 p.m." value="3:00 p.m." />
            <Picker.Item label="3:30 p.m." value="3:30 p.m." />
            <Picker.Item label="4:00 p.m." value="4:00 p.m." />
            <Picker.Item label="4:30 p.m." value="4:30 p.m." />
            <Picker.Item label="5:00 p.m." value="5:00 p.m." />
            <Picker.Item label="5:30 p.m." value="5:30 p.m." />
            <Picker.Item label="6:00 p.m." value="6:00 p.m." />
            <Picker.Item label="6:30 p.m." value="6:30 p.m." />
            <Picker.Item label="7:00 p.m." value="7:00 p.m." />
            <Picker.Item label="7:30 p.m." value="7:30 p.m." />
            <Picker.Item label="8:00 p.m." value="8:00 p.m." />
            <Picker.Item label="8:30 p.m." value="8:30 p.m." />
            <Picker.Item label="9:00 p.m." value="9:00 p.m." />
            <Picker.Item label="9:30 p.m." value="9:30 p.m." />
            <Picker.Item label="10:00 p.m." value="10:00 p.m." />
            <Picker.Item label="10:30 p.m." value="10:30 p.m." />
            <Picker.Item label="11:00 p.m." value="11:00 p.m." />
            <Picker.Item label="11:30 p.m." value="11:30 p.m." />
          </Picker>
        </View>}

        {this.state.showTimeTooltip && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight underlayColor='white' onPress={() => { this.setState({ showTimeTooltip: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>
            <Text style={Styles.tooltipHeader}>Wake Time</Text>
            <Text style={Styles.tooltipParagraph}>Enter the time you woke up today, and the times to eat each meal will be shown in your meal plan.</Text>
            <Text style={Styles.tooltipParagraph}>The guidelines for meal timing are to have breakfast within an hour of waking up, and to have subsequent meals 3-5 hours apart.</Text>
            <Text style={Styles.tooltipParagraph}>Why is meal timing important? Protein is not stored in your body like fat and carbs are, so a constant stream of amino acids (the building blocks of protein) is necessary to maintain lean muscle mass (more lean muscle mass = faster metabolism!). It is almost important to keep blood sugar levels steady throughout the day so you can maintain even energy and avoid the dreaded afternoon slump.</Text>
            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>}

        {this.state.showTrainingTooltip && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight underlayColor='white' onPress={() => { this.setState({ showTrainingTooltip: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>
            <Text style={Styles.tooltipHeader}>Training</Text>
            <Text style={Styles.tooltipParagraph}>Here, training is considered intense physical exercise, including weightlifting, HIIT, CrossFit, and endurance training.</Text>

            <Text style={Styles.tooltipTerm}>Rest/light cardio</Text>
            <Text style={Styles.tooltipParagraph}>Light cardio like walking, jogging, yoga, barre, etc is considered a rest day.</Text>

            <Text style={Styles.tooltipTerm}>Less than 90 minutes</Text>
            <Text style={Styles.tooltipParagraph}>If high-intensity training lasts for less than an hour and a half.</Text>

            <Text style={Styles.tooltipTerm}>More than 90 minutes</Text>
            <Text style={Styles.tooltipParagraph}>If high-intensity training lasts for more than an hour and a half.</Text>
          </View>
        </ScrollView>}

        {this.state.showMealsTooltip && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight underlayColor='white' onPress={() => { this.setState({ showMealsTooltip: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>
            <Text style={Styles.tooltipHeader}>Number of Meals Before Your Workout</Text>
            <Text style={Styles.tooltipParagraph}>This option indicates how many meals you will have eaten before your workout of the day. Keep in mind that meals should be spaced 3-5 hours apart, with breakfast being within an hour of waking.</Text>
            <Text style={Styles.tooltipParagraph}>For example, if you wake up at 7 a.m. and workout at 6 p.m., you will have eaten breakfast by 8 a.m., early lunch around 12 p.m., and late lunch around 3 p.m., so you choose the "3 meals" option.</Text>
          </View>
        </ScrollView>}

        {this.state.showEnergyBalancePicker && <View>
          <Picker
            style={styles.picker}
            selectedValue={template}
            onValueChange={(itemValue, itemIndex) => this.saveTemplateType(itemValue)}>
            <Picker.Item label="Surplus 3" value={6} />
            <Picker.Item label="Surplus 2" value={5} />
            <Picker.Item label="Surplus 1" value={4} />
            <Picker.Item label="Base" value={0} />
            <Picker.Item label="Deficit 1" value={1} />
            <Picker.Item label="Deficit 2" value={2} />
            <Picker.Item label="Deficit 3" value={3} />
          </Picker>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingTop: 10,
    marginLeft: 5
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
  progressButtonGoodText: {
    color: Colors.primaryColor
  },
  progressButtonBadText: {
    color: Colors.paleRed
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
  progressButtonGoodIcon: {
    color: Colors.primaryColor
  },
  progressButtonBadIcon: {
    color: Colors.paleRed
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
  phaseNavButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  phaseNavButton: {
    flex: 1,
    padding: 20
  },
  phaseNavButtonText: {
    fontSize: 18
  },
  mealSettingsSection: {
    marginTop: 20,
    marginBottom: 20
  },
  mealSettingsLink: {
    paddingTop: 10,
    paddingBottom: 10
  },
  picker: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray
  }
});
