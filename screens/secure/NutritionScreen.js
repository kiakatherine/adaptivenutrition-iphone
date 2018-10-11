import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import * as labels from '../../constants/MealLabels';
import * as templates from '../../constants/Templates';
import * as macroRatios from '../../constants/MacroRatios';
import moment from 'moment';

import { calcProtein, calcCarbs, calcFat, calcVeggies, calculateTotals } from '../../utils/calculate-macros';
import { changeUnit, convertTrainingIntensity, convertTrainingIntensityToString, convertTrainingTime, convertTrainingTimeToString, setMealTimes } from '../../utils/helpers';

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
      showTimeTooltip: false,
      showTrainingTooltip: false,
      showMealsTooltip: false,
      showWakeTimePicker: false,
      showTrainingIntensityPicker: false,
      showMealsBeforeWorkoutPicker: false,
      showEnergyBalancePicker: false,
      showNeedBodyweightEntries: false,
      showTemplateConfirmation: false,
      showMacrosWarning: false,

      potentialTemplate: null,
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
      phase3meal6: null,

      phaseTwoMealComplete: false,

      checkedTemplate1: false,
      checkedTemplate2: false,
      checkedTemplate3: false,
      checkedTemplate4: false,
      checkedTemplate5: false,
      checkedTemplate6: false
    };

    this.clickNavPhase = this.clickNavPhase.bind(this);
    this.showEnergyBalancePicker = this.showEnergyBalancePicker.bind(this);
    this.saveMeasurement = this.saveMeasurement.bind(this);
  }

  // componentWillMount() {
  //   var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
  //
  //   // client.on('value', snapshot => {
  //   //   this.setState({
  //   //     client: snapshot.val(),
  //   //     phase: snapshot.val().phase
  //   //   });
  //   // });
  //
  //   client.update({ templateType: 'Home (Step 1)'});
  //   console.log('updating')
  // }

  componentDidMount() {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const dayStatuses = firebase.database().ref('dayStatuses');
    const phaseTwoDayStatuses = firebase.database().ref('phaseTwoDays');
    let clientResponse = null;

    client.on('value', snapshot => {
      clientResponse = snapshot.val();

      this.setState({
        client: snapshot.val(),
        phase: snapshot.val().phase
      });
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

    phaseTwoDayStatuses.on('value', snapshot => {
      const phaseTwoDayStatusesRef = snapshot.val();
      const date = new Date;
      let today;

      if(clientResponse) {
        if(clientResponse.timestamp) {
          Object.keys(phaseTwoDayStatusesRef).map(key => {
            if(phaseTwoDayStatusesRef[key].timestamp === clientResponse.timestamp) {
              if(phaseTwoDayStatusesRef[key].date === moment(date).format('MM-DD-YY')) {
                today = phaseTwoDayStatusesRef[key];
              }
            }
          });

          this.setState({
            meal1measurementsCompleted: today ? today.meal1measurementsCompleted : null,
            meal2measurementsCompleted: today ? today.meal2measurementsCompleted : null,
            meal3measurementsCompleted: today ? today.meal3measurementsCompleted : null,
            meal4measurementsCompleted: today ? today.meal4measurementsCompleted : null,

            meal1proteinMeasurement: today ? today.meal1proteinMeasurement : null,
            meal2proteinMeasurement: today ? today.meal2proteinMeasurement : null,
            meal3proteinMeasurement: today ? today.meal3proteinMeasurement : null,
            meal4proteinMeasurement: today ? today.meal4proteinMeasurement : null,

            meal1carbsMeasurement: today ? today.meal1carbsMeasurement : null,
            meal2carbsMeasurement: today ? today.meal2carbsMeasurement : null,
            meal3carbsMeasurement: today ? today.meal3carbsMeasurement : null,
            meal4carbsMeasurement: today ? today.meal4carbsMeasurement : null,

            meal1fatsMeasurement: today ? today.meal1fatsMeasurement : null,
            meal2fatsMeasurement: today ? today.meal2fatsMeasurement : null,
            meal3fatsMeasurement: today ? today.meal3fatsMeasurement : null,
            meal4fatsMeasurement: today ? today.meal4fatsMeasurement : null,

            meal1veggiesMeasurement: today ? today.meal1veggiesMeasurement : null,
            meal2veggiesMeasurement: today ? today.meal2veggiesMeasurement : null,
            meal3veggiesMeasurement: today ? today.meal3veggiesMeasurement : null,
            meal4veggiesMeasurement: today ? today.meal4veggiesMeasurement : null,

            meal1measurementsCompleted: today ? today.meal1measurementsCompleted : null,
            meal2measurementsCompleted: today ? today.meal2measurementsCompleted : null,
            meal3measurementsCompleted: today ? today.meal3measurementsCompleted : null,
            meal4measurementsCompleted: today ? today.meal4measurementsCompleted : null
          });
        }
      }
    });
  }

  clickTemplateType(template) {
    // show confirmation or error message
    // if need confirmation first, saveTemplateType() actually saves template type
    // if moving to lose weight step 2 or lock in results 3, moveToLockInResults() saves template type and weight1/weight2

    const currentTemplate = this.state.client.templateType;
    const clientRef = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    // if click on current template
    if(template === currentTemplate) {
      this.setState({
        showEnergyBalancePicker: false,
        showModal: false
      });
      return;
    }

    if(currentTemplate === TEMPLATE_TYPES[0]) {
      // if currentTemplate is step 1
      // show error if template is step 3, 4, 5
      // else show confirmation modal
      if(template === TEMPLATE_TYPES[3] || template === TEMPLATE_TYPES[4] || template === TEMPLATE_TYPES[5]) {
        alert('showTemplateNavError1')
        this.setState({ showTemplateNavError1: true, showModal: true });
        return;
      } else {
        this.setState({
          showEnergyBalancePicker: false,
          showModal: true,
          showTemplateConfirmation: true,
          potentialTemplate: template
        });
      }
    } else if(currentTemplate === TEMPLATE_TYPES[1] || currentTemplate === TEMPLATE_TYPES[2]) {
      // if currentTemplate is step 2
      // show error if template is step 4, 5
      // else update without confirmation
      if(template === TEMPLATE_TYPES[4] || template === TEMPLATE_TYPES[5]) {
        alert('showTemplateNavError2') // can't move there yet!
        this.setState({ showTemplateNavError2: true, showModal: true });
        return;
      } else {
        if(template === TEMPLATE_TYPES[3]) {
          // if moving to lock in results step 3
          this.moveToLockInResults(template);
        } else {
          clientRef.update({
            templateType: template
          }).then(() => {
            console.log('saved template type', template);

            this.setState({
              showEnergyBalancePicker: false,
              showModal: false,
              showTemplateConfirmation: false
            });
          });
        }
      }
    } else if(currentTemplate === TEMPLATE_TYPES[3]) {
      // if currentTemplate is lock in results step 3
      // show error if template is step 2 or 5
      // else update without confirmation
      if(template === TEMPLATE_TYPES[5]) {
        alert('showTemplateNavError3')
        this.setState({ showTemplateNavError3: true, showModal: true });
        return;
      } else {
        clientRef.update({
          templateType: template
        }).then(() => {
          console.log('saved template type', template);

          this.setState({
            showEnergyBalancePicker: false,
            showModal: false,
            showTemplateConfirmation: false
          });
        });
      }
    } else if(currentTemplate === TEMPLATE_TYPES[4]) {
      // if currentTemplate is lock in results step 4
      // confirm if template is going back to step 1, 2, 3
      // else update without confirmation
      if(template === TEMPLATE_TYPES[0] || template === TEMPLATE_TYPES[1] || template === TEMPLATE_TYPES[2] || template === TEMPLATE_TYPES[3]) {
        alert('showTemplateNavConfirm4')
        this.setState({ showTemplateNavConfirm4: true, showModal: true });
        return;
      } else {
        clientRef.update({
          templateType: template
        }).then(() => {
          console.log('saved template type', template);

          this.setState({
            showEnergyBalancePicker: false,
            showModal: false,
            showTemplateConfirmation: false
          });
        });
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
            showEnergyBalancePicker: false,
            showNeedBodyweightEntries: true
          });
          return;
      } else if (sortedBodyweightRecords.length < 3) {
        hasBodyweightEntries = false;
        this.setState({
          showEnergyBalancePicker: false,
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

          this.setState({
            showEnergyBalancePicker: false,
            showModal: true,
            showTemplateConfirmation: true,
            potentialTemplate: template
          });
        });
      }
    });
  }

  saveTemplateType() {
    const template = this.state.potentialTemplate;
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    let t = template;

    if(template === TEMPLATE_TYPES[3]) {
      this.moveToLockInResults(template);
    } else {
      client.update({ templateType: t });
    }

    this.setState({
      showEnergyBalancePicker: false,
      showTemplateConfirmation: false,
      showModal: false,
      template: template,
      potentialTemplate: null,
      checkedTemplate1: false,
      checkedTemplate2: false,
      checkedTemplate3: false,
      checkedTemplate4: false,
      checkedTemplate5: false,
      checkedTemplate6: false
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
    let val = 'rest';

    if(intensity === 1) {
      val = 'moderate';
    } else if(intensity === 2) {
      val = 'heavy';
    }

    if(this.state.phase === 3) {
      client.update({ trainingIntensity: val });
    } else {
      client.update({ phase1training: intensity });
    }
  }

  saveMealsBeforeWorkout(numberOfMeals) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    client.update({ trainingTime: convertTrainingTimeToString(numberOfMeals) });

    this.setState({
      mealsBeforeWorkout: numberOfMeals
    });
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

  completePhaseTwoMeal(currentMeal) {
    // this function simply shows a success/error message
    // saveMeasurement() runs each time portion size is updated and saves measurement

    const phase = this.state.phase;

    if(currentMeal === 0 &&
      this.state.meal1proteinMeasurement &&
      this.state.meal1carbsMeasurement &&
      this.state.meal1fatsMeasurement &&
      this.state.meal1veggiesMeasurement) {
      this.completeMeal(phase, currentMeal, 1);
    } else if(currentMeal === 1 &&
      this.state.meal2proteinMeasurement &&
      this.state.meal2carbsMeasurement &&
      this.state.meal2fatsMeasurement &&
      this.state.meal2veggiesMeasurement) {
      this.completeMeal(phase, currentMeal, 1);
    } else if(currentMeal === 2 &&
      this.state.meal3proteinMeasurement &&
      this.state.meal3carbsMeasurement &&
      this.state.meal3fatsMeasurement &&
      this.state.meal3veggiesMeasurement) {
      this.completeMeal(phase, currentMeal, 1);
    } else if(currentMeal === 3 &&
      this.state.meal4proteinMeasurement &&
      this.state.meal4carbsMeasurement &&
      this.state.meal4fatsMeasurement &&
      this.state.meal4veggiesMeasurement) {
      this.completeMeal(phase, currentMeal, 1);
    } else {
      alert('make sure to fill out all portions!');
    }
  }

  completeMeal(phase, currentMeal, completion) {
    const client = this.state.client;
    const dayStatusesRef = firebase.database().ref().child('dayStatuses');
    const mealToSave = 'meal' + (Number(currentMeal) + 1);
    const date = new Date();
    let todayKey, todayRef, today;

    // 1 = completed good
    // 2 = completed bad
    // 3 = blank

    // check if a dayStatus exists with timestamp and today's date
    dayStatusesRef.once('value', snapshot => {
      const ds = snapshot.val();

      Object.keys(ds).map(key => {
        if(ds[key].timestamp === client.timestamp) {
          if(ds[key].date === moment(date).format('MM-DD-YY')) {
            todayKey = key;
            today = ds[key];
            // todayRef = firebase.database().ref().child('dayStatuses/' + key);
            // todayRef.remove();
          }
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

      todayRef = firebase.database().ref().child('dayStatuses/' + todayKey);

      todayRef.update({ [mealToSave]: today[mealToSave] }).then(resp => {
        console.log('update phase 2 day status')
        // TO DO: congrats message
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
      // save date and selected meal and whether completed or not
      // if(!today || today.phase !== this.state.phase) {
        const dayStatuses = firebase.database().ref('dayStatuses');
        const newDayStatus = dayStatuses.push();
        newDayStatus.set({
          date: moment(new Date).format('MM-DD-YY'),
          fullDate: new Date,
          timestamp: Number(client.timestamp),
          meal1: 3,
          meal2: 3,
          meal3: 3,
          meal4: 3,
          meal5: 3,
          meal6: 3,
          [mealToSave]: completion,
          phase: client.phase
        }).then(resp => {
          console.log('saved new phase 2 day status')
          // TO DO: congrats message
        }, reason => {
          console.log('Could not save meal completion');
          // TO DO: error message
        });
      // }
    }
  }

  clickNavPhase(phase) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    if((phase === 1 && this.state.phase === 2) ||
      (phase === 2 && this.state.phase === 3)) {
        // save phase if going backwards
      client.update({ phase: phase });
      this.setState({ phase: phase });
    } else {
      // show confirmation modal before saving
      if(phase === 2) {
        this.setState({
          showModal: true,
          showNavToPhase2Modal: true
        });
      } else {
        this.setState({
          showModal: true,
          showNavToPhase3Modal: true
        });
      }
    }
  }

  showEnergyBalancePicker() {
    this.setState({
      showEnergyBalancePicker: true,
      showModal: true
    });
  }

  movePhase(phase) {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const direction = this.state.phase < phase ? 'forward' : 'backward';

    console.log('state phase', this.state.phase)
    console.log('phase', phase)

    client.update({ phase: direction === 'forward' ? phase : phase - 1 });
    this.setState({
      phase: direction === 'forward' ? phase : phase - 1,
      showModal: false,
      showNavToPhase2Modal: false,
      showNavToPhase3Modal: false
    });
  }

  // clickViewMacros(showInGrams) {
  //   if(this.state.client.doNotShowMacroWarning) {
  //     const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
  //     client.update({ showInGrams: !showInGrams });
  //   } else {
  //     this.setState({
  //       showModal: true,
  //       showMacrosWarning: true
  //     });
  //   }
  // }

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

          // if day already recorded
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
                })

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
      enablePhase2, enablePhase3, showRestDay, customMacros, customRestDayProtein,
      customRestDayCarbs, customRestDayFat, customModerateDayProtein,
      customModerateDayCarbs, customModerateDayFat, customHeavyDayProtein,
      customHeavyDayCarbs, customHeavyDayFat;

    let labels = [], proteins = [], carbs = [], fats = [], veggies = [];

    if(this.state.client) {
      const client = this.state.client;

      bodyweight = client.bodyweight;
      bodyfat = client.bodyfat;
      age = client.age;
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
      trainingIntensity = phase === 3 ? convertTrainingIntensity(client.trainingIntensity) : client.phase1training;
      enablePhase2 = client.enablePhase2;
      enablePhase3 = client.enablePhase3;

      if(phase === 3) {
        mealsBeforeWorkout = convertTrainingTime(client.trainingTime);
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
        proteins = ['Chicken', 'Turkey', 'Lean beef', 'Fish', 'Lean pork', 'Game meat'];
        carbs = ['White rice', 'Brown rice', 'White potatoes', 'Sweet potatoes',
          'Rolled oats', 'Quinoa', 'Acorn squash', 'Butternut squash'];
        fats = ['Avocado', 'Grass-fed butter', 'Olive oil', 'Coconut oil', 'Nut butter'];
        veggies = ['Spinach', 'Broccoli', 'Lettuce', 'Onions', 'Asparagus', 'Kale',
          'Bell peppers', 'Cabbage', 'Cauliflower', 'Celery', 'Cucumbers', 'Mushrooms',
          'Yellow squash', 'Zucchini', 'Mixed veggies', 'Brussels sprouts',
          'Swiss chard', 'Carrots'];
      }
    }

    // style based on state:
    // style={[styles.container, { borderRadius: !value ? Colors.gray : Colors.primaryColor }]}

    // passing new values from component actions:
    // this.props.onCheckboxChecked(newVal) - function passed in from parent, then you pass new value back from component

    return (
      <View style={[Styles.body, this.state.phase === null ? styles.loading : '']}>
        {this.state.phase !== null &&
          <Header />}

        {(this.state.phase === null) &&
          <Text style={styles.loadingText}>Adaptive Nutrition</Text>}

        {this.state.phase !== null && <ScrollView style={Styles.content}>
          <Text style={[Styles.bigTitle, Styles.pageTitle, styles.mealPlanTitle]}>{"Today's Meal Plan"}</Text>

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>WHAT TIME DID YOU WAKE UP?</Text>
            <TouchableHighlight
              style={styles.optionTooltip}
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showModal: true, showTimeTooltip: true }) }}>
              <FontAwesome
                style={styles.tooltipIcon}
                name='info-circle'
                size={16}
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
                style={styles.tooltipIcon}
                name='info-circle'
                size={16}
              />
            </TouchableHighlight>
          </View>

          {this.state.phase < 3 && <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton}
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showModal: true, showTrainingIntensityPicker: true }) }}>
              <Text style={styles.optionButtonText}>{trainingIntensity ? 'Yes' : 'No'}</Text>
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
              <Text style={styles.optionTitle}>HOW MANY MEALS BEFORE YOUR WORKOUT?</Text></View>

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

            <View style={styles.progressSection}>
              {!viewAllMeals && phase !== 2 &&
                <TouchableHighlight
                  style={[Styles.buttonCircular, styles.progressButtonGood]}
                  underlayColor={Colors.darkerPrimaryColor}
                  onPress={() => { this.completeMeal(phase, currentMeal, 1) }}>
                   <Text style={[Styles.buttonCircularIcon, styles.progressButtonText]}>
                     <FontAwesome
                       style={styles.progressButtonGoodIcon}
                       name='check'
                       size={16}
                     />
                   </Text>
              </TouchableHighlight>}

              {!viewAllMeals && phase !== 2 &&
                <TouchableHighlight style={[Styles.buttonCircular, styles.progressButtonBad]}
                  underlayColor={Colors.darkerRed}
                  onPress={() => { this.completeMeal(phase, currentMeal, 2) }}>
                 <Text style={[Styles.buttonCircularIcon, styles.progressButtonText]}>
                   <FontAwesome
                     style={styles.progressButtonBadIcon}
                     name='remove'
                     size={16}
                   />
                 </Text>
              </TouchableHighlight>}

              {!viewAllMeals && phase !== 1 && phase !== 3 &&
                <TouchableHighlight style={[Styles.buttonCircular, styles.progressButtonGood,
                  currentMeal === 0 && this.state.meal1measurementsCompleted ? styles.completedPhaseTwoMeal : styles.incompletePhaseTwoMeal,
                  currentMeal === 1 && this.state.meal2measurementsCompleted ? styles.completedPhaseTwoMeal : styles.incompletePhaseTwoMeal,
                  currentMeal === 2 && this.state.meal3measurementsCompleted ? styles.completedPhaseTwoMeal : styles.incompletePhaseTwoMeal,
                  currentMeal === 3 && this.state.meal4measurementsCompleted ? styles.completedPhaseTwoMeal : styles.incompletePhaseTwoMeal]}
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
                meal1proteinMeasurement={this.state.meal1proteinMeasurement}
                meal2proteinMeasurement={this.state.meal2proteinMeasurement}
                meal3proteinMeasurement={this.state.meal3proteinMeasurement}
                meal4proteinMeasurement={this.state.meal4proteinMeasurement}
                meal1carbsMeasurement={this.state.meal1carbsMeasurement}
                meal2carbsMeasurement={this.state.meal2carbsMeasurement}
                meal3carbsMeasurement={this.state.meal3carbsMeasurement}
                meal4carbsMeasurement={this.state.meal4carbsMeasurement}
                meal1fatsMeasurement={this.state.meal1fatsMeasurement}
                meal2fatsMeasurement={this.state.meal2fatsMeasurement}
                meal3fatsMeasurement={this.state.meal3fatsMeasurement}
                meal4fatsMeasurement={this.state.meal4fatsMeasurement}
                meal1veggiesMeasurement={this.state.meal1veggiesMeasurement}
                meal2veggiesMeasurement={this.state.meal2veggiesMeasurement}
                meal3veggiesMeasurement={this.state.meal3veggiesMeasurement}
                meal4veggiesMeasurement={this.state.meal4veggiesMeasurement}
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
                changeMeal={this.saveCurrentMeal} />}

              {(this.state.phase === 3 && viewAllMeals) && <View>
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
                  showInGrams={showInGrams} />
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
                  showInGrams={showInGrams} />
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
                  showInGrams={showInGrams} />
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
                  showInGrams={showInGrams} />
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
                  showInGrams={showInGrams} />
                </View>}
            </View>
          </View>

          <View>
            {viewAllMeals &&
              <TouchableHighlight
                style={[Styles.center, styles.completionMessage]}
                onPress={() => this.toggleView(viewAllMeals) }>
                <Text style={Styles.textCenter}>View by single meal to see meal completion buttons</Text>
              </TouchableHighlight>}
          </View>

          {/*<View>
            {(!viewAllMeals && this.state.phase === 1) &&
              <ProgressBar
                complete1={this.state.phase1meal1}
                complete2={this.state.phase1meal2}
                complete3={this.state.phase1meal3}
                complete4={this.state.phase1meal4}
                phase={1}
                enablePhase2={enablePhase2}
                enablePhase3={enablePhase3}
                trainingIntensity={trainingIntensity} />}
            {(!viewAllMeals && this.state.phase === 2) &&
              <ProgressBar
                complete1={this.state.meal1measurementsCompleted}
                complete2={this.state.meal2measurementsCompleted}
                complete3={this.state.meal3measurementsCompleted}
                complete4={this.state.meal4measurementsCompleted}
                phase={2}
                enablePhase2={enablePhase2}
                enablePhase3={enablePhase3}
                trainingIntensity={trainingIntensity} />}
            {(!viewAllMeals && this.state.phase === 3) &&
              <ProgressBar
                complete1={this.state.phase3meal1}
                complete2={this.state.phase3meal2}
                complete3={this.state.phase3meal3}
                complete4={this.state.phase3meal4}
                complete5={this.state.phase3meal5}
                complete6={this.state.phase3meal6}
                phase={3}
                enablePhase2={enablePhase2}
                enablePhase3={enablePhase3}
                trainingIntensity={trainingIntensity} />}
          </View>*/}

          {this.state.phase === 3 &&
            <ModalWindow
              label=""
              currentModal="MEAL_PLAN_SETTINGS"
              style="button"
              data={this.state.client}
              template={template}
              viewAllMeals={viewAllMeals}
              showInGrams={showInGrams}
              doNotShowMacroWarning={this.state.client.doNotShowMacroWarning}
              toggleView={this.toggleView}
              toggleUnits={this.toggleUnits}
              showEnergyBalancePicker={this.showEnergyBalancePicker}
              clickNavPhase={this.clickNavPhase} />}

          {/*{this.state.phase === 3 && <MealPlanSettings
            template={template}
            viewAllMeals={viewAllMeals}
            showInGrams={showInGrams}
            doNotShowMacroWarning={this.state.client.doNotShowMacroWarning}
            toggleView={this.toggleView}
            toggleUnits={this.toggleUnits}
            clickNavPhase={this.clickNavPhase}
            showEnergyBalancePicker={this.showEnergyBalancePicker} />}*/}

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

        {this.state.showTrainingIntensityPicker && this.state.phase === 3 && <View style={styles.wakeTimePicker}>
          <Picker
            selectedValue={trainingIntensity}
            onValueChange={(itemValue, itemIndex) => this.saveTrainingIntensity(itemValue)}>
            <Picker.Item label="Rest or low-intensity" value={0} />
            <Picker.Item label="< 90 min of high-intensity exercise" value={1} />
            <Picker.Item label="> 90 min of high-intensity exercise" value={2} />
          </Picker>
        </View>}

        {this.state.showTrainingIntensityPicker && this.state.phase < 3 && <View style={styles.wakeTimePicker}>
          <Picker
            selectedValue={trainingIntensity}
            onValueChange={(itemValue, itemIndex) => this.saveTrainingIntensity(itemValue)}>
            <Picker.Item label="Yes" value={true} />
            <Picker.Item label="No" value={false} />
          </Picker>
        </View>}

        {this.state.showMealsBeforeWorkoutPicker && <View style={styles.wakeTimePicker}>
          <Picker
            selectedValue={mealsBeforeWorkout}
            onValueChange={(itemValue, itemIndex) => this.saveMealsBeforeWorkout(itemValue)}>
            <Picker.Item label="0" value={0} />
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
          </Picker>
        </View>}

        {this.state.showTimeTooltip && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showTimeTooltip: false, showModal: false }) }}>
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
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showTrainingTooltip: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>
            <Text style={Styles.tooltipHeader}>Training</Text>

            {this.state.phase < 3 && <View>
              <Text style={Styles.tooltipParagraph}>Here, training is considered intense physical exercise, including weightlifting, HIIT, CrossFit, and endurance training.</Text>

              <Text style={Styles.tooltipParagraph}>On days you are training, you will notice the amount of carbs for each meal increases, since carbs help fuel high-intensity exercise.</Text>

              <Text style={Styles.tooltipParagraph}>Activities such as steady-state cardio, walking, jogging, yoga, barre, etc are considered a rest day, and do not require eating more carbs.</Text>
            </View>}

            {this.state.phase === 3 && <View>
              <Text style={Styles.tooltipParagraph}>Here, training is considered intense physical exercise, including weightlifting, HIIT, CrossFit, and endurance training.</Text>

              <Text style={Styles.tooltipTerm}>Rest/light cardio</Text>
              <Text style={Styles.tooltipParagraph}>Light cardio like walking, jogging, yoga, barre, etc is considered a rest day.</Text>

              <Text style={Styles.tooltipTerm}>Less than 90 minutes</Text>
              <Text style={Styles.tooltipParagraph}>If high-intensity training lasts for less than an hour and a half.</Text>

              <Text style={Styles.tooltipTerm}>More than 90 minutes</Text>
              <Text style={Styles.tooltipParagraph}>If high-intensity training lasts for more than an hour and a half.</Text>
            </View>}
          </View>
        </ScrollView>}

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

        {this.state.showEnergyBalancePicker && <View>
          <Picker
            style={styles.picker}
            selectedValue={template}
            onValueChange={(itemValue, itemIndex) => this.clickTemplateType(itemValue)}>
            <Picker.Item label="Home (Step 1)" value={"Home (Step 1)"} />
            <Picker.Item label="Build muscle (Step 2)" value={"Build muscle (Step 2)"} />
            <Picker.Item label="Lose weight (Step 2)" value={"Lose weight (Step 2)"} />
            <Picker.Item label="Lock in results (Step 3)" value={"Lock in results (Step 3)"} />
            <Picker.Item label="Lock in results (Step 4)" value={"Lock in results (Step 4)"} />
            <Picker.Item label="New home (Step 5)" value={"New home (Step 5)"} />
          </Picker>
        </View>}

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

        {this.state.showTemplateConfirmation && <ScrollView style={Styles.tooltip}>
          <TouchableHighlight
            underlayColor={Colors.white}
            onPress={() => { this.setState({
              showTemplateConfirmation: false,
              showModal: false,
              checkedTemplate1: false,
              checkedTemplate2: false,
              checkedTemplate3: false,
              checkedTemplate4: false,
              checkedTemplate5: false,
              checkedTemplate6: false
             })
          }}>
            <FontAwesome
              style={[Styles.textCenter, Styles.tooltipClose]}
              name='remove'
              size={24}
            />
          </TouchableHighlight>

          <Text style={Styles.tooltipHeader}>Confirm</Text>

          <Text style={Styles.tooltipParagraph}>Before moving to the next step, confirm you have followed the tasks below 90% or more of the time.</Text>
          <Text style={Styles.tooltipParagraph}>Ignoring any one of these variables may prevent you from seeing progress.</Text>

          <View>
            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.checkedTemplate1 ? styles.checked : '']}
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate1: !this.state.checkedTemplate1 }) }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate1: !this.state.checkedTemplate1 }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.checkedTemplate1 ? styles.checkedText : styles.uncheckedText]}>I have stayed on {this.state.client.templateType} for at least 1 week.</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.checkedTemplate2 ? styles.checked : '']}
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate2: !this.state.checkedTemplate2 }) }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate2: !this.state.checkedTemplate2 }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.checkedTemplate2 ? styles.checkedText : styles.uncheckedText]}>I have gotten all my meals in each day.</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.checkedTemplate3 ? styles.checked : '']}
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate3: !this.state.checkedTemplate3 }) }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate3: !this.state.checkedTemplate3 }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.checkedTemplate3 ? styles.checkedText : styles.uncheckedText]}>I have eaten according to the food options in the app.</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.checkedTemplate4 ? styles.checked : '']}
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate4: !this.state.checkedTemplate4 }) }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate4: !this.state.checkedTemplate4 }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.checkedTemplate4 ? styles.checkedText : styles.uncheckedText]}>I have spaced my meals out according to the app.</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.checkedTemplate5 ? styles.checked : '']}
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate5: !this.state.checkedTemplate5 }) }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate5: !this.state.checkedTemplate5 }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.checkedTemplate5 ? styles.checkedText : styles.uncheckedText]}>I have gotten 7+ hours of sleep each night.</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.checkboxRow}>
              <TouchableHighlight
                style={[styles.checkbox, this.state.checkedTemplate6 ? styles.checked : '']}
                underlayColor={Colors.white}
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate6: !this.state.checkedTemplate6 }) }}>
                <Text></Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={ () => { this.setState({ showEnergyBalancePicker: false, checkedTemplate6: !this.state.checkedTemplate6 }) }}>
                <Text style={[Styles.tooltipParagraph, this.state.checkedTemplate6 ? styles.checkedText : styles.uncheckedText]}>My body weight has been relatively consistent for the past 5+ days.</Text>
              </TouchableHighlight>
            </View>

          </View>

          <TouchableHighlight
            style={[Styles.modalButton,
              this.state.checkedTemplate1 && this.state.checkedTemplate2 && this.state.checkedTemplate3
              && this.state.checkedTemplate4 && this.state.checkedTemplate5 && this.state.checkedTemplate6 ? '' : Styles.modalButtonDisabled]}
            underlayColor={Colors.white}
            onPress={ () => {
              this.state.checkedTemplate1 && this.state.checkedTemplate2 && this.state.checkedTemplate3
              && this.state.checkedTemplate4 && this.state.checkedTemplate5 && this.state.checkedTemplate6 ? this.saveTemplateType() : null
            }}>
            <Text style={[Styles.modalButtonText,
              this.state.checkedTemplate1 && this.state.checkedTemplate2 && this.state.checkedTemplate3
              && this.state.checkedTemplate4 && this.state.checkedTemplate5 && this.state.checkedTemplate6 ? '' : Styles.modalButtonDisabledText]}>
              Confirm</Text>
          </TouchableHighlight>

          <Text></Text>
          <Text></Text>
        </ScrollView>}

        {this.state.showNavToPhase2Modal && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showNavToPhase2Modal: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>

            <Text style={Styles.tooltipHeader}>Ready to move to Phase 2?</Text>
            <Text style={Styles.tooltipParagraph}>A minimum of one successful week following Phase 1 before moving to Phase 2 is strongly encouraged.</Text>
            <Text style={Styles.tooltipParagraph}>The goal of Phase 1 is to establish consistent timing of meals (every 4 hours) and high quality of food intake by sticking to only those listed.</Text>
            <Text style={Styles.tooltipParagraph}>Phase 1 is the most important phase of the Adaptive Nutrition program - success with these basic habits means much greater success as you progress with the meal plan.</Text>
            <Text style={Styles.tooltipParagraph}>The goal of Phase 1 is to get comfortable weighing and measuring your food intake. It can be a challenge at first if these habits are new, but it gets easier the more you do it!</Text>

            <View style={Styles.modalButtons}>
              <TouchableHighlight style={Styles.modalButtonCancel}
                underlayColor={Colors.white}
                onPress={() => { this.setState({ showNavToPhase2Modal: false, showModal: false }) }}>
                <Text style={Styles.modalButtonCancelText}>Nevermind</Text>
              </TouchableHighlight>

              <TouchableHighlight style={Styles.modalButton}
                underlayColor={Colors.white}
                onPress={() => { this.movePhase(2) }}>
                <Text style={Styles.modalButtonText}>I am ready!</Text>
              </TouchableHighlight>
            </View>

            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>}

        {this.state.showNavToPhase3Modal && <ScrollView style={Styles.tooltip}>
          <View>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showNavToPhase3Modal: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>

            <Text style={Styles.tooltipHeader}>Ready to move to Phase 3?</Text>
            <Text style={Styles.tooltipParagraph}>We recommend spending a minimum of one week on Phase 1 and one week on Phase 2 before moving to Phase 3. The purpose of Phase 2 is to ingrain the habit of weighing and measuring every meal at current portion sizes before applying specific portion sizes in Phase 3. While this may seem unnecessary, we find that skipping this week of the program lowers client success rates.</Text>

            <View style={Styles.modalButtons}>
              <TouchableHighlight style={Styles.modalButtonCancel}
                underlayColor={Colors.white}
                onPress={() => { this.setState({ showNavToPhase3Modal: false, showModal: false }) }}>
                <Text style={Styles.modalButtonCancelText}>Nevermind</Text>
              </TouchableHighlight>

              <TouchableHighlight style={Styles.modalButton}
                underlayColor={Colors.white}
                onPress={() => { this.movePhase(3) }}>
                <Text style={Styles.modalButtonText}>I am ready!</Text>
              </TouchableHighlight>
            </View>

            <Text></Text>
            <Text></Text>
          </View>
        </ScrollView>}

        {this.state.showMacrosWarning &&
          <ScrollView style={Styles.tooltip}>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showTimeTooltip: false, showModal: false }) }}>
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
              <Text style={Styles.modalButtonText}>Got it!</Text>
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
    marginBottom: 50
  },
  optionTitle: {
    color: Colors.black,
    letterSpacing: 1,
    fontSize: 14,
    marginRight: 3,
    marginBottom: 20,
    textAlign: 'center'
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
    alignSelf: 'stretch',
    // alignItems: 'center',
    // marginTop: 50
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
    flexDirection: 'row',
    marginTop: 40
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
    marginBottom: 20
  },
  incompletePhaseTwoMeal: {
    backgroundColor: Colors.gray
  },
  incompletePhaseTwoMealText: {
    color: Colors.darkGray
  }
});
