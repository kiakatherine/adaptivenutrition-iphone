import React from 'react';

import firebase from '../../services/FirebaseService';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
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
import { convertTemplateNumberToString } from '../../utils/helpers';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Progress',
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showDatepicker: false,
      weight: '',
      clientTimestamp: null,
      showProgressPhase1: true,
      showProgressPhase2: true,
      showProgressPhase3: true,
      showBodyweightLog: true,
      showProgressReports: false
    }

    this._showDatepicker = this._showDatepicker.bind(this);
    this._hideAll = this._hideAll.bind(this);
  }

  componentDidMount() {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const dayStatuses = firebase.database().ref('dayStatuses');
    const phaseTwoDayStatuses = firebase.database().ref('phaseTwoDays');
    let clientResponse = null;

    client.on('value', snapshot => {
      clientResponse = snapshot.val();

      // this.setState({
      //   clientTimestamp: clientResponse.timestamp,
      //   clientPhase: clientResponse.phase
      // });
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
        <View style={Styles.nameHeader}>
          <Text style={Styles.nameHeaderText}>{this.state.client ? this.state.client.name : ''} - Phase {this.state.clientPhase} - {convertTemplateNumberToString(this.state.template)}</Text>
        </View>

        <View style={Styles.header}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 50, height: 50 }} />
        </View>

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
            <Text style={[Styles.bigTitle, Styles.pageTitle]}>{this.state.client ? this.state.client.bodyweightDelta : '192'}</Text>
            <Text style={Styles.menuItemSubText}>Average over last 5 days</Text>

            <BodyweightGraph
              data={this.state.bodyweightData}
              clientTimestamp={this.state.clientTimestamp} />

            {this.state.bodyweightData &&
              <View style={[styles.todaysBodyweight, styles.progressSection]}>
                <View style={[styles.bodyweightInputsWrapper]}>
                  <View style={[styles.bodyweightInput, styles.bodyweightDateInput]}>
                    <TouchableHighlight
                      underlayColor={Colors.lightGray}
                      style={styles.bodyweightDateButton}
                      onPress={this._showDatepicker}>
                      <FontAwesome
                        name='calendar'
                        size={24}
                      />
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={Colors.lightGray}
                      onPress={this._showDatepicker}>
                      <Text style={styles.bodyweightDate}>{moment(this.state.date).format('MMMM D')}</Text>
                    </TouchableHighlight>
                  </View>

                  <TextInput
                    style={[Styles.forms.textInput, styles.bodyweightInput]}
                    keyboardType={'numeric'}
                    placeholder={'Enter your weight'}
                    onFocus={() => this.setState({ showDatepicker: false })}
                    onChangeText={weight => this.setState({ weight })}
                    value={this.state.weight}
                  />
                </View>

                <TouchableHighlight
                  style={Styles.button}
                  onPress={this._submitWeight}
                  disabled={this.state.weight.trim().length < 1}>
                  <Text style={Styles.buttonText}>Save</Text>
                </TouchableHighlight>
              </View>}
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

        {this.state.showDatepicker &&
          <DatePickerIOS
            style={styles.datePicker}
            mode={'date'}
            date={this.state.date}
            maximumDate={new Date()}
            onDateChange={date => this.setState({ date, showDatepicker: false })}
          />}

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
  todaysBodyweight: {
    marginTop: 20
  },
  bodyweightInputsWrapper: {
    flex: 1,
    marginBottom: 15
  },
  bodyweightDateButton: {
    width: 40,
    paddingTop: 12,
    marginLeft: 15,
    marginBottom: 5
  },
  bodyweightDate: {
    fontSize: 20,
    paddingTop: 10
  },
  bodyweightDateInput: {
    height: 50,
    backgroundColor: Colors.lightGray,
    marginTop: 5,
    marginBottom: 10
  },
  bodyweightInput: {
    flex: 1,
    flexDirection: 'row'
  },
  datePicker: {
    flex: 1
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
    marginBottom: 50
  },
  phaseProgressWrapper: {
    marginTop: 10,
    marginBottom: 15
  }
});
