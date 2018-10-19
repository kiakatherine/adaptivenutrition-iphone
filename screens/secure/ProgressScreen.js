import React from 'react';

import firebase from '../../services/FirebaseService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import moment from 'moment';

import {
  Button,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';

import BodyweightGraph from '../../components/BodyweightGraph';
import DayStatus from '../../components/DayStatus';
import ModalWindow from '../../components/ModalWindow';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Progress',
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showAddBodyweight: false,
      weight: null,
      showProgressPhase1: true,
      showProgressPhase2: true,
      showProgressPhase3: true,
      showBodyweightLog: true,
      showProgressReports: false,
      weeklyView: true,
      monthlyView: false,
      yearlyView: false
    }

    this._hideAll = this._hideAll.bind(this);
    this._submitWeight = this._submitWeight.bind(this);
    this._updateWeight = this._updateWeight.bind(this);
    this._setDate = this._setDate.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  componentDidMount() {
    // const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const dayStatuses = firebase.database().ref('dayStatuses');
    const phaseTwoDayStatuses = firebase.database().ref('phaseTwoDays');
    let clientResponse = null;

    const clientId = firebase.auth().currentUser.uid;
    const clientRef = firebase.database().ref('/clients/' + clientId);
    const weightsRef = firebase.database().ref('/client/' + clientId + '/weights');

    weightsRef.orderByChild('date').on('value', snapshot => {
      this.setState({ bodyweightData: snapshot.val() });
    });

    clientRef.on('value', snapshot => {
      clientResponse = snapshot.val();

      this.setState({
        weight: clientResponse ? clientResponse.latestBodyweight : null
      });
    });

    // dayStatuses.on('value', snapshot => {
    //   const date = new Date();
    //   const dayStatuses = snapshot.val();
    //   let filteredDayStatusesPhase1 = [];
    //   let filteredDayStatusesPhase3 = [];
    //
    //   Object.keys(dayStatuses).map(key => {
    //     if(dayStatuses[key].timestamp === clientResponse.timestamp) {
    //       if(dayStatuses[key].phase === 1) {
    //         filteredDayStatusesPhase1.push(dayStatuses[key]);
    //       } else if(dayStatuses[key].phase === 3) {
    //         filteredDayStatusesPhase3.push(dayStatuses[key]);
    //       }
    //     }
    //   });
    //
    //   this.setState({
    //     filteredDayStatusesPhase1: filteredDayStatusesPhase1,
    //     filteredDayStatusesPhase3: filteredDayStatusesPhase3
    //   });
    // });

    // phaseTwoDayStatuses.on('value', snapshot => {
    //   const date = new Date();
    //   const phaseTwoDayStatuses = snapshot.val();
    //   let filteredDayStatusesPhase2 = [];
    //
    //   Object.keys(phaseTwoDayStatuses).map(key => {
    //     if(phaseTwoDayStatuses[key].timestamp === clientResponse.timestamp) {
    //       filteredDayStatusesPhase2.push(phaseTwoDayStatuses[key]);
    //     }
    //   });
    //
    //   this.setState({
    //     filteredDayStatusesPhase2: filteredDayStatusesPhase2
    //   });
    // });
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: false });
  }

  _submitWeight() {
    const date = new Date(this.state.date);
    const weight = this.state.weight;
    const uid = firebase.auth().currentUser.uid;

    // TO DO: check not already a record for that date
    // use firebase.database().ref().child('weights').orderByValue() ?

    const bodyweightRecord = {
      date: date,
      weight: weight,
      uid: uid
    };

    // Get a key for a new bodyweightRecord
    const newRecordKey = firebase.database().ref().child('weights').push().key;

    // Write the new record's data simultaneously
    // in the bodyweightRecords list and the user's records list.
    var updates = {};
    updates['/weights/' + newRecordKey] = bodyweightRecord;
    updates['/client/' + uid + '/weights/' + newRecordKey] = bodyweightRecord;

    firebase.database().ref().update(updates, (error) => {
      // TO DO: these aren't firing
      if(error) {
        alert('failed');
      } else {
        alert('success!');
      }
    });

    this.setState({
      showAddBodyweight: false,
      date: new Date(),
      weight,
      latestRecordKey: newRecordKey
    }, this._hideAll());

    // bodyweightRecords.once('value', snapshot => {
    //   const records = snapshot.val();
    //   let duplicateEntry = false;
    //   let filteredBodyweightRecords = [];
    //
    //   // check first that there is not already an entry for today - check timestamp and date
    //   if(clientTimestamp) {
    //     Object.keys(records).map(function(key) {
    //       if(records[key].timestamp === clientTimestamp) {
    //         filteredBodyweightRecords.push(records[key]);
    //         if(records[key].date === moment(date).format('MM-DD-YY')) {
    //           // alert('oh hey')
    //           // const recordRef = firebase.database().ref('bodyweightRecords/' + key);
    //           // recordRef.remove();
    //           duplicateEntry = true;
    //         }
    //       }
    //     });
    //
    //     if(duplicateEntry === false) {
    //       bodyweightRecords.push({
    //         // date: moment(new Date).format('MM-DD-YY'),
    //         date: moment(this.state.date).format('MM-DD-YY'),
    //         timestamp: Number(this.state.clientTimestamp),
    //         weight: Number(this.state.weight)
    //       }).then(resp => {}, reason => {
    //         alert('Could not save bodyweight');
    //       });
    //     } else {
    //       alert('Oops! Looks like there is already an entry for that day.')
    //     }
    //   }
  }

  undoWeight() {
    const clientId = firebase.auth().currentUser.uid;
    const weightRef = firebase.database().ref('/weights/' + this.state.latestRecordKey);
    const clientWeightRef = firebase.database().ref('/client/' + clientId + '/weights/' + this.state.latestRecordKey);

    weightRef.remove();
    clientWeightRef.remove();

    this.setState({ latestRecordKey: null });
  }

  _clickProgressReportPhase1() {
    this.setState({ showProgressPhase1: !this.state.showProgressPhase1 });
  }

  _clickProgressReportPhase2() {
    this.setState({ showProgressPhase2: !this.state.showProgressPhase2 });
  }

  _clickProgressReportPhase3() {
    this.setState({ showProgressPhase3: !this.state.showProgressPhase3 });
  }

  clickWeeklyView(pastWeekEntries) {
    this.setState({ bodyweightData: pastWeekEntries, weeklyView: true, monthlyView: false, yearlyView: false });
  }

  _updateWeight(weight, direction) {
    if(direction === 'decrease') {
      this.setState({ weight: (Number(weight) - 0.1).toFixed(1) ? (Number(weight) - 0.1).toFixed(1) : weight });
    } else {
      this.setState({ weight: (Number(weight) + 0.1).toFixed(1) ? (Number(weight) + 0.1).toFixed(1) : weight });
    }
  }

  _setDate(date) {
    this.setState({ date });
  }

  _closeModal() {
    this.setState({ showAddBodyweight: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    const filteredDayStatusesPhase1 = this.state.filteredDayStatusesPhase1;
    const filteredDayStatusesPhase2 = this.state.filteredDayStatusesPhase2;
    const filteredDayStatusesPhase3 = this.state.filteredDayStatusesPhase3;
    let dayStatusesPhase1 = [];
    let dayStatusesPhase2 = [];
    let dayStatusesPhase3 = [];
    let weight = this.state.weight;

    if(this.state.showProgressPhase1) {
      if(filteredDayStatusesPhase1 && filteredDayStatusesPhase1.length) {
        Object.keys(filteredDayStatusesPhase1).map((key, index) => {
          dayStatusesPhase1.push(<DayStatus key={index} day={filteredDayStatusesPhase1[key]} phase={1} />);
        });
      } else {
        dayStatusesPhase1 = <Text style={Styles.loadingMessage}>No progress for this phase yet</Text>;
      }
    }

    if(this.state.showProgressPhase2) {
      if(filteredDayStatusesPhase2 && filteredDayStatusesPhase2.length) {
        Object.keys(filteredDayStatusesPhase2).map((key, index) => {
          dayStatusesPhase2.push(<DayStatus key={index} day={filteredDayStatusesPhase2[key]} phase={2} />);
        });
      } else {
        dayStatusesPhase2 = <Text style={Styles.loadingMessage}>No progress for this phase yet</Text>;
      }
    }

    if(this.state.showProgressPhase3) {
      if(filteredDayStatusesPhase3 && filteredDayStatusesPhase3.length) {
        Object.keys(filteredDayStatusesPhase3).map((key, index) => {
          dayStatusesPhase3.push(<DayStatus key={index} day={filteredDayStatusesPhase3[index]} phase={3} />);
        });
      } else {
        dayStatusesPhase3 = <Text style={Styles.loadingMessage}>No progress for this phase yet</Text>;
      }
    }

    // seven day bodyweight average, initial weight
    let sevenDayAverage, initialWeight, pastWeekEntries = [];
    // const bodyweightRecords = firebase.database().ref('bodyweightRecords');
    const clientId = firebase.auth().currentUser.uid;
    const weights = firebase.database().ref('/client/' + clientId + '/weights');

    if(weights) {
    weights.once('value', snapshot => {
      const records = snapshot.val();
      let weight, recordsArr = [];

      // get client's bodyweight records
      // do this on server side
      if(records) {
        Object.keys(records).map(key => {
          recordsArr.push(records[key]);
        });
      }

      // sort records by date
      // TO DO: fix sorting
      let sortedBodyweightRecords = recordsArr.sort((a,b) => {
        return new Date(a.date) - new Date(b.date);
      });
      sortedBodyweightRecords = sortedBodyweightRecords.reverse();

      // console.log('records', recordsArr);

      // set initial weight
      initialWeight = sortedBodyweightRecords.length ? sortedBodyweightRecords[0].weight : null;

      // get date from 1 week ago
      let oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      oneWeekAgo = moment(oneWeekAgo).format('MM-DD-YY');

      // find entries within past week
      // let pastWeekEntries = [];
      sortedBodyweightRecords.forEach(rec => {
        if(rec.date > oneWeekAgo) {
          pastWeekEntries.push(rec);
        }
      });

      if(pastWeekEntries.length) {
        sevenDayAverage = (
          (pastWeekEntries[0] ? pastWeekEntries[0].weight : null) +
          (pastWeekEntries[1] ? pastWeekEntries[1].weight : null) +
          (pastWeekEntries[2] ? pastWeekEntries[2].weight : null) +
          (pastWeekEntries[3] ? pastWeekEntries[3].weight : null) +
          (pastWeekEntries[4] ? pastWeekEntries[4].weight : null) +
          (pastWeekEntries[5] ? pastWeekEntries[5].weight : null) +
          (pastWeekEntries[6] ? pastWeekEntries[6].weight : null)) / pastWeekEntries.length;
        sevenDayAverage = sevenDayAverage.toFixed(1);
      } else {
        sevenDayAverage = '---';
      }
    });
  }

    return (
      <View style={Styles.body}>
        <ScrollView style={Styles.content}>
          <View>
            <View style={Styles.flexRow}>
              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.flexRowCol, styles.progressButtonFirst, this.state.showBodyweightLog ? styles.progressButtonActive : styles.progressButton]}
                onPress={() => this.setState({ showBodyweightLog: true, showProgressReports: false })}>
                <Text style={this.state.showBodyweightLog ? styles.progressButtonTextActive : styles.progressButtonText}>Weight</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.flexRowCol, this.state.showProgressReports ? styles.progressButtonActive : styles.progressButton]}
                onPress={() => this.setState({ showBodyweightLog: false, showProgressReports: true })}>
                <Text style={this.state.showProgressReports ? styles.progressButtonTextActive : styles.progressButtonText}>Consistency</Text>
              </TouchableHighlight>
            </View>

            {this.state.showBodyweightLog &&
              <View style={styles.progressSection}>
                <View style={styles.stats}>
                  <View style={styles.stat}>
                    <Text style={[Styles.bigTitle, Styles.pageTitle, styles.weightDelta, Styles.textCenter]}>{sevenDayAverage}</Text>
                    <Text style={[Styles.menuItemSubText, Styles.textCenter]}>Average weight over past week</Text>
                  </View>
                </View>

                <TouchableHighlight
                  underlayColor={Colors.darkerPrimaryColor}
                  style={Styles.buttonCircular}
                  onPress={() => { this.setState({ showAddBodyweight: true }) }}>
                  <Text style={Styles.buttonCircularIcon}>
                    <FontAwesome
                      name='plus'
                      size={16}
                    />
                  </Text>
                </TouchableHighlight>

                {this.state.latestRecordKey &&
                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.buttonCircular, styles.undoButton]}
                    onPress={() => { this.undoWeight() }}>
                    <Text style={Styles.buttonCircularIcon}>
                      <FontAwesome
                        name='undo'
                        size={16}
                      />
                    </Text>
                  </TouchableHighlight>}

                <View style={[Styles.flexRow, styles.pillButtons]}>
                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.weeklyView ? Styles.pillButtonSelected : null]}
                    onPress={() => { this.clickWeeklyView(pastWeekEntries) }}>
                    <Text style={[Styles.pillButtonText, this.state.weeklyView ? Styles.pillButtonTextSelected : null]}>WEEK</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.monthlyView ? Styles.pillButtonSelected : null]}
                    onPress={() => { this.setState({ weeklyView: false, monthlyView: true, yearlyView: false }) }}>
                    <Text style={[Styles.pillButtonText, this.state.monthlyView ? Styles.pillButtonTextSelected : null]}>MONTH</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.yearlyView ? Styles.pillButtonSelected : null]}
                    onPress={() => { this.setState({ weeklyView: false, monthlyView: false, yearlyView: true }) }}>
                    <Text style={[Styles.pillButtonText, this.state.yearlyView ? Styles.pillButtonTextSelected : null]}>YEAR</Text>
                  </TouchableHighlight>
                </View>

                <BodyweightGraph
                  data={this.state.bodyweightData} />
              </View>}

            {this.state.showProgressReports &&
              <View style={styles.progressSection}>
                <View>
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    onPress={() => { this._clickProgressReportPhase1()}}
                    style={styles.phaseHeader}>
                    <Text style={styles.phaseHeaderText}>
                      Phase 1
                    </Text>
                  </TouchableHighlight>

                  {this.state.showProgressPhase1 &&
                    <View style={styles.phaseProgressWrapper}>{dayStatusesPhase1}</View>}
                </View>

                <View>
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    onPress={() => { this._clickProgressReportPhase2()}}
                    style={styles.phaseHeader}>
                    <Text style={styles.phaseHeaderText}>
                      Phase 2
                    </Text>
                  </TouchableHighlight>

                  {this.state.showProgressPhase2 &&
                    <View style={styles.phaseProgressWrapper}>{dayStatusesPhase2}</View>}
                </View>

                <View>
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    onPress={() => { this._clickProgressReportPhase3()}}
                    style={styles.phaseHeader}>
                    <Text style={styles.phaseHeaderText}>
                      Phase 3
                    </Text>
                  </TouchableHighlight>

                  {this.state.showProgressPhase3 &&
                    <View style={styles.phaseProgressWrapper}>{dayStatusesPhase3}</View>}
                </View>
              </View>}
          </View>
        </ScrollView>

        {this.state.showAddBodyweight &&
          <ModalWindow
            currentModal="ADD_BODYWEIGHT"
            weight={this.state.weight}
            date={this.state.date}
            updateWeight={this._updateWeight}
            setDate={this._setDate}
            submitWeight={this._submitWeight}
            closeModal={this._closeModal} />}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  progressButton: {
    marginRight: 20
  },
  progressButtonActive: {
    borderBottomWidth: 3,
    borderColor: Colors.black
  },
  progressButtonText: {
    fontFamily: 'Futura',
    textAlign: 'center',
    color: Colors.black,
    fontSize: 20,
    paddingBottom: 10
  },
  progressButtonTextActive: {
    fontFamily: 'Futura',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10
  },
  weightDelta: {
    textAlign: 'left',
    marginBottom: 0
  },
  phaseHeader: {
    paddingTop: 15,
    marginBottom: 5,
    backgroundColor: Colors.white
  },
  phaseHeaderText: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold'
  },
  progressSection: {
    marginTop: 20,
    marginBottom: 50
  },
  phaseProgressWrapper: {
    marginTop: 10,
    marginBottom: 15
  },
  stats: {
    marginTop: 20,
    marginBottom: 20
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  pillButtons: {
    marginTop: 50,
    alignItems: 'center'
  },
  undoButton: {
    marginTop: 10
  }
});
