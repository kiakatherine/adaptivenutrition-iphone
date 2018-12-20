import React from 'react';
import { AsyncStorage } from 'react-native';
import Swiper from 'react-native-swiper';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import * as labels from '../../constants/MealLabels';
import * as templates from '../../constants/Templates';
import * as macroRatios from '../../constants/MacroRatios';
import moment from 'moment';
import format from 'date-fns/format';
import TemplatePicker from '../../components/TemplatePicker';
import MealOptions from '../../components/MealOptions';

import { calcProtein, calcCarbs, calcFat, calcVeggies, calculateTotals } from '../../utils/calculate-macros';
import { changeUnit, convertTrainingTimeToString, format12Hour, getAge, setMealTimes } from '../../utils/helpers';

const TEMPLATE_TYPES = ['Home (Step 1)', 'Build muscle (Step 2)', 'Lose weight (Step 2)', 'Lock in results (Step 3)', 'Lock in results (Step 4)', 'New home (Step 5)'];

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

import Header from '../../components/Header';
import Meal from '../../components/Meal';
import ProgressBar from '../../components/ProgressBar';
import ModalWindow from '../../components/ModalWindow';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Meal Plan',
  };

  constructor(props) {
    super(props);
    this.state = {
      // mealsBeforeWorkout: 3,

      showModal: false,
      showWaketimeTooltip: false,
      showTrainingTooltip: false,
      showMealsBeforeWorkoutTooltip: false,
      showMealsTooltip: false,
      showWakeTimePicker: false,
      showMealsBeforeWorkoutPicker: false,
      showTemplatePicker: false,
      showNeedBodyweightEntries: false,
      showTemplateConfirmation: false,
      showStepSuccessMessage: false,
      showMacrosWarning: false,
      showMealPlanSettings: false,
      showNavPhase: false,

      potentialTemplate: null,
      phase: null,

      phase1meal1: null,
      phase1meal2: null,
      phase1meal3: null,
      phase1meal4: null,

      phase2meal1: null,
      phase2meal2: null,
      phase2meal3: null,
      phase2meal4: null,

      phase3meal1: null,
      phase3meal2: null,
      phase3meal3: null,
      phase3meal4: null,
      phase3meal5: null,
      phase3meal6: null,

      phaseTwoMealComplete: false
    };

    this.movePhase = this.movePhase.bind(this);
    this.clickNavPhase = this.clickNavPhase.bind(this);
    this.showTemplatePicker = this.showTemplatePicker.bind(this);
    this.saveMeasurement = this.saveMeasurement.bind(this);
    this.saveTemplateType = this.saveTemplateType.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this._saveCurrentMeal = this._saveCurrentMeal.bind(this);
    this._completeMeal = this._completeMeal.bind(this);
    this._onChangeGender = this._onChangeGender.bind(this);
    this._onChangeBodyweight = this._onChangeBodyweight.bind(this);
    this._onChangeHeight = this._onChangeHeight.bind(this);
    this._onChangeBodyfat = this._onChangeBodyfat.bind(this);
    this._onChangeBirthdate = this._onChangeBirthdate.bind(this);
  }

  async getTodayStatuses() {
    let userData = await AsyncStorage.getItem("user");
    let currentUser = JSON.parse(userData);
    const uid = currentUser.uid;
    const clientRef = firebase.database().ref('/clients/' + uid);
    const clientDayStatuses = firebase.database().ref('/clients/' + uid + '/day-statuses');
    let phase = null;

    clientRef.on('value', snapshot => {
      phase = snapshot.val().phase;

      clientDayStatuses.on('value', snapshot => {
        const todaysDate = moment(new Date()).format('YYYY-MM-DD');
        const resp = snapshot.val();
        let today = null;

        Object.keys(resp).map(key => {
          if(resp[key].date === todaysDate && (resp[key].phase === phase)) {
            today = resp[key];
          }
        });

        let phase1meal1 = null, phase1meal2 = null, phase1meal3 = null, phase1meal4 = null,
            phase2meal1 = null, phase2meal2 = null, phase2meal3 = null, phase2meal4 = null,
            phase3meal1 = null, phase3meal2 = null, phase3meal3 = null, phase3meal4 = null, phase3meal5 = null;

        if(today) {
          const phase = today.phase;

          phase1meal1 = (phase === 1 ? today.meal1 : null);
          phase1meal2 = (phase === 1 ? today.meal2 : null);
          phase1meal3 = (phase === 1 ? today.meal3 : null);
          phase1meal4 = (phase === 1 ? today.meal4 : null);

          phase2meal1 = (phase === 1 ? today.meal1 : null);
          phase2meal2 = (phase === 1 ? today.meal2 : null);
          phase2meal3 = (phase === 1 ? today.meal3 : null);
          phase2meal4 = (phase === 1 ? today.meal4 : null);

          phase3meal1 = (phase === 3 ? today.meal1 : null);
          phase3meal2 = (phase === 3 ? today.meal2 : null);
          phase3meal3 = (phase === 3 ? today.meal3 : null);
          phase3meal4 = (phase === 3 ? today.meal4 : null);
          phase3meal5 = (phase === 3 ? today.meal5 : null);
        }

        this.setState({
          phase1meal1: phase1meal1,
          phase1meal2: phase1meal2,
          phase1meal3: phase1meal3,
          phase1meal4: phase1meal4,

          phase2meal1: phase2meal1,
          phase2meal2: phase2meal2,
          phase2meal3: phase2meal3,
          phase2meal4: phase2meal4,

          phase3meal1: phase3meal1,
          phase3meal2: phase3meal2,
          phase3meal3: phase3meal3,
          phase3meal4: phase3meal4,
          phase3meal5: phase3meal5
        });
      });
    });
  }

  async getClientData() {
    let userData = await AsyncStorage.getItem("user");
    let currentUser = JSON.parse(userData);
    const uid = currentUser.uid;
    const clientRef = firebase.database().ref('/clients/' + uid);
    let clientResponse = null;

    clientRef.on('value', snapshot => {
      clientResponse = snapshot.val();
      this.setState({
        client: clientResponse,
        phase: clientResponse && clientResponse.phase ? clientResponse.phase : 1
      });
    });

    // dayStatuses.on('value', snapshot => {
    //   const date = new Date();
    //   const dayStatuses = snapshot.val();
    //   let filteredDayStatuses = [];
    //
    //   Object.keys(dayStatuses).map(key => {
    //     if(dayStatuses[key].timestamp === clientResponse.timestamp) {
    //       filteredDayStatuses.push(dayStatuses[key]);
    //     }
    //   });
    //
    //   let today;
    //   filteredDayStatuses.forEach(day => {
    //     if((day && day.date === moment(date).format('MM-DD-YY')) && (day.phase === this.state.phase)) {
    //       today = day;
    //     }
    //   });
    //
    //   let phase1meal1 = null;
    //   let phase1meal2 = null;
    //   let phase1meal3 = null;
    //   let phase1meal4 = null;
    //   let phase3meal1 = null;
    //   let phase3meal2 = null;
    //   let phase3meal3 = null;
    //   let phase3meal4 = null;
    //   let phase3meal5 = null;
    //   let phase3meal6 = null;
    //
    //   if(today) {
    //     const phase = today.phase;
    //
    //     phase1meal1 = (phase === 1 ? today.meal1 : null);
    //     phase1meal2 = (phase === 1 ? today.meal2 : null);
    //     phase1meal3 = (phase === 1 ? today.meal3 : null);
    //     phase1meal4 = (phase === 1 ? today.meal4 : null);
    //
    //     phase3meal1 = (phase === 3 ? today.meal1 : null);
    //     phase3meal2 = (phase === 3 ? today.meal2 : null);
    //     phase3meal3 = (phase === 3 ? today.meal3 : null);
    //     phase3meal4 = (phase === 3 ? today.meal4 : null);
    //     phase3meal5 = (phase === 3 ? today.meal5 : null);
    //     phase3meal6 = (phase === 3 ? today.meal6 : null);
    //   }
    //
    //   this.setState({
    //     dayStatuses: snapshot.val(),
    //     phase1meal1: phase1meal1,
    //     phase1meal2: phase1meal2,
    //     phase1meal3: phase1meal3,
    //     phase1meal4: phase1meal4,
    //     phase3meal1: phase3meal1,
    //     phase3meal2: phase3meal2,
    //     phase3meal3: phase3meal3,
    //     phase3meal4: phase3meal4,
    //     phase3meal5: phase3meal5,
    //     phase3meal6: phase3meal6
    //   });
    // });
    //
    // phaseTwoDayStatuses.on('value', snapshot => {
    //   const phaseTwoDayStatusesRef = snapshot.val();
    //   const date = new Date;
    //   let today;
    //
    //   if(clientResponse) {
    //     if(clientResponse.timestamp) {
    //       Object.keys(phaseTwoDayStatusesRef).map(key => {
    //         if(phaseTwoDayStatusesRef[key].timestamp === clientResponse.timestamp) {
    //           if(phaseTwoDayStatusesRef[key].date === moment(date).format('MM-DD-YY')) {
    //             today = phaseTwoDayStatusesRef[key];
    //           }
    //         }
    //       });
    //
    //       this.setState({
    //         meal1measurementsCompleted: today ? today.meal1measurementsCompleted : null,
    //         meal2measurementsCompleted: today ? today.meal2measurementsCompleted : null,
    //         meal3measurementsCompleted: today ? today.meal3measurementsCompleted : null,
    //         meal4measurementsCompleted: today ? today.meal4measurementsCompleted : null,
    //
    //         meal1proteinMeasurement: today ? today.meal1proteinMeasurement : null,
    //         meal2proteinMeasurement: today ? today.meal2proteinMeasurement : null,
    //         meal3proteinMeasurement: today ? today.meal3proteinMeasurement : null,
    //         meal4proteinMeasurement: today ? today.meal4proteinMeasurement : null,
    //
    //         meal1carbsMeasurement: today ? today.meal1carbsMeasurement : null,
    //         meal2carbsMeasurement: today ? today.meal2carbsMeasurement : null,
    //         meal3carbsMeasurement: today ? today.meal3carbsMeasurement : null,
    //         meal4carbsMeasurement: today ? today.meal4carbsMeasurement : null,
    //
    //         meal1fatsMeasurement: today ? today.meal1fatsMeasurement : null,
    //         meal2fatsMeasurement: today ? today.meal2fatsMeasurement : null,
    //         meal3fatsMeasurement: today ? today.meal3fatsMeasurement : null,
    //         meal4fatsMeasurement: today ? today.meal4fatsMeasurement : null,
    //
    //         meal1veggiesMeasurement: today ? today.meal1veggiesMeasurement : null,
    //         meal2veggiesMeasurement: today ? today.meal2veggiesMeasurement : null,
    //         meal3veggiesMeasurement: today ? today.meal3veggiesMeasurement : null,
    //         meal4veggiesMeasurement: today ? today.meal4veggiesMeasurement : null,
    //
    //         meal1measurementsCompleted: today ? today.meal1measurementsCompleted : null,
    //         meal2measurementsCompleted: today ? today.meal2measurementsCompleted : null,
    //         meal3measurementsCompleted: today ? today.meal3measurementsCompleted : null,
    //         meal4measurementsCompleted: today ? today.meal4measurementsCompleted : null
    //       });
    //     }
    //   }
    // });
  }

  componentDidMount() {
    this.getClientData();
    this.getTodayStatuses();
  }

  async clickTemplateType(template) {
    // show confirmation or error message
    // if need confirmation first, saveTemplateType() actually saves template type
    // if moving to lose weight step 2 or lock in results 3, moveToLockInResults() saves template type and weight1/weight2

    const currentTemplate = this.state.client.templateType;
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);

    // if click on current template
    console.log('template', template)
    console.log('currentTemplate', currentTemplate)
    if(template === currentTemplate) {
      this.setState({
        showTemplatePicker: false
      });
      return;
    }

    if(currentTemplate === 0) {
      // if currentTemplate is step 1
      // show error if template is step 3, 4, 5
      // else show confirmation modal
      if(template === 3 || template === 4 || template === 5) {
        this.setState({ showTemplateNavError1: true, showModal: true });
        return;
      } else {
        this.setState({
          showTemplatePicker: false,
          showTemplateConfirmation: true,
          potentialTemplate: template
        });
      }
    } else if(currentTemplate === 1 || currentTemplate === 2) {
      // if currentTemplate is step 2
      // show error if template is step 4, 5
      // else update without confirmation
      if(template === 4 || template === 5) {
        alert('showTemplateNavError2') // can't move there yet!
        this.setState({ showTemplateNavError2: true, showModal: true });
        return;
      } else {
        if(template === 3) {
          // if moving to lock in results step 3
          this.moveToLockInResults(template);
        } else {
          clientRef.update({
            templateType: template
          }).then(() => {
            console.log('saved template type', template);

            this.setState({
              showTemplatePicker: false,
              showTemplateConfirmation: false
            });
          });
        }
      }
    } else if(currentTemplate === 3) {
      // if currentTemplate is lock in results step 3
      // show error if template is step 2 or 5
      // else update without confirmation
      if(template === 5) {
        alert('showTemplateNavError3')
        this.setState({ showTemplateNavError3: true, showModal: true });
        return;
      } else {
        clientRef.update({
          templateType: template
        }).then(() => {
          console.log('saved template type', template);

          this.setState({
            showTemplatePicker: false,
            showTemplateConfirmation: false
          });
        });
      }
    } else if(currentTemplate === 4) {
      // if currentTemplate is lock in results step 4
      // confirm if template is going back to step 1, 2, 3
      // else update without confirmation
      clientRef.update({
        templateType: template
      }).then(() => {
        console.log('saved template type', template);

        if(template === 5) {
          this.setState({
            showTemplatePicker: false,
            showStepSuccessMessage: true
          });
        } else {
          this.setState({
            showTemplatePicker: false,
            showTemplateConfirmation: false
          });
        }
      });
    } else if(currentTemplate === 5) {
      if(template === 0 || template === 1 || template === 2) {
        clientRef.update({
          templateType: template
        }).then(() => {
          this.setState({
            showTemplatePicker: false,
            showUpdateBiometricsReminder: true
          });
        });
      } else {
        alert('showTemplateNavError4')
        this.setState({ showTemplateNavError4: true, showModal: true });
        return;
      }
    }
  }

  moveToLockInResults(template) {
    let hasBodyweightEntries = false;
    const bodyweightRecords = firebase.database().ref('bodyweightRecords');
    const client = this.state.client;
    const clientRef = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    bodyweightRecords.once('value', snapshot => {
      const records = snapshot.val();
      let weight, clientBodyweightRecords = [];

      // TO DO: get client's bodyweight records
      // TO DO: do this on server side
      Object.keys(records).map(key => {
        if(records[key].timestamp === client.timestamp) {
          clientBodyweightRecords.push(records[key]);
        }
      });

      // sort records by date
      // TO DO: sorting not working properly
      let sortedBodyweightRecords = clientBodyweightRecords.sort((a,b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      sortedBodyweightRecords = sortedBodyweightRecords.reverse();

      // get date from 1 week ago
      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      oneWeekAgo = moment(oneWeekAgo).format('MM-DD-YY');

      // check that latest three bodyweight entries are within the past week
      // if date < oneWeekAgo, it is too old
      if(sortedBodyweightRecords.length >= 3 &&
        (sortedBodyweightRecords[0].date < oneWeekAgo ||
        sortedBodyweightRecords[1].date < oneWeekAgo ||
        sortedBodyweightRecords[2].date < oneWeekAgo)) {
          hasBodyweightEntries = false;
          this.setState({
            showTemplatePicker: false,
            showNeedBodyweightEntries: true
          });
          return;
      } else if (sortedBodyweightRecords.length < 3) {
        hasBodyweightEntries = false;
        this.setState({
          showTemplatePicker: false,
          showNeedBodyweightEntries: true
        });
        return;
      } else {
        hasBodyweightEntries = true;
      }

      // TT2 = Lose weight (Step 2)
      // TT3 = Lock in results (Step 3)
      if(template === TEMPLATE_TYPES[2] || template ===  TEMPLATE_TYPES[3]) {
        let fiveDayAverage = (sortedBodyweightRecords[0].weight +
          sortedBodyweightRecords[1].weight +
          sortedBodyweightRecords[2].weight +
          (sortedBodyweightRecords[3] ? sortedBodyweightRecords[3].weight : null) +
          (sortedBodyweightRecords[4] ? sortedBodyweightRecords[4].weight : null)) / 5;

        fiveDayAverage = Number(fiveDayAverage.toFixed(1));

        clientRef.update({
          templateType: template,
          weight1: template === TEMPLATE_TYPES[2] ? Math.round(fiveDayAverage) : null,
          weight2: template === TEMPLATE_TYPES[3] ? Math.round(fiveDayAverage) : null
        }).then(resp => {
          alert('saved template type and latest average weight');
          console.log('saved template type and latest average weight');
          // console.log('latest average weight', resp.weight1, resp.weight2);

          // TO DO: add confirmation before saving?
          this.setState({
            showTemplatePicker: false
          });
        });
      }
    });
  }

  async saveTemplateType() {
    const template = this.state.potentialTemplate;
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);

    let t = template;

    if(template === TEMPLATE_TYPES[3]) {
      this.moveToLockInResults(template);
    } else {
      clientRef.update({ templateType: t });
    }

    this.setState({
      showTemplatePicker: false,
      showTemplateConfirmation: false,
      template: template,
      potentialTemplate: null
    });
  }

  async saveWakeTime(time) {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    clientRef.update({ wakeTime: time });
    this.setState({
      showModal: false,
      showWakeTimePicker: false
    });
  }

  async saveTrainingIntensity(intensity) {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    // let val = 'rest';
    //
    // if(intensity === 1) {
    //   val = 'moderate';
    // } else if(intensity === 2) {
    //   val = 'heavy';
    // }

    if(this.state.phase === 3) {
      clientRef.update({ trainingIntensity: intensity });
    } else {
      clientRef.update({ phase1TrainingIntensity: intensity });
    }
  }

  async saveMealsBeforeWorkout(numberOfMeals) {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    clientRef.update({ trainingTime: numberOfMeals });
    this.setState({ mealsBeforeWorkout: numberOfMeals });
  }

  async _saveCurrentMeal(meal) {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    clientRef.update({ selectedMeal: meal });
  }

  async toggleView(viewAllMeals) {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    clientRef.update({ viewAllMeals: !viewAllMeals });
  }

  async toggleUnits(showInGrams) {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    clientRef.update({ showInGrams: !showInGrams });
  }

  completePhaseTwoMeal(currentMeal) {
    // this function simply shows a success/error message
    // saveMeasurement() runs each time portion size is updated and saves measurement

    const phase = this.state.phase;

    if(currentMeal === 0 &&
      this.state.meal1proteinMeasurement &&
      this.state.meal1carbsMeasurement &&
      this.state.meal1fatsMeasurement &&
      this.state.meal1veggiesMeasurement) {
      // show congrats message
    } else if(currentMeal === 1 &&
      this.state.meal2proteinMeasurement &&
      this.state.meal2carbsMeasurement &&
      this.state.meal2fatsMeasurement &&
      this.state.meal2veggiesMeasurement) {
      // show congrats message
    } else if(currentMeal === 2 &&
      this.state.meal3proteinMeasurement &&
      this.state.meal3carbsMeasurement &&
      this.state.meal3fatsMeasurement &&
      this.state.meal3veggiesMeasurement) {
      // show congrats message
    } else if(currentMeal === 3 &&
      this.state.meal4proteinMeasurement &&
      this.state.meal4carbsMeasurement &&
      this.state.meal4fatsMeasurement &&
      this.state.meal4veggiesMeasurement) {
      // show congrats message
    } else {
      alert('make sure to fill out all portions!');
    }
  }

  async _completeMeal(phase, currentMeal, completion) {
    const client = this.state.client;
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + uid);
    // const dayStatusesRef = firebase.database().ref().child('dayStatuses');
    const dayStatusesRef = firebase.database().ref().child('/clients/' + uid + '/day-statuses');
    const mealToSave = 'meal' + (Number(currentMeal) + 1);
    const date = new Date();
    let todayKey, todayRef, today;
    const clientTimestamp = 1539184566736;

    // 1 = completed good
    // 2 = completed bad
    // 3 = blank

    // check if a dayStatus exists with timestamp and today's date
    dayStatusesRef.once('value', snapshot => {
      const ds = snapshot.val();

      Object.keys(ds).map(key => {
        if(ds[key].date === moment(date).format('YYYY-MM-DD')) {
          todayKey = key;
          today = ds[key];
          // todayRef = firebase.database().ref().child('dayStatuses/' + key);
          // todayRef.remove();
        }
      });
    });

    if(today && todayKey && today.phase === this.state.phase) {
      // set meal completed boolean
      if(today[mealToSave] === completion) {
        today[mealToSave] = 3;
        this.setState({ [mealToSave]: 3 });
      } else {
        today[mealToSave] = completion;
        this.setState({ [mealToSave]: completion });
      }

      todayRef = firebase.database().ref().child('/clients/' + uid + '/day-statuses/' + todayKey);

      todayRef.update({ [mealToSave]: today[mealToSave] }).then(resp => {
        // TO DO: congrats message
        const meal1 = today.meal1 < 3 ? true : false;
        const meal2 = today.meal2 < 3 ? true : false;
        const meal3 = today.meal3 < 3 ? true : false;
        const meal4 = today.meal4 < 3 ? true : false;
        const meal5 = today.meal5 < 3 ? true : false;
        let numberOfMealsToComplete = 4;
        let mealsCompleted = false;
        let key = 'phase' + phase + 'meal' + (currentMeal + 1);

        // update state so progress bar updates
        this.setState({ [key]: completion });

        // check number of meals to complete in phase 3
        if(phase === 3) {
          if(client.trainingIntensity === 0) {
            numberOfMealsToComplete = numberOfMealsToComplete + 1;
          } else {
            numberOfMealsToComplete = numberOfMealsToComplete + 2;
          }
        }

        // check that all meals complete
        const fourMealsCompleted = meal1 && meal2 && meal3 && meal4;
        const fiveMealsCompleted = meal1 && meal2 && meal3 && meal4 && meal5;

        if(numberOfMealsToComplete === 4 && fourMealsCompleted) {
          mealsCompleted = true;
        } else if(numberOfMealsToComplete === 5 && fiveMealsCompleted) {
          mealsCompleted = true;
        }

        // if meal changed to incomplete, undo adding points
        const todayMealsCompleted = today.allMealsCompleted;
        if(todayMealsCompleted && today.meal1 === 3 ||
         todayMealsCompleted && today.meal2 === 3 ||
         todayMealsCompleted && today.meal3 === 3 ||
         todayMealsCompleted && today.meal4 === 3 ||
         todayMealsCompleted && today.meal5 === 3 ||
         todayMealsCompleted && today.meal6 === 3) {
          // save points to client
          firebase.database().ref('/clients/' + uid).update({
            mealPoints: Number(client.mealPoints) - 1,
            totalPoints: Number(client.totalPoints) - 1
          }, (error) => {
            if(error) {
              alert('failed');
            } else {
              alert('success!');
            }
          });
        }

        if(mealsCompleted) {
          // save points to client
          firebase.database().ref('/clients/' + uid).update({
            mealPoints: Number(client.mealPoints) + 1,
            totalPoints: Number(client.totalPoints) + 1
          }, (error) => {
            if(error) {
              alert('failed');
            } else {
              alert('success!');
            }
          });

          return;
        }
      }, reason => {
        alert('uh oh...');
      });
    } else {
      // save date and selected meal and whether completed or not
      // const dayStatuses = firebase.database().ref('dayStatuses');
      const newDayStatus = dayStatusesRef.push();
      newDayStatus.set({
        date: moment(new Date).format('YYYY-MM-DD'),
        fullDate: new Date(),
        meal1: 3,
        meal2: 3,
        meal3: 3,
        meal4: 3,
        meal5: 3,
        meal6: 3,
        [mealToSave]: completion,
        phase: client.phase
      }).then(resp => {
        console.log('saved new phase day status')
        // TO DO: congrats message
      }, reason => {
        console.log('Could not save meal completion');
        // TO DO: error message
      });
    }
  }

  async clickNavPhase(phase) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + uid);

    if((phase === 1 && this.state.phase === 2) ||
      (phase === 2 && this.state.phase === 3)) {
        // save phase if going backwards
      clientRef.update({ phase: phase });
      this.setState({ phase: phase });
    } else {
      // show confirmation modal before saving
      this.setState({
        showModal: true,
        showNavPhase: true
      });
    }
  }

  showTemplatePicker() {
    this.setState({
      showTemplatePicker: !this.state.showTemplatePicker
    });
  }

  async movePhase(phase) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + uid);
    const direction = this.state.phase < phase ? 'forward' : 'backward';

    clientRef.update({ phase: direction === 'forward' ? phase : phase - 1 });
    this.setState({
      phase: direction === 'forward' ? phase : phase - 1,
      showModal: false,
      showNavPhase: false
    });
  }

  doNotShowMacroWarning() {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({
      doNotShowMacroWarning: true
    });
    this.setState({ doNotShowMacroWarning: true });
  }

  saveMeasurement(currentMeal, macro, value) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const key = 'meal' + (Number(currentMeal) + 1) + macro + 'Measurement';

    client.on('value', snapshot => {
      clientRef = snapshot.val();

      if(key) {
        const date = new Date();
        const phaseTwoDayStatuses = firebase.database().ref('phaseTwoDays');
        let today, todayKey;

        phaseTwoDayStatuses.once('value', snapshot => {
          const phaseTwoDayStatusesRef = snapshot.val();

          // check whether day recorded yet
          if(clientRef.timestamp) {
            Object.keys(phaseTwoDayStatusesRef).map(phaseTwoDayKey => {
              if(phaseTwoDayKey && (phaseTwoDayStatusesRef[phaseTwoDayKey].timestamp === clientRef.timestamp)) {
                if(phaseTwoDayStatusesRef[phaseTwoDayKey].date === moment(date).format('MM-DD-YY')) {
                  todayKey = phaseTwoDayKey;
                  today = phaseTwoDayStatusesRef[phaseTwoDayKey];
                }
                // todayRef = firebase.database().ref().child('phaseTwoDays/' + phaseTwoDayKey);
                // todayRef.remove();
              } else {
                // alert('day has not yet been recorded')
              }
            });
          }

          // if day already recorded...
          if(todayKey) {
            // set meal completed boolean
            todayRef = firebase.database().ref().child('phaseTwoDays/' + todayKey);
            todayRef.update({ [key]: value });

            todayRef.on('value', snapshot => {
              const today = snapshot.val();
              // update progress bar
              let mealNumber, p, c, f, v;

              if(key.indexOf('1') > -1) {
                mealNumber = 1;
                p = today.meal1proteinMeasurement !== '' ? today.meal1proteinMeasurement : null;
                c = today.meal1carbsMeasurement !== '' ? today.meal1carbsMeasurement : null;
                f = today.meal1fatsMeasurement !== '' ? today.meal1fatsMeasurement : null;
                v = today.meal1veggiesMeasurement !== '' ? today.meal1veggiesMeasurement : null;
              } else if(key.indexOf('2') > -1) {
                mealNumber = 2;
                p = today.meal2proteinMeasurement !== '' ? today.meal2proteinMeasurement : null;
                c = today.meal2carbsMeasurement !== '' ? today.meal2carbsMeasurement : null;
                f = today.meal2fatsMeasurement !== '' ? today.meal2fatsMeasurement : null;
                v = today.meal2veggiesMeasurement !== '' ? today.meal2veggiesMeasurement : null;
              } else if(key.indexOf('3') > -1) {
                mealNumber = 3;
                p = today.meal3proteinMeasurement !== '' ? today.meal3proteinMeasurement : null;
                c = today.meal3carbsMeasurement !== '' ? today.meal3carbsMeasurement : null;
                f = today.meal3fatsMeasurement !== '' ? today.meal3fatsMeasurement : null;
                v = today.meal3veggiesMeasurement !== '' ? today.meal3veggiesMeasurement : null;
              } else if(key.indexOf('4') > -1) {
                mealNumber = 4;
                p = today.meal4proteinMeasurement !== '' ? today.meal4proteinMeasurement : null;
                c = today.meal4carbsMeasurement !== '' ? today.meal4carbsMeasurement : null;
                f = today.meal4fatsMeasurement !== '' ? today.meal4fatsMeasurement : null;
                v = today.meal4veggiesMeasurement !== '' ? today.meal4veggiesMeasurement : null;
              }

              if(p && c && f && v) {
                todayRef.update({ ['meal' + mealNumber + 'measurementsCompleted']: 1 }).then(resp => {
                  console.log('updated meal measurements completed');
                  this.setState({ ['meal' + mealNumber + 'measurementsCompleted'] : 1 });
                  // check if all measurements have been entered for each meal
                  if(today.meal1proteinMeasurement &&
                    today.meal1carbsMeasurement &&
                    today.meal1fatsMeasurement &&
                    today.meal1veggiesMeasurement &&
                    today.meal2proteinMeasurement &&
                    today.meal2carbsMeasurement &&
                    today.meal2fatsMeasurement &&
                    today.meal2veggiesMeasurement &&
                    today.meal3proteinMeasurement &&
                    today.meal3carbsMeasurement &&
                    today.meal3fatsMeasurement &&
                    today.meal3veggiesMeasurement &&
                    today.meal4proteinMeasurement &&
                    today.meal4carbsMeasurement &&
                    today.meal4fatsMeasurement &&
                    today.meal4veggiesMeasurement &&
                    today.allMealsCompleted === false) {

                    todayRef.update({ allMealsCompleted: true });

                    const clientTeam = clientRef.challengeGroupTeam;

                    // update team score
                    if(clientTeam) {
                      const challengeGroupTeams = firebase.database().ref().child('challengeGroupTeams');

                      challengeGroupTeams.once('value', snapshot => {
                        const challengeGroupTeamsRef = snapshot.val();
                        let points;

                        Object.keys(challengeGroupTeamsRef).map(key => {
                          if(challengeGroupTeamsRef[key].name === clientTeam) {
                            teamKey = key;
                            points = challengeGroupTeamsRef[key].points;
                          }
                        });

                        if(teamKey) {
                          const teamRef = firebase.database().ref('challengeGroupTeams/' + teamKey);

                          teamRef.update({ points: Number(points) + 1 });
                          todayRef.update({ allMealsCompleted: true });
                        }
                      });
                    }
                  } else if(today.meal1measurementsCompleted === 1 &&
                    today.meal2measurementsCompleted === 1 &&
                    today.meal3measurementsCompleted === 1 &&
                    today.meal4measurementsCompleted === 1 &&
                    today.allMealsCompleted) {
                      // if all meals already marked as completed and measurement
                      // is simply changing value, don't add points to team score
                      return;
                  }

                  // streaks - WIP
                  // const client = this.get('client');
                  // // add 1 to bestStreak and currentStreak
                  // client.set('phase2bestStreak', this.get('phase2bestStreak') === null ? 1 : Number(this.get('phase2bestStreak')) + 1);
                  // client.set('phase2currentStreak', this.get('phase2currentStreak') === null ? 1 : Number(this.get('phase2currentStreak')) + 1);
                  // this.get('client').save().then(resp => {
                  //   Ember.Logger.info('saved phase 2 streak', resp.get('phase2bestStreak'), resp.get('phase2currentStreak'));
                  // }, reason => {
                  //   Ember.Logger.error('could not save phase 2 streak', reason);
                  // });
                }, reason => {
                  alert('Could not save meal completion')
                });
              } else {
                // mark meal measurements as incomplete
                todayRef.update({
                  ['meal' + mealNumber + 'measurementsCompleted']: 3
                });

                if(today.allMealsCompleted) {
                  const clientTeam = clientRef.challengeGroupTeam;

                  // update team score
                  if(clientTeam) {
                    const challengeGroupTeams = firebase.database().ref().child('challengeGroupTeams');

                    challengeGroupTeams.once('value', snapshot => {
                      const challengeGroupTeamsRef = snapshot.val();
                      let points;

                      Object.keys(challengeGroupTeamsRef).map(key => {
                        if(challengeGroupTeamsRef[key].name === clientTeam) {
                          teamKey = key;
                          points = challengeGroupTeamsRef[key].points;
                        }
                      });

                      if(teamKey) {
                        const teamRef = firebase.database().ref('challengeGroupTeams/' + teamKey);

                        teamRef.update({ points: Number(points) - 1 });
                        todayRef.update({ allMealsCompleted: false });
                      }
                    });
                  }
                }
              }
            });
          } else {
            // save date and selected meal and whether completed or not

            // TO DO: check which meal measurements completed
            console.log('new phase two day');
            if(!today) {
              phaseTwoDayStatuses.push({
                date: moment(new Date).format('MM-DD-YY'),
                fullDate: new Date,
                timestamp: Number(clientRef.timestamp),
                [key]: value,
                meal1measurementsCompleted: 3,
                meal2measurementsCompleted: 3,
                meal3measurementsCompleted: 3,
                meal4measurementsCompleted: 3
              }).then(resp => {}, reason => {
                alert('Could not save measurement');
              });
            }
          }
        });
      } else {
        alert('could not get key')
      }
    });
  }

  async _onChangeGender(g) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientWeightRef = firebase.database().ref('/clients/' + uid);
    clientWeightRef.update({ gender: g });
  }

  async _onChangeBodyweight(text) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientWeightRef = firebase.database().ref('/clients/' + uid);
    clientWeightRef.update({ bodyweight: Number(text) });
  }

  async _onChangeHeight(text) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientWeightRef = firebase.database().ref('/clients/' + uid);
    clientWeightRef.update({ height: Number(text) });
  }

  async _onChangeBodyfat(text) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientWeightRef = firebase.database().ref('/clients/' + uid);
    clientWeightRef.update({ bodyfat: Number(text) });
  }

  async _onChangeBirthdate(text) {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientWeightRef = firebase.database().ref('/clients/' + uid);
    clientWeightRef.update({
      birthdate: format(text, 'YYYY-MM-DD'),
      age: getAge(text)
    });
  }

  async logout() {
    const { navigate } = this.props.navigation;
    await AuthService.logout();
    setTimeout(() => {
      navigate('LoginScreen');
    })

  }

  closeModal() {
    this.setState({
      showModal: false,
      showMealPlanSettings: false,
      showTemplateConfirmation: false,
      showWaketimeTooltip: false,
      showTrainingTooltip: false,
      showMealsBeforeWorkoutTooltip: false,
      showNavPhase: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    let mealTimes = {
      breakfastTime: null,
      earlyLunchTime: null,
      lateLunchTime: null,
      dinnerTime: null
    };

    let bodyweight, bodyfat, age, gender, height, leanMass, proteinDelta, carbDelta,
      template, phase, currentMeal, mealsBeforeWorkout, trainingIntensity,
      showInGrams, viewAllMeals, isPwoMeal, wakeTime,
      complete1, complete2, complete3, complete4, complete5, complete6,
      enablePhase2, enablePhase3, totalPoints, showRestDay, customMacros, customRestDayProtein,
      customRestDayCarbs, customRestDayFat, customModerateDayProtein,
      customModerateDayCarbs, customModerateDayFat, customHeavyDayProtein,
      customHeavyDayCarbs, customHeavyDayFat;

    let labels = [], proteins = [], carbs = [], fats = [], veggies = [];

    if(this.state.client) {
      const client = this.state.client;

      bodyweight = client.weight;
      bodyfat = client.bodyfat;

      const today = new Date();
      const birthDate = new Date(this.state.client.birthdate);
      age = today.getFullYear() - birthDate.getFullYear();

      gender = client.gender;
      height = client.height;
      leanMass = client.leanMass;

      proteinDelta = leanMass > 150 ? 25 :
        (leanMass < 150 && leanMass > 100) ? 20 : 15;
      carbDelta = leanMass > 150 ? 50 :
        (leanMass < 150 && leanMass > 100) ? 35 : 20;

      template = client.templateType;
      phase = client.phase;
      currentMeal = Number(client.selectedMeal) ? Number(client.selectedMeal) : 0;
      trainingIntensity = phase === 3 ? client.trainingIntensity : client.phase1TrainingIntensity;
      enablePhase2 = client.enablePhase2;
      enablePhase3 = client.enablePhase3;

      totalPoints = client.totalPoints ? client.totalPoints: 0;

      if(phase === 3) {
        mealsBeforeWorkout = client.trainingTime;
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

        weight1 = client.weight1;
        weight2 = client.weight2;

        const totals = calculateTotals(age, gender, height, bodyfat, bodyweight, leanMass,
          weight1, weight2, template, trainingIntensity, customMacros,
          customRestDayProtein, customRestDayCarbs, customRestDayFat,
          customModerateDayProtein, customModerateDayCarbs, customModerateDayFat,
          customHeavyDayProtein, customHeavyDayCarbs, customHeavyDayFat, templates, macroRatios);
        const totalProtein = totals['totalProtein'],
          totalCarbs = totals['totalCarbs'],
          totalFat = totals['totalFat'],
          totalCalories = totals['totalCalories'];

        protein = calcProtein(trainingIntensity, mealsBeforeWorkout, totalProtein, proteinDelta);
        carbs = calcCarbs(trainingIntensity, mealsBeforeWorkout, totalCarbs, carbDelta);
        fats = calcFat(trainingIntensity, mealsBeforeWorkout, totalFat);
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

        carbs1Grams = changeUnit(true, 'carbs', carbs[0]);
        carbs2Grams = changeUnit(true, 'carbs', carbs[1]);
        carbs3Grams = changeUnit(true, 'carbs', carbs[2]);
        carbs4Grams = changeUnit(true, 'carbs', carbs[3]);
        carbs5Grams = changeUnit(true, 'carbs', carbs[4]);
        carbs6Grams = changeUnit(true, 'carbs', carbs[5]);

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
          carbs6pwo: carbs6pwo,
          carbs1Grams: carbs1Grams,
          carbs2Grams: carbs2Grams,
          carbs3Grams: carbs3Grams,
          carbs4Grams: carbs4Grams,
          carbs5Grams: carbs5Grams,
          carbs6Grams: carbs6Grams
        };

        fats1 = changeUnit(showInGrams, 'fats', fats[0], 'oil');
        fats2 = changeUnit(showInGrams, 'fats', fats[1], 'oil');
        fats3 = changeUnit(showInGrams, 'fats', fats[2], 'oil');
        fats4 = changeUnit(showInGrams, 'fats', fats[3], 'oil');
        fats5 = changeUnit(showInGrams, 'fats', fats[4], 'oil');
        fats6 = changeUnit(showInGrams, 'fats', fats[5], 'oil');

        fats1butter = changeUnit(showInGrams, 'fats', fats[0], 'butter');
        fats2butter = changeUnit(showInGrams, 'fats', fats[1], 'butter');
        fats3butter = changeUnit(showInGrams, 'fats', fats[2], 'butter');
        fats4butter = changeUnit(showInGrams, 'fats', fats[3], 'butter');
        fats5butter = changeUnit(showInGrams, 'fats', fats[4], 'butter');
        fats6butter = changeUnit(showInGrams, 'fats', fats[5], 'butter');

        fats1nutButter = changeUnit(showInGrams, 'fats', fats[0], 'nutButter');
        fats2nutButter = changeUnit(showInGrams, 'fats', fats[1], 'nutButter');
        fats3nutButter = changeUnit(showInGrams, 'fats', fats[2], 'nutButter');
        fats4nutButter = changeUnit(showInGrams, 'fats', fats[3], 'nutButter');
        fats5nutButter = changeUnit(showInGrams, 'fats', fats[4], 'nutButter');
        fats6nutButter = changeUnit(showInGrams, 'fats', fats[5], 'nutButter');

        fats1avocado = changeUnit(showInGrams, 'fats', fats[0], 'avocado');
        fats2avocado = changeUnit(showInGrams, 'fats', fats[1], 'avocado');
        fats3avocado = changeUnit(showInGrams, 'fats', fats[2], 'avocado');
        fats4avocado = changeUnit(showInGrams, 'fats', fats[3], 'avocado');
        fats5avocado = changeUnit(showInGrams, 'fats', fats[4], 'avocado');
        fats6avocado = changeUnit(showInGrams, 'fats', fats[5], 'avocado');

        fats1Grams = changeUnit(true, 'fats', fats[0]);
        fats2Grams = changeUnit(true, 'fats', fats[1]);
        fats3Grams = changeUnit(true, 'fats', fats[2]);
        fats4Grams = changeUnit(true, 'fats', fats[3]);
        fats5Grams = changeUnit(true, 'fats', fats[4]);
        fats6Grams = changeUnit(true, 'fats', fats[5]);

        fats = {
          fats1: fats1,
          fats2: fats2,
          fats3: fats3,
          fats4: fats4,
          fats5: fats5,
          fats6: fats6,
          fats1butter: fats1butter,
          fats2butter: fats2butter,
          fats3butter: fats3butter,
          fats4butter: fats4butter,
          fats5butter: fats5butter,
          fats6butter: fats6butter,
          fats1nutButter: fats1nutButter,
          fats2nutButter: fats2nutButter,
          fats3nutButter: fats3nutButter,
          fats4nutButter: fats4nutButter,
          fats5nutButter: fats5nutButter,
          fats6nutButter: fats6nutButter,
          fats1avocado: fats1avocado,
          fats2avocado: fats2avocado,
          fats3avocado: fats3avocado,
          fats4avocado: fats4avocado,
          fats5avocado: fats5avocado,
          fats6avocado: fats6avocado,
          fats1Grams: fats1Grams,
          fats2Grams: fats2Grams,
          fats3Grams: fats3Grams,
          fats4Grams: fats4Grams,
          fats5Grams: fats5Grams,
          fats6Grams: fats6Grams
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
        proteins = ['Chicken', 'Turkey', 'Lean beef', 'Fish', 'Shellfish', 'Lean pork', 'Game meat'];
        carbs = ['White rice', 'Brown rice', 'White potatoes', 'Sweet potatoes',
          'Rolled oats', 'Quinoa', 'Acorn squash', 'Butternut squash'];
        fats = ['Avocado', 'Grass-fed butter', 'Olive oil', 'Coconut oil', 'Nuts', 'Nut butter', 'Olives'];
      }
    }

    // style based on state:
    // style={[styles.container, { borderRadius: !value ? Colors.gray : Colors.primaryColor }]}

    // passing new values from component actions:
    // this.props.onCheckboxChecked(newVal) - function passed in from parent, then you pass new value back from component

    const dayStatusesLoaded = this.state.meal1measurementsCompleted < 4 &&
      this.state.meal2measurementsCompleted < 4 &&
      this.state.meal3measurementsCompleted < 4 &&
      this.state.meal4measurementsCompleted < 4;

    return (
      <View style={[Styles.body, this.state.phase === null ? styles.loading : '']}>
        {this.state.phase !== null &&
          <Header
            client={this.state.client}
            points={totalPoints}
            phase={phase}
            trainingIntensity={trainingIntensity}
            phase1meal1={this.state.phase1meal1}
            phase1meal2={this.state.phase1meal2}
            phase1meal3={this.state.phase1meal3}
            phase1meal4={this.state.phase1meal4}
            phase2meal1={this.state.phase2meal1}
            phase2meal2={this.state.phase2meal2}
            phase2meal3={this.state.phase2meal3}
            phase2meal4={this.state.phase2meal4}
            phase3meal1={this.state.phase3meal1}
            phase3meal2={this.state.phase3meal2}
            phase3meal3={this.state.phase3meal3}
            phase3meal4={this.state.phase3meal4}
            phase3meal5={this.state.phase3meal5}
            phase3meal6={this.state.phase3meal6}
            onChangeGender={this._onChangeGender}
            onChangeBodyweight={this._onChangeBodyweight}
            onChangeHeight={this._onChangeHeight}
            onChangeBodyfat={this._onChangeBodyfat}
            onChangeBirthdate={this._onChangeBirthdate}
            logout={() => this.logout()} />}

        <ScrollView
          style={[Styles.content, styles.content]}
          scrollEnabled={this.state.showModal ? false : true}>

            {(this.state.phase === null) &&
              <Text style={styles.loadingText}>adapt & thrive</Text>}

            {this.state.phase !== null && <ScrollView style={Styles.content}>
              <Text style={[Styles.bigTitle, Styles.pageTitle, styles.mealPlanTitle]}>Meal Plan Settings</Text>

              <View style={styles.optionWrapper}>
                <Text style={styles.optionTitle}>WHAT TIME DID YOU WAKE UP?</Text>
                <TouchableHighlight
                  style={styles.optionTooltip}
                  underlayColor={Colors.white}
                  onPress={() => { this.setState({ showModal: true, showWaketimeTooltip: true }) }}>
                  <FontAwesome
                    name='info-circle'
                    size={20}
                  />
                </TouchableHighlight>
              </View>

              <View style={styles.optionSection}>
                <TouchableHighlight
                  style={styles.optionButton}
                  underlayColor={Colors.white}
                  onPress={() => { this.setState({ showModal: true, showWakeTimePicker: true }) }}>
                  <Text style={styles.optionButtonText}>{wakeTime ? wakeTime : '7:00 a.m.'}</Text>
                </TouchableHighlight>
              </View>

              <View style={styles.optionWrapper}>
                <Text style={styles.optionTitle}>ARE YOU WORKING OUT TODAY?</Text>
                <TouchableHighlight
                  style={styles.optionTooltip}
                  underlayColor={Colors.white}
                  onPress={() => { this.setState({ showModal: true, showTrainingTooltip: true }) }}>
                  <FontAwesome
                    name='info-circle'
                    size={20}
                  />
                </TouchableHighlight>
              </View>

              {this.state.phase < 3 && <View style={styles.optionSection}>
                <TouchableHighlight
                  style={[styles.optionButton, trainingIntensity === 1 ? styles.optionButtonActive : null]}
                  underlayColor={Colors.white}
                  onPress={() => { this.saveTrainingIntensity(1) }}>
                  <Text style={[styles.optionButtonText, trainingIntensity === 1 ? styles.optionButtonTextActive : null]}>Yes</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={[styles.optionButton, trainingIntensity === 0 ? styles.optionButtonActive : null]}
                  underlayColor={Colors.white}
                  onPress={() => { this.saveTrainingIntensity(0) }}>
                  <Text style={[styles.optionButtonText, trainingIntensity === 0 ? styles.optionButtonTextActive : null]}>No</Text>
                </TouchableHighlight>
              </View>}

              {this.state.phase === 3 && <View style={styles.optionSection}>
                  <TouchableHighlight
                    style={[styles.optionButton, trainingIntensity === 0 ? styles.optionButtonActive : null]}
                    underlayColor={Colors.white}
                    onPress={() => { this.saveTrainingIntensity(0) }}>
                    <Text style={[styles.optionButtonText, trainingIntensity === 0 ? styles.optionButtonTextActive : null]}>
                      Rest or low-intensity
                    </Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={[styles.optionButton, trainingIntensity === 1 ? styles.optionButtonActive : null]}
                    underlayColor={Colors.white}
                    onPress={() => { this.saveTrainingIntensity(1) }}>
                    <Text style={[styles.optionButtonText, trainingIntensity === 1 ? styles.optionButtonTextActive : null]}>
                      {'< 90 min high-intensity'}
                    </Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={[styles.optionButton, trainingIntensity === 2 ? styles.optionButtonActive : null]}
                    underlayColor={Colors.white}
                    onPress={() => { this.saveTrainingIntensity(2) }}>
                    <Text style={[styles.optionButtonText, trainingIntensity === 2 ? styles.optionButtonTextActive : null]}>
                      {'> 90 min high-intensity'}
                    </Text>
                  </TouchableHighlight>
                </View>}

              <View>
                {(this.state.phase === 3) && <View><View style={styles.optionWrapper}>
                  <Text style={styles.optionTitle}>HOW MANY MEALS BEFORE YOUR WORKOUT?</Text>
                  <TouchableHighlight
                    style={styles.optionTooltip}
                    underlayColor={Colors.white}
                    onPress={() => { this.setState({ showModal: true, showMealsBeforeWorkoutTooltip: true }) }}>
                    <FontAwesome
                      name='info-circle'
                      size={20}
                    />
                  </TouchableHighlight>
                </View>

                  <View style={styles.optionSection}>
                    <TouchableHighlight
                      style={[styles.optionButton, mealsBeforeWorkout === 0 ? styles.optionButtonActive : null]}
                      underlayColor={Colors.white}
                      onPress={() => { this.saveMealsBeforeWorkout(0) }}>
                      <Text style={[styles.optionButtonText, mealsBeforeWorkout === 0 ? styles.optionButtonTextActive : null]}>0</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.optionButton, mealsBeforeWorkout === 1 ? styles.optionButtonActive : null]}
                      underlayColor={Colors.white}
                      onPress={() => { this.saveMealsBeforeWorkout(1) }}>
                      <Text style={[styles.optionButtonText, mealsBeforeWorkout === 1 ? styles.optionButtonTextActive : null]}>1</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.optionButton, mealsBeforeWorkout === 2 ? styles.optionButtonActive : null]}
                      underlayColor={Colors.white}
                      onPress={() => { this.saveMealsBeforeWorkout(2) }}>
                      <Text style={[styles.optionButtonText, mealsBeforeWorkout === 2 ? styles.optionButtonTextActive : null]}>2</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.optionButton, mealsBeforeWorkout === 3 ? styles.optionButtonActive : null]}
                      underlayColor={Colors.white}
                      onPress={() => { this.saveMealsBeforeWorkout(3) }}>
                      <Text style={[styles.optionButtonText, mealsBeforeWorkout === 3 ? styles.optionButtonTextActive : null]}>3</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      style={[styles.optionButton, mealsBeforeWorkout === 4 ? styles.optionButtonActive : null]}
                      underlayColor={Colors.white}
                      onPress={() => { this.saveMealsBeforeWorkout(4) }}>
                      <Text style={[styles.optionButtonText, mealsBeforeWorkout === 4 ? styles.optionButtonTextActive : null]}>4</Text>
                    </TouchableHighlight>
                  </View>
                </View>}

                <Text style={Styles.bigTitle}>{"Today's Meal Plan"}</Text>

                <MealOptions
                  phase={phase}
                  currentMeal={currentMeal}
                  mealsBeforeWorkout={mealsBeforeWorkout}
                  pwo={isPwoMeal}
                  trainingIntensity={trainingIntensity}
                  breakfastTime={mealTimes['breakfastTime']}
                  earlyLunchTime={mealTimes['earlyLunchTime']}
                  lateLunchTime={mealTimes['lateLunchTime']}
                  dinnerTime={mealTimes['dinnerTime']}
                  saveCurrentMeal={this._saveCurrentMeal} />

                <View style={styles.progressSection}>
                  {!viewAllMeals && phase === 1 &&
                    <TouchableHighlight
                      style={[Styles.buttonCircular, styles.progressButtonGood,
                        (currentMeal === 0 && this.state.phase1meal1 === 1) ? styles.completedMealButton :
                        (currentMeal === 1 && this.state.phase1meal2 === 1) ? styles.completedMealButton :
                        (currentMeal === 2 && this.state.phase1meal3 === 1) ? styles.completedMealButton :
                        (currentMeal === 3 && this.state.phase1meal4 === 1) ? styles.completedMealButton : styles.incompleteMealButton]}
                      underlayColor={Colors.darkerPrimaryColor}
                      onPress={() => { this.completeMeal(phase, currentMeal, 1) }}>
                       <Text style={[Styles.buttonCircularIcon, styles.progressButtonText,
                         (currentMeal === 0 && this.state.phase1meal1 === 1) ? styles.completedMealButtonText :
                         (currentMeal === 1 && this.state.phase1meal2 === 1) ? styles.completedMealButtonText :
                         (currentMeal === 2 && this.state.phase1meal3 === 1) ? styles.completedMealButtonText :
                         (currentMeal === 3 && this.state.phase1meal4 === 1) ? styles.completedMealButtonText : styles.incompleteMealButtonText]}>
                         <FontAwesome
                           style={styles.progressButtonGoodIcon}
                           name='check'
                           size={16}
                         />
                       </Text>
                  </TouchableHighlight>}

                  {!viewAllMeals && phase === 1 &&
                    <TouchableHighlight style={[Styles.buttonCircular, styles.progressButtonBad,
                      (currentMeal === 0 && this.state.phase1meal1 === 2) ? styles.completedMealButtonBad :
                      (currentMeal === 1 && this.state.phase1meal2 === 2) ? styles.completedMealButtonBad :
                      (currentMeal === 2 && this.state.phase1meal3 === 2) ? styles.completedMealButtonBad :
                      (currentMeal === 3 && this.state.phase1meal4 === 2) ? styles.completedMealButtonBad : styles.incompleteMealButtonBad]}
                      underlayColor={Colors.darkerRed}
                      onPress={() => { this.completeMeal(phase, currentMeal, 2) }}>
                     <Text style={[Styles.buttonCircularIcon, styles.progressButtonText,
                        (currentMeal === 0 && this.state.phase1meal1 === 2) ? styles.completedMealButtonBad :
                        (currentMeal === 1 && this.state.phase1meal2 === 2) ? styles.completedMealButtonBad :
                        (currentMeal === 2 && this.state.phase1meal3 === 2) ? styles.completedMealButtonBad :
                        (currentMeal === 3 && this.state.phase1meal4 === 2) ? styles.completedMealButtonBad : styles.incompleteMealButtonTextBad]}>
                        <FontAwesome
                          style={styles.progressButtonBadIcon}
                          name='remove'
                          size={16} />
                    </Text>
                  </TouchableHighlight>}

                  {!viewAllMeals && phase === 2 && dayStatusesLoaded &&
                    <TouchableHighlight style={[Styles.buttonCircular, styles.progressButtonGood,
                      (currentMeal === 0 && this.state.meal1measurementsCompleted === 1) ? styles.completedPhaseTwoMeal :
                      (currentMeal === 1 && this.state.meal2measurementsCompleted === 1) ? styles.completedPhaseTwoMeal :
                      (currentMeal === 2 && this.state.meal3measurementsCompleted === 1) ? styles.completedPhaseTwoMeal :
                      (currentMeal === 3 && this.state.meal4measurementsCompleted === 1) ? styles.completedPhaseTwoMeal : styles.incompletePhaseTwoMeal]}
                      underlayColor={Colors.darkerPrimaryColor}
                      onPress={() => { this.completePhaseTwoMeal(currentMeal) }}>
                     <Text style={[Styles.buttonCircularIcon, styles.progressButtonText, this.state.phaseTwoMealComplete ? styles.completedPhaseTwoMealText : styles.incompletePhaseTwoMealText]}>
                       <FontAwesome
                         style={styles.progressButtonGoodIcon}
                         name='check'
                         size={16}
                       />
                     </Text>
                  </TouchableHighlight>}
                </View>

                <View style={styles.mealPlanSection}>
                  {!viewAllMeals && <Meal
                    trainingIntensity={trainingIntensity}
                    mealsBeforeWorkout={mealsBeforeWorkout}
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
                    viewAllMeals={viewAllMeals}
                    showInGrams={showInGrams}
                    updateMeasurement={this.saveMeasurement}
                    phase1meal1={this.state.phase1meal1}
                    phase1meal2={this.state.phase1meal2}
                    phase1meal3={this.state.phase1meal3}
                    phase1meal4={this.state.phase1meal4}
                    phase2meal1={this.state.phase2meal1}
                    phase2meal2={this.state.phase2meal2}
                    phase2meal3={this.state.phase2meal3}
                    phase2meal4={this.state.phase2meal4}
                    phase3meal1={this.state.phase3meal1}
                    phase3meal2={this.state.phase3meal2}
                    phase3meal3={this.state.phase3meal3}
                    phase3meal4={this.state.phase3meal4}
                    phase3meal5={this.state.phase3meal5}
                    completeMeal={this._completeMeal} />}

                  {(this.state.phase === 3 && viewAllMeals) && <View>
                    <View style={styles.viewAllMealsMeal}>
                      <Text style={[Styles.uppercaseText, styles.viewAllMealsMealLabel]}>MEAL 1</Text>
                      <Meal
                        trainingIntensity={trainingIntensity}
                        mealsBeforeWorkout={mealsBeforeWorkout}
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
                        viewAllMeals={viewAllMeals}
                        showInGrams={showInGrams}
                        phase1meal1={this.state.phase1meal1}
                        phase1meal2={this.state.phase1meal2}
                        phase1meal3={this.state.phase1meal3}
                        phase1meal4={this.state.phase1meal4}
                        phase2meal1={this.state.phase2meal1}
                        phase2meal2={this.state.phase2meal2}
                        phase2meal3={this.state.phase2meal3}
                        phase2meal4={this.state.phase2meal4}
                        phase3meal1={this.state.phase3meal1}
                        phase3meal2={this.state.phase3meal2}
                        phase3meal3={this.state.phase3meal3}
                        phase3meal4={this.state.phase3meal4}
                        phase3meal5={this.state.phase3meal5}
                        completeMeal={this._completeMeal} />
                    </View>

                    <View style={styles.viewAllMealsMeal}>
                      <Text style={[Styles.uppercaseText, styles.viewAllMealsMealLabel]}>MEAL 2</Text>
                      <Meal
                        trainingIntensity={trainingIntensity}
                        mealsBeforeWorkout={mealsBeforeWorkout}
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
                        viewAllMeals={viewAllMeals}
                        showInGrams={showInGrams}
                        phase1meal1={this.state.phase1meal1}
                        phase1meal2={this.state.phase1meal2}
                        phase1meal3={this.state.phase1meal3}
                        phase1meal4={this.state.phase1meal4}
                        phase2meal1={this.state.phase2meal1}
                        phase2meal2={this.state.phase2meal2}
                        phase2meal3={this.state.phase2meal3}
                        phase2meal4={this.state.phase2meal4}
                        phase3meal1={this.state.phase3meal1}
                        phase3meal2={this.state.phase3meal2}
                        phase3meal3={this.state.phase3meal3}
                        phase3meal4={this.state.phase3meal4}
                        phase3meal5={this.state.phase3meal5}
                        completeMeal={this._completeMeal} />
                    </View>

                    <View style={styles.viewAllMealsMeal}>
                      <Text style={[Styles.uppercaseText, styles.viewAllMealsMealLabel]}>MEAL 3</Text>
                      <Meal
                        trainingIntensity={trainingIntensity}
                        mealsBeforeWorkout={mealsBeforeWorkout}
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
                        viewAllMeals={viewAllMeals}
                        showInGrams={showInGrams}
                        phase1meal1={this.state.phase1meal1}
                        phase1meal2={this.state.phase1meal2}
                        phase1meal3={this.state.phase1meal3}
                        phase1meal4={this.state.phase1meal4}
                        phase2meal1={this.state.phase2meal1}
                        phase2meal2={this.state.phase2meal2}
                        phase2meal3={this.state.phase2meal3}
                        phase2meal4={this.state.phase2meal4}
                        phase3meal1={this.state.phase3meal1}
                        phase3meal2={this.state.phase3meal2}
                        phase3meal3={this.state.phase3meal3}
                        phase3meal4={this.state.phase3meal4}
                        phase3meal5={this.state.phase3meal5}
                        completeMeal={this._completeMeal} />
                    </View>

                    <View style={styles.viewAllMealsMeal}>
                      <Text style={[Styles.uppercaseText, styles.viewAllMealsMealLabel]}>MEAL 4</Text>
                      <Meal
                        trainingIntensity={trainingIntensity}
                        mealsBeforeWorkout={mealsBeforeWorkout}
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
                        viewAllMeals={viewAllMeals}
                        showInGrams={showInGrams}
                        phase1meal1={this.state.phase1meal1}
                        phase1meal2={this.state.phase1meal2}
                        phase1meal3={this.state.phase1meal3}
                        phase1meal4={this.state.phase1meal4}
                        phase2meal1={this.state.phase2meal1}
                        phase2meal2={this.state.phase2meal2}
                        phase2meal3={this.state.phase2meal3}
                        phase2meal4={this.state.phase2meal4}
                        phase3meal1={this.state.phase3meal1}
                        phase3meal2={this.state.phase3meal2}
                        phase3meal3={this.state.phase3meal3}
                        phase3meal4={this.state.phase3meal4}
                        phase3meal5={this.state.phase3meal5}
                        completeMeal={this._completeMeal} />
                    </View>

                    <View style={[styles.viewAllMealsMeal, Styles.noBorderBottom]}>
                      <Text style={[Styles.uppercaseText, styles.viewAllMealsMealLabel]}>MEAL 5</Text>
                      <Meal
                        trainingIntensity={trainingIntensity}
                        mealsBeforeWorkout={mealsBeforeWorkout}
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
                        viewAllMeals={viewAllMeals}
                        showInGrams={showInGrams}
                        phase1meal1={this.state.phase1meal1}
                        phase1meal2={this.state.phase1meal2}
                        phase1meal3={this.state.phase1meal3}
                        phase1meal4={this.state.phase1meal4}
                        phase2meal1={this.state.phase2meal1}
                        phase2meal2={this.state.phase2meal2}
                        phase2meal3={this.state.phase2meal3}
                        phase2meal4={this.state.phase2meal4}
                        phase3meal1={this.state.phase3meal1}
                        phase3meal2={this.state.phase3meal2}
                        phase3meal3={this.state.phase3meal3}
                        phase3meal4={this.state.phase3meal4}
                        phase3meal5={this.state.phase3meal5}
                        completeMeal={this._completeMeal} />
                      </View>
                    </View>}
                </View>
              </View>

              <View>
                {viewAllMeals &&
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    style={[Styles.center, styles.completionMessage]}
                    onPress={() => this.toggleView(viewAllMeals) }>
                    <Text style={[Styles.textCenter, Styles.emptyMessage]}>View by single meal to see meal completion buttons</Text>
                  </TouchableHighlight>}
              </View>

              <TouchableHighlight
               style={Styles.buttonCircular}
               underlayColor={Colors.darkerPrimaryColor}
               onPress={() => { this.setState({ showMealPlanSettings: true }) }}>
                 <Text style={Styles.buttonCircularIcon}>
                   <FontAwesome
                     name='gear'
                     size={20}
                   /> {this.props.label}
                 </Text>
              </TouchableHighlight>

              {this.state.phase === 3 && this.state.showMealPlanSettings &&
                <ModalWindow
                  currentModal="MEAL_PLAN_SETTINGS"
                  style="button"
                  data={this.state.client}
                  template={template}
                  viewAllMeals={viewAllMeals}
                  showInGrams={showInGrams}
                  doNotShowMacroWarning={this.state.client.doNotShowMacroWarning}
                  toggleView={this.toggleView}
                  toggleUnits={this.toggleUnits}
                  showTemplatePicker={this.showTemplatePicker}
                  clickNavPhase={this.clickNavPhase}
                  closeModal={this.closeModal} />}

              <View style={styles.phaseNavButtons}>
                {(this.state.phase === 2) &&
                  <TouchableHighlight
                    style={[Styles.button, Styles.buttonInverted, styles.phaseNavButton, styles.phaseNavButtonLeft]}
                    underlayColor={Colors.darkerPrimaryColor}
                    onPress={() => { this.clickNavPhase(1) }}>
                    <Text style={[Styles.buttonText, Styles.buttonInvertedText, Styles.buttonWithIconText]}>
                      <FontAwesome
                        style={styles.phaseNavButtonIconLeft}
                        name='arrow-left'
                        size={24}
                      />
                      {'  '}Phase 1
                    </Text>
                  </TouchableHighlight>}

                {(this.state.phase === 2) &&
                  <TouchableHighlight
                    style={[Styles.button, styles.phaseNavButton, styles.phaseNavButtonRight]}
                    underlayColor={Colors.darkerPrimaryColor}
                    onPress={() => { this.clickNavPhase(3) }}>
                    <Text style={[Styles.buttonText, Styles.buttonWithIconText]}>
                    Phase 3{'  '}
                    <FontAwesome
                      style={styles.phaseNavButtonIconRight}
                      name='arrow-right'
                      size={24}
                    />
                    </Text>
                  </TouchableHighlight>}

                {(this.state.phase === 1) &&
                  <TouchableHighlight
                    style={[Styles.button, styles.phaseNavButton, styles.phaseNavButtonRight]}
                    underlayColor={Colors.darkerPrimaryColor}
                    onPress={() => { this.clickNavPhase(2) }}>
                    <Text style={[Styles.buttonText, Styles.buttonWithIconText]}>
                      Phase 2{'  '}
                      <FontAwesome
                        style={styles.phaseNavButtonIconRight}
                        name='arrow-right'
                        size={24}
                      />
                    </Text>
                  </TouchableHighlight>}
              </View>
            </ScrollView>}

            {this.state.showModal &&
              <View style={Styles.showModal}></View>}
        </ScrollView>

        {this.state.showTemplatePicker &&
          <TemplatePicker
            template={template}
            closeTemplatePicker={this.showTemplatePicker} />}

        {this.state.showWakeTimePicker && <View style={styles.wakeTimePicker}>
          <Picker
            selectedValue={wakeTime ? wakeTime : '7:00'}
            onValueChange={(itemValue, itemIndex) => this.saveWakeTime(itemValue)}>
            <Picker.Item label="12:00" value="12:00" />
            <Picker.Item label="12:30" value="12:30" />
            <Picker.Item label="1:00" value="1:00" />
            <Picker.Item label="1:30" value="1:30" />
            <Picker.Item label="2:00" value="2:00" />
            <Picker.Item label="2:30" value="2:30" />
            <Picker.Item label="3:00" value="3:00" />
            <Picker.Item label="3:30" value="3:30" />
            <Picker.Item label="4:00" value="4:00" />
            <Picker.Item label="4:30" value="4:30" />
            <Picker.Item label="5:00" value="5:00" />
            <Picker.Item label="5:30" value="5:30" />
            <Picker.Item label="6:00" value="6:00" />
            <Picker.Item label="6:30" value="6:30" />
            <Picker.Item label="7:00" value="7:00" />
            <Picker.Item label="7:30" value="7:30" />
            <Picker.Item label="8:00" value="8:00" />
            <Picker.Item label="8:30" value="8:30" />
            <Picker.Item label="9:00" value="9:00" />
            <Picker.Item label="9:30" value="9:30" />
            <Picker.Item label="10:00" value="10:00" />
            <Picker.Item label="10:30" value="10:30" />
            <Picker.Item label="11:00" value="11:00" />
            <Picker.Item label="11:30" value="11:30" />

            {/*<Picker.Item label="12:00 pm" value="12:00 pm" />
            <Picker.Item label="12:30 pm" value="12:30 pm" />
            <Picker.Item label="1:00 pm" value="1:00 pm" />
            <Picker.Item label="1:30 pm" value="1:30 pm" />
            <Picker.Item label="2:00 pm" value="2:00 pm" />
            <Picker.Item label="2:30 pm" value="2:30 pm" />
            <Picker.Item label="3:00 pm" value="3:00 pm" />
            <Picker.Item label="3:30 pm" value="3:30 pm" />
            <Picker.Item label="4:00 pm" value="4:00 pm" />
            <Picker.Item label="4:30 pm" value="4:30 pm" />
            <Picker.Item label="5:00 pm" value="5:00 pm" />
            <Picker.Item label="5:30 pm" value="5:30 pm" />
            <Picker.Item label="6:00 pm" value="6:00 pm" />
            <Picker.Item label="6:30 pm" value="6:30 pm" />
            <Picker.Item label="7:00 pm" value="7:00 pm" />
            <Picker.Item label="7:30 pm" value="7:30 pm" />
            <Picker.Item label="8:00 pm" value="8:00 pm" />
            <Picker.Item label="8:30 pm" value="8:30 pm" />
            <Picker.Item label="9:00 pm" value="9:00 pm" />
            <Picker.Item label="9:30 pm" value="9:30 pm" />
            <Picker.Item label="10:00 pm" value="10:00 pm" />
            <Picker.Item label="10:30 pm" value="10:30 pm" />
            <Picker.Item label="11:00 pm" value="11:00 pm" />
            <Picker.Item label="11:30 pm" value="11:30 pm" />*/}
          </Picker>
        </View>}

        {this.state.showWaketimeTooltip &&
          <ModalWindow
            currentModal="WAKETIME_TOOLTIP"
            closeModal={this.closeModal} />}

        {this.state.showTrainingTooltip &&
          <ModalWindow
            currentModal="TRAINING_TOOLTIP"
            phase={this.state.phase}
            closeModal={this.closeModal} />}

        {this.state.showMealsBeforeWorkoutTooltip &&
          <ModalWindow
            currentModal="MEALSBEFOREWORKOUT_TOOLTIP"
            phase={this.state.phase}
            closeModal={this.closeModal} />}

        {this.state.showMealsTooltip && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showMealsTooltip: false, showModal: false }) }}>
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

        {this.state.showNeedBodyweightEntries && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showNeedBodyweightEntries: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>
            <Text style={Styles.tooltipHeader}>
              <FontAwesome
                style={[Styles.textCenter]}
                name='lock'
                size={36}
              />
            </Text>
            <Text style={Styles.tooltipHeader}>
              Uh oh!
            </Text>
            <Text style={Styles.tooltipParagraph}>{"Make sure you've entered at least three bodyweight entries from the past seven days to confirm you are ready to progress to the next step."}</Text>
            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>}

        {this.state.showTemplateConfirmation && <ModalWindow
          currentModal="TEMPLATE_CONFIRMATION"
          currentTemplate={this.state.client.templateType}
          saveTemplateType={this.saveTemplateType}
          closeModal={this.closeModal} />}

        {this.state.showStepSuccessMessage &&
          <ScrollView style={Styles.tooltip}>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({
                showStepSuccessMessage: false,
                showModal: false
               })
            }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>

            <Text style={Styles.tooltipHeader}>Congratulations!</Text>

            <Text style={Styles.tooltipParagraph}>{"You're almost done with the program!"}</Text>
            <Text style={Styles.tooltipParagraph}>What happens next?</Text>
            <Text style={Styles.tooltipParagraph}>After 4 weeks on this step, you may choose to maintain your new weight at Step 1.</Text>
            <Text style={Styles.tooltipParagraph}>{"If you'd like to continue losing weight or building lean muscle, you can skip over Step 1 and go to Step 2 and do the process again from there. Just be sure to update your biometric settings with your new bodyweight and body fat percentage."}</Text>
            <Text style={Styles.tooltipParagraph}>Keep up the great work!</Text>
          </ScrollView>}

          {this.state.showUpdateBiometricsReminder &&
            <ScrollView style={Styles.tooltip}>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={() => { this.setState({
                  showUpdateBiometricsReminder: false,
                  showModal: false
                 })
              }}>
                <FontAwesome
                  style={[Styles.textCenter, Styles.tooltipClose]}
                  name='remove'
                  size={24}
                />
              </TouchableHighlight>

              <Text style={Styles.tooltipHeader}>Congrats!</Text>

              <Text style={Styles.tooltipParagraph}>{"Great work making it all the way through the program!"}</Text>
              <Text style={Styles.tooltipParagraph}>A quick reminder</Text>
              <Text style={Styles.tooltipParagraph}>{"Don't forget to update your biometric settings with your new bodyweight and body fat percentage so your new meal plan is accurate."}</Text>
            </ScrollView>}

        {this.state.showNavPhase &&
          <ModalWindow
            currentModal="PHASE_CONFIRMATION"
            currentPhase={this.state.phase}
            movePhase={this.movePhase}
            closeModal={this.closeModal} />}

        {this.state.showMacrosWarning &&
          <ScrollView style={Styles.tooltip}>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showWaketimeTooltip: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>

            <Text style={Styles.tooltipParagraph}>Viewing your meal plan in macros is not recommended during your initial six weeks on the meal plan. A key component of our program is focusing on not only the amounts of foods, but also the quality. The foods shown in the meal plan are the foods that are most likely to leave you feeling good and help you avoid bloating, mental fogginess, and other health issues.</Text>
            <Text style={Styles.tooltipParagraph}>Viewing your meal plan in macros is useful for when reintroducing foods that have a combination of macronutrients (for instance, Greek yogurt has protein, fat, and carbs). Knowing how mixed-macronutrient foods fit into your meal plan is valuable once you have identified which foods work best with your body.</Text>

            <TouchableHighlight
              style={Styles.modalButton}
              underlayColor={Colors.white}
              onPress={() => { this.toggleUnits(showInGrams); this.setState({ showModal: false, showMacrosWarning: false }) }}>
              <Text style={Styles.modalButtonText}>GOT IT!</Text>
            </TouchableHighlight>

            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.doNotShowMacroWarning ? styles.checked : '']}
                onPress={() => { this.doNotShowMacroWarning() }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ doNotShowMacroWarning: !this.state.doNotShowMacroWarning }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.doNotShowMacroWarning ? styles.checkedText : styles.uncheckedText]}>Do not show this message again</Text>
              </TouchableHighlight>
            </View>

            <Text></Text>
            <Text></Text>
            <Text></Text>
          </ScrollView>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 0
  },
  clientName: {
    fontWeight: 'bold',
    color: Colors.white
  },
  mealPlanTitle: {
    marginBottom: 40
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  optionSection: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    flexDirection: 'row',
    marginBottom: 30
  },
  optionTitle: {
    color: Colors.black,
    letterSpacing: 1,
    fontSize: 14,
    marginRight: 3,
    marginBottom: 20,
    textAlign: 'center'
  },
  optionTooltip: {
    marginLeft: 3,
    marginBottom: 20
  },
  optionButton: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: Colors.paleBlue,
    marginRight: 10
  },
  optionButtonActive: {
    backgroundColor: Colors.secondaryColor
  },
  optionButtonText: {
    color: Colors.black,
    textAlign: 'center'
  },
  optionButtonTextActive: {
    fontWeight: 'bold',
    color: Colors.white
  },
  bigTitle: {
    paddingLeft: 20
  },
  phase: {
    paddingLeft: 20
  },
  mealPlanSection: {
    alignSelf: 'stretch'
  },
  mealsMenu: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  phaseNavButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 40
  },
  phaseNavButton: {
    flex: 1
  },
  phaseNavButtonLeft: {
    marginRight: 10
  },
  picker: {
    zIndex: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  checkbox: {
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGray,
    borderRadius: 2,
    marginRight: 8
  },
  checked: {
    backgroundColor: Colors.primaryColor
  },
  checkedText: {
    color: Colors.black
  },
  uncheckedText: {
    color: Colors.black
  },
  loading: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingImage: {
    flex: 1,
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  loadingText: {
    fontFamily: 'Futura',
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.white
  },
  completionMessage: {
    marginBottom: 30
  },
  viewAllMealsMeal: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 15
  },
  viewAllMealsMealLabel: {
    fontWeight: 'bold',
    color: Colors.primaryColor,
    marginTop: 40,
    marginBottom: 10
  }
});
