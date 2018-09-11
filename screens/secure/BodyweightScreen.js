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

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Bodyweight',
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showDatepicker: false,
      weight: '',
      clientTimestamp: null
    }

    this._showDatepicker = this._showDatepicker.bind(this);
    this._hideAll = this._hideAll.bind(this);
    this._submitWeight = this._submitWeight.bind(this);
  }

  _showDatepicker () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: !this.state.showDatepicker });
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: false });
  }

  _submitWeight (w) {
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
        showDatepicker: false,
        date: new Date(),
        weight: ''
      }, this._hideAll());
    });
  }

  componentDidMount() {
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

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <View style={Styles.header}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 80, height: 80 }} />
        </View>

        <ScrollView style={Styles.content}>
          <View>
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
                  underlayColor={Colors.darkerPrimaryColor}
                  style={Styles.button}
                  onPress={this._submitWeight}
                  disabled={this.state.weight.trim().length < 1}>
                  <Text style={Styles.buttonText}>Save</Text>
                </TouchableHighlight>
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
    padding: 15,
    marginBottom: 5,
    backgroundColor: Colors.paleBlue
  },
  phaseHeaderText: {
    fontSize: 16,
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
