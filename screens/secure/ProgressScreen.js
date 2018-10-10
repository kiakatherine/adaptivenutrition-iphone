import React from 'react';

import firebase from '../../services/FirebaseService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import moment from 'moment';

import {
  Button,
  DatePickerIOS,
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

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Progress',
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showModal: false,
      showDatepicker: false,
      showAddBodyweightModal: false,
      weight: null,
      clientTimestamp: null,
      showProgressPhase1: true,
      showProgressPhase2: true,
      showProgressPhase3: true,
      showBodyweightLog: true,
      showProgressReports: false
    }

    this._showDatepicker = this._showDatepicker.bind(this);
    this._hideAll = this._hideAll.bind(this);
    this._submitWeight = this._submitWeight.bind(this);
  }

  componentDidMount() {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const dayStatuses = firebase.database().ref('dayStatuses');
    const phaseTwoDayStatuses = firebase.database().ref('phaseTwoDays');
    let clientResponse = null;

    client.on('value', snapshot => {
      clientResponse = snapshot.val();

      this.setState({
        weight: clientResponse.latestBodyweight
        // clientTimestamp: clientResponse.timestamp,
        // clientPhase: clientResponse.phase
      });
    });

    dayStatuses.on('value', snapshot => {
      const date = new Date();
      const dayStatuses = snapshot.val();
      let filteredDayStatusesPhase1 = [];
      let filteredDayStatusesPhase3 = [];

      Object.keys(dayStatuses).map(key => {
        if(dayStatuses[key].timestamp === clientResponse.timestamp) {
          if(dayStatuses[key].phase === 1) {
            filteredDayStatusesPhase1.push(dayStatuses[key]);
          } else if(dayStatuses[key].phase === 3) {
            filteredDayStatusesPhase3.push(dayStatuses[key]);
          }
        }
      });

      this.setState({
        filteredDayStatusesPhase1: filteredDayStatusesPhase1,
        filteredDayStatusesPhase3: filteredDayStatusesPhase3
      });
    });

    phaseTwoDayStatuses.on('value', snapshot => {
      const date = new Date();
      const phaseTwoDayStatuses = snapshot.val();
      let filteredDayStatusesPhase2 = [];

      Object.keys(phaseTwoDayStatuses).map(key => {
        if(phaseTwoDayStatuses[key].timestamp === clientResponse.timestamp) {
          filteredDayStatusesPhase2.push(phaseTwoDayStatuses[key]);
        }
      });

      this.setState({
        filteredDayStatusesPhase2: filteredDayStatusesPhase2
      });
    });
  }

  _showDatepicker () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: !this.state.showDatepicker });
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: false });
  }

  componentWillMount() {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const bodyweightRecords = firebase.database().ref().child('bodyweightRecords');

    client.on('value', snapshot => {
      this.setState({
        client: snapshot.val(),
        clientTimestamp: snapshot.val().timestamp,
        clientPhase: snapshot.val().phase
      });
    });

    bodyweightRecords.on('value', snapshot => {
      this.setState({ bodyweightData: snapshot.val() });
    });
  }

  _submitWeight(w) {
    const bodyweightRecords = firebase.database().ref('bodyweightRecords');
    const date = this.state.date;
    const clientTimestamp = this.state.clientTimestamp;

    this.setState({
      weight: w
    });

    bodyweightRecords.once('value', snapshot => {
      const records = snapshot.val();
      let duplicateEntry = false;
      let filteredBodyweightRecords = [];

      // check first that there is not already an entry for today - check timestamp and date
      if(clientTimestamp) {
        Object.keys(records).map(function(key) {
          if(records[key].timestamp === clientTimestamp) {
            filteredBodyweightRecords.push(records[key]);
            if(records[key].date === moment(date).format('MM-DD-YY')) {
              // alert('oh hey')
              // const recordRef = firebase.database().ref('bodyweightRecords/' + key);
              // recordRef.remove();
              duplicateEntry = true;
            }
          }
        });

        if(duplicateEntry === false) {
          bodyweightRecords.push({
            // date: moment(new Date).format('MM-DD-YY'),
            date: moment(this.state.date).format('MM-DD-YY'),
            timestamp: Number(this.state.clientTimestamp),
            weight: Number(this.state.weight)
          }).then(resp => {}, reason => {
            alert('Could not save bodyweight');
          });
        } else {
          alert('Oops! Looks like there is already an entry for that day.')
        }
      }

      this.setState({
        showAddBodyweightModal: false,
        showDatepicker: false,
        showModal: false,
        date: new Date(),
        weight: ''
      }, this._hideAll());
    });
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

            {this.state.showBodyweightLog && <View style={styles.progressSection}>
              <Text style={[Styles.bigTitle, Styles.pageTitle, styles.weightDelta]}>
                {this.state.client ? '-' + this.state.client.bodyweightDelta : '-7'}
              </Text>
              <Text style={Styles.menuItemSubText}>Change since {this.state.client ? this.state.client.firstWeightDate : ' starting'}</Text>

              <BodyweightGraph
                data={this.state.bodyweightData}
                clientTimestamp={this.state.clientTimestamp} />

              <TouchableHighlight
                underlayColor={Colors.darkerPrimaryColor}
                style={Styles.buttonCircular}
                onPress={() => { this.setState({ showAddBodyweightModal: true, showModal: true }) }}>
                <Text style={Styles.buttonCircularIcon}>
                  <FontAwesome
                    name='plus'
                    size={16}
                  />
                </Text>
              </TouchableHighlight>
            </View>}

            {this.state.showProgressReports && <View style={styles.progressSection}>
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

        {this.state.showModal &&
          <View style={Styles.showModal}></View>}

        {this.state.showAddBodyweightModal &&
          <ScrollView style={[Styles.tooltip, styles.addBodyweightModal]}>
            <TouchableHighlight
              underlayColor={Colors.white}
              onPress={() => { this.setState({ showAddBodyweightModal: false, showModal: false }) }}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={36}
              />
            </TouchableHighlight>

            <View style={[styles.bodyweightInput, styles.bodyweightDateInput]}>
              <TouchableHighlight
                underlayColor={Colors.lightGray}
                onPress={this._showDatepicker}>
                <Text style={styles.bodyweightDate}>
                  {moment(this.state.date).format('MMMM D')} <FontAwesome
                    name='pencil'
                    size={24}
                  />
                </Text>
              </TouchableHighlight>
            </View>

            {this.state.showDatepicker &&
              <DatePickerIOS
                style={styles.datePicker}
                mode={'date'}
                date={this.state.date}
                maximumDate={new Date()}
                onDateChange={date => this.setState({ date, showDatepicker: false })}
              />}

            <View style={[styles.progressSection]}>
              <View style={[styles.bodyweightInputWrapper]}>
                <TouchableHighlight
                  underlayColor={Colors.darkerPrimaryColor}
                  style={[Styles.buttonCircular, Styles.buttonInverted, styles.weightButton]}
                  onPress={() => { this.setState({ weight: (Number(weight) - 0.1).toFixed(1) ? (Number(weight) - 0.1).toFixed(1) : weight }) }}
                  disabled={weight < 0}>
                  <Text style={[Styles.buttonCircularIcon, Styles.buttonInvertedText]}>
                    <FontAwesome
                      name='minus'
                      size={16}
                    />
                  </Text>
                </TouchableHighlight>

                <Text style={styles.weight}>{weight}</Text>

                <TouchableHighlight
                  underlayColor={Colors.darkerPrimaryColor}
                  style={[Styles.buttonCircular, Styles.buttonInverted, styles.weightButton]}
                  onPress={() => { this.setState({ weight: (Number(weight) + 0.1).toFixed(1) ? (Number(weight) + 0.1).toFixed(1) : weight }) }}
                  disabled={weight < 0}>
                  <Text style={[Styles.buttonCircularIcon, Styles.buttonInvertedText]}>
                    <FontAwesome
                      name='plus'
                      size={16}
                    />
                  </Text>
                </TouchableHighlight>
              </View>

              <TouchableHighlight
                underlayColor={Colors.darkerPrimaryColor}
                style={Styles.button}
                onPress={this._submitWeight}
                disabled={weight < 0}>
                <Text style={[Styles.buttonText, Styles.buttonWithIconText]}>
                  <FontAwesome
                    name='check'
                    size={20}
                  />
                </Text>
              </TouchableHighlight>
            </View>
          </ScrollView>}
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
  bodyweightInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30
  },
  weight: {
    flex: 3,
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'Futura',
    color: Colors.black,
    paddingTop: 7
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
  bodyweightDate: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  }
});
