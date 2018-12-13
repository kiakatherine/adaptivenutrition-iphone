import React from 'react';
import { AsyncStorage } from 'react-native';
import firebase from '../../services/FirebaseService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import Alert from '../../components/Alert';
import moment from 'moment';

const MessageBarAlert = require('react-native-message-bar').MessageBar;
const MessageBarManager = require('react-native-message-bar').MessageBarManager;

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

export default class ProgressScreen extends React.Component {
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

      showAlertWeightAdded: false,
      showAlertDuplicateWeight: false,
      bodyweightData: null,

      weeklyView: true,
      monthlyView: false,
      yearlyView: false,
      allView: false,
      clientId: null
    }

    this._hideAll = this._hideAll.bind(this);
    this._submitWeight = this._submitWeight.bind(this);
    this._updateWeight = this._updateWeight.bind(this);
    this._setDate = this._setDate.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._closeAlert = this._closeAlert.bind(this);
  }

  async getClientData() {   
    let clientResponse = null;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    // const weightsRef = firebase.database().ref('/clients/' + clientId + '/weights');
    const dayStatuses = firebase.database().ref('/clients/' + clientId + '/day-statuses');

    // weightsRef.on('value', snapshot => {
    //   this.setState({ bodyweightData: snapshot.val() });
    // });

    clientRef.on('value', snapshot => {
      clientResponse = snapshot.val();

      if(clientResponse) {
        this.setState({
          weight: clientResponse.latestBodyweight ? clientResponse.latestBodyweight : clientResponse.weight,
          clientId: clientId
        });
      }
    });

    dayStatuses.on('value', snapshot => {
      const date = new Date();
      const dayStatuses = snapshot.val();
      let today;
      let filteredDayStatusesPhase1 = [];
      let filteredDayStatusesPhase2 = [];
      let filteredDayStatusesPhase3 = [];

      if(dayStatuses) {
        Object.keys(dayStatuses).map(key => {
          if(dayStatuses[key].date === moment(date).format('YYYY-MM-DD')) {
            todayKey = key;
            today = dayStatuses[key];
            // todayRef = firebase.database().ref().child('dayStatuses/' + key);
            // todayRef.remove();

            if(dayStatuses[key].phase === 1) {
              filteredDayStatusesPhase1.push(dayStatuses[key]);
            } else if(dayStatuses[key].phase === 2) {
              filteredDayStatusesPhase2.push(dayStatuses[key]);
            } else if(dayStatuses[key].phase === 3) {
              filteredDayStatusesPhase3.push(dayStatuses[key]);
            }
          }
        });
      }

      this.setState({
        filteredDayStatusesPhase1: filteredDayStatusesPhase1,
        filteredDayStatusesPhase2: filteredDayStatusesPhase2,
        filteredDayStatusesPhase3: filteredDayStatusesPhase3
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

    MessageBarManager.registerMessageBar(this.refs.alert);
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
    MessageBarManager.unregisterMessageBar();
  }

  componentDidMount() {
    this.getClientData()
    this.sortingWeightByDate()
  }

  // sorting by firebase
  async sortingWeightByDate() {   
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const weights = firebase.database().ref('/clients/' + currentUser.uid + '/weights').orderByValue();
    if(weights) {
      weights.once('value', snapshot => {
        const records = snapshot.val();
        let recordsArr = [];
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

        let startDate = new Date()
        let entries = []
        if(this.state.weeklyView){
          startDate.setDate(startDate.getDate() - 7)
          startDate = moment(startDate)
          sortedBodyweightRecords.forEach(rec => {
            if(moment(rec.date) > startDate) {
              entries.push(rec);
            }
          });
          this.setState({
            bodyweightData: entries
          })
        }else if(this.state.monthlyView){
          startDate.setDate(startDate.getDate() - 30)
          startDate = moment(startDate)
          sortedBodyweightRecords.forEach(rec => {
            if(moment(rec.date) > startDate) {
              entries.push(rec);
            }
          });
          this.setState({
            bodyweightData: entries
          })
        }else if(this.state.yearlyView){
          startDate.setDate(startDate.getDate() - 365)
          startDate = moment(startDate)
          sortedBodyweightRecords.forEach(rec => {
            if(moment(rec.date) > startDate) {
              entries.push(rec);
            }
          });
          this.setState({
            bodyweightData: entries
          })
        }else if(this.state.allView){
          this.setState({
            bodyweightData: sortedBodyweightRecords
          })
        }
      });
    }    
  }

  sevenDayAverage() {
    let sevenDayAverage
    let oneWeekAgo = new Date();
    let pastWeekEntries = []
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo = moment(oneWeekAgo).format('YYYY-MM-DD');
    Object.keys(this.state.bodyweightData).map(key => {
      if(this.state.bodyweightData[key].date > oneWeekAgo) {
        pastWeekEntries.push(this.state.bodyweightData[key]);
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
    return sevenDayAverage
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: false });
  }

  async _submitWeight() {
    const date = new Date(this.state.date);
    const weight = this.state.weight;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid;
    const clientRef = firebase.database().ref('/clients/' + clientId);
    const clientWeights = firebase.database().ref('/clients/' + clientId + '/weights');
    let client, duplicateEntry = false, records;

    clientRef.once('value', snapshot => {
      client = snapshot.val();
    });


    if(!clientWeights) {
      clientRef.update({
        clientWeights: []
      });
      console.log('yep')
    }

    // check not already a record for that date
    clientWeights.once('value', snapshot => {
      records = snapshot.val();

      if(records) {
        Object.keys(records).map(key => {
          if(moment(records[key].date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')) {
            duplicateEntry = true;
          }
        });
      }

      if(duplicateEntry) {
        this.setState({ showAlertDuplicateWeight: true });
        return;
      } else {
        const bodyweightRecord = {
          date: date,
          timestamp: Date.parse(date),
          weight: Number(weight),
          clientId: clientId
        };

        // Get a key for a new bodyweightRecord
        const newRecordKey = firebase.database().ref().child('weights').push().key;

        // Write the new record's data simultaneously
        // in the bodyweightRecords list and the user's records list.
        var updates = {};
        updates['/weights/' + newRecordKey] = bodyweightRecord;
        updates['/clients/' + clientId + '/weights/' + newRecordKey] = bodyweightRecord;

        // save
        firebase.database().ref().update(updates, (error) => {
          // TO DO: these aren't firing
          if(error) {
            alert('failed');
          } else {
            this.setState({
              showAddBodyweight: false,
              showAlertWeightAdded: true
            });
          }
        });

        // save points to client
        clientRef.update({
          weightPoints: Number(client.weightPoints ? client.weightPoints : 0) + 1,
          totalPoints: Number(client.totalPoints ? client.totalPoints : 0) + 1,
          latestBodyweight: Number(weight)
        });

        this.setState({
          showAddBodyweight: false,
          date: new Date(),
          weight,
          latestRecordKey: newRecordKey
        }, this._hideAll());
      }
    });
  }

  async undoWeight() {
    // const clientId = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const clientId = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + clientId);
    const weightRef = firebase.database().ref('/weights/' + this.state.latestRecordKey);
    const clientWeightRef = firebase.database().ref('/clients/' + clientId + '/weights/' + this.state.latestRecordKey);

    clientRef.once('value', snapshot => {
      client = snapshot.val();
    });

    weightRef.remove();
    clientWeightRef.remove();

    // subtract point
    clientRef.update({
      weightPoints: Number(client.weightPoints) - 1,
      totalPoints: Number(client.totalPoints) - 1,
      latestBodyweight: null
    });

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

  _updateWeight(weight, direction) {
    if(direction === 'decrease') {
      this.setState({
        weight: (Number(weight) - 0.1).toFixed(1) ? (Number(weight) - 0.1).toFixed(1) : weight
      });
    } else {
      this.setState({
        weight: (Number(weight) + 0.1).toFixed(1) ? (Number(weight) + 0.1).toFixed(1) : weight
      });
    }
  }

  _setDate(date) {
    this.setState({ date });
  }

  _closeModal() {
    this.setState({
      showAddBodyweight: false,
      showAlertDuplicateWeight: false
     });
  }

  _closeAlert() {
    this.setState({ showAlertWeightAdded: false });
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
        dayStatusesPhase1 = <Text style={Styles.emptyMessage}>No progress for this phase yet</Text>;
      }
    }

    if(this.state.showProgressPhase2) {
      if(filteredDayStatusesPhase2 && filteredDayStatusesPhase2.length) {
        Object.keys(filteredDayStatusesPhase2).map((key, index) => {
          dayStatusesPhase2.push(<DayStatus key={index} day={filteredDayStatusesPhase2[key]} phase={2} />);
        });
      } else {
        dayStatusesPhase2 = <Text style={Styles.emptyMessage}>No progress for this phase yet</Text>;
      }
    }

    if(this.state.showProgressPhase3) {
      if(filteredDayStatusesPhase3 && filteredDayStatusesPhase3.length) {
        Object.keys(filteredDayStatusesPhase3).map((key, index) => {
          dayStatusesPhase3.push(<DayStatus key={index} day={filteredDayStatusesPhase3[index]} phase={3} />);
        });
      } else {
        dayStatusesPhase3 = <Text style={Styles.emptyMessage}>No progress for this phase yet</Text>;
      }
    }
    
    return (
      <View style={Styles.body}>
        <ScrollView>
          <View>
            <View style={Styles.flexRow}>
              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.flexRowCol, styles.progressButtonFirst, this.state.showBodyweightLog ? styles.progressButtonActive : styles.progressButton]}
                onPress={() => this.setState({ showBodyweightLog: true, showProgressReports: false })}>
                <Text style={this.state.showBodyweightLog ? styles.progressButtonTextActive : styles.progressButtonText}>WEIGHT</Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.flexRowCol, this.state.showProgressReports ? styles.progressButtonActive : styles.progressButton]}
                onPress={() => this.setState({ showBodyweightLog: false, showProgressReports: true })}>
                <Text style={this.state.showProgressReports ? styles.progressButtonTextActive : styles.progressButtonText}>CONSISTENCY</Text>
              </TouchableHighlight>
            </View>

            {this.state.showBodyweightLog &&
              <View style={[Styles.content, styles.progressSection]}>
                {this.state.bodyweightData && <View style={styles.stats}>
                  <View style={styles.stat}>
                    <Text style={[Styles.bigTitle, Styles.pageTitle, styles.weightDelta, Styles.textCenter]}>{this.sevenDayAverage()}</Text>
                    <Text style={[Styles.menuItemSubText, Styles.textCenter]}>Average weight over past week</Text>
                  </View>
                </View>}

                {!this.state.bodyweightData && <Text style={[Styles.emptyMessage, Styles.textCenter, {marginTop: 30, marginBottom: 20}]}>Add your weight</Text>}

                <View>
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

                  {this.state.latestRecordKey && this.state.bodyweightData &&
                    <TouchableHighlight
                      underlayColor={Colors.white}
                      style={[Styles.linkButton, styles.undoButton]}
                      onPress={() => { this.undoWeight() }}>
                      <Text style={[Styles.textCenter, styles.undoButtonText]}>Undo</Text>
                    </TouchableHighlight>}
                </View>

                {this.state.bodyweightData && <View style={[Styles.flexRow, styles.pillButtons]}>
                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.weeklyView ? Styles.pillButtonSelected : null]}
                    onPress={() => { 
                      this.setState({ 
                        weeklyView: true, 
                        monthlyView: false, 
                        yearlyView: false, 
                        allView: false 
                      }, () =>this.sortingWeightByDate()) 
                    }}>
                    <Text style={[Styles.pillButtonText, this.state.weeklyView ? Styles.pillButtonTextSelected : null]}>WEEK</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.monthlyView ? Styles.pillButtonSelected : null]}
                    onPress={() => { 
                      this.setState({ 
                        weeklyView: false, 
                        monthlyView: true, 
                        yearlyView: false, 
                        allView: false 
                      }, () => this.sortingWeightByDate()) 
                    }}>
                    <Text style={[Styles.pillButtonText, this.state.monthlyView ? Styles.pillButtonTextSelected : null]}>MONTH</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.yearlyView ? Styles.pillButtonSelected : null]}
                    onPress={() => { 
                      this.setState({ 
                        weeklyView: false, 
                        monthlyView: false, 
                        yearlyView: true, 
                        allView: false 
                      }, () => this.sortingWeightByDate()) 
                    }}>
                    <Text style={[Styles.pillButtonText, this.state.yearlyView ? Styles.pillButtonTextSelected : null]}>YEAR</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    underlayColor={Colors.darkerPrimaryColor}
                    style={[Styles.pillButton, this.state.allView ? Styles.pillButtonSelected : null]}
                    onPress={() => { 
                      this.setState({ 
                        weeklyView: false, 
                        monthlyView: false, 
                        yearlyView: false, 
                        allView: true 
                      }, () => this.sortingWeightByDate()) 
                    }}>
                    <Text style={[Styles.pillButtonText, this.state.allView ? Styles.pillButtonTextSelected : null]}>All</Text>
                  </TouchableHighlight>
                </View>}

                <BodyweightGraph
                  data={this.state.bodyweightData}
                  closeModal={this._closeModal} />
              </View>}

            {this.state.showProgressReports &&
              <View style={[Styles.content, styles.progressSection]}>
                <View>
                  <TouchableHighlight
                    underlayColor={Colors.white}
                    onPress={() => { this._clickProgressReportPhase1()}}
                    style={styles.phaseHeader}>
                    <Text style={Styles.uppercaseText}>
                      PHASE 1
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
                    <Text style={Styles.uppercaseText}>
                      PHASE 2
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
                    <Text style={Styles.uppercaseText}>
                      PHASE 3
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
            duplicateError={this.state.showAlertDuplicateWeight}
            updateWeight={this._updateWeight}
            setDate={this._setDate}
            submitWeight={this._submitWeight}
            closeModal={this._closeModal} />}

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  progressButtonActive: {
    borderBottomWidth: 3
  },
  progressButtonText: {
    fontFamily: 'Futura',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 2,
    padding: 20
  },
  progressButtonTextActive: {
    fontFamily: 'Futura',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 2,
    padding: 20
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
  undoButtonText: {
    fontSize: 18,
    letterSpacing: 1,
    marginTop: 10
  }
});
