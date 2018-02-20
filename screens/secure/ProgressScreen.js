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
    title: 'Progress',
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showDatepicker: false,
      weight: ""
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
    var bodyweightRecords = firebase.database().ref().child('bodyweightRecords');

    // check first that not already an entry for today - check timestamp and date

    bodyweightRecords.push({
      date: moment(new Date).format('MM-DD-YY'),
      timestamp: Number(this.state.clientTimestamp),
      weight: Number(this.state.weight)
    }).then(resp => {}, reason => {
      alert('Could not save bodyweight');
    });

    this.setState({ showDatepicker: false, date: new Date(), weight: "" }, this._hideAll());
  }

  componentWillMount() {
    const client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    const bodyweightRecords = firebase.database().ref().child('bodyweightRecords');

    client.on('value', snapshot => {
      this.setState({ clientTimestamp: snapshot.val().timestamp });
    });

    bodyweightRecords.on('value', snapshot => {
      this.setState({ bodyweightData: snapshot.val() });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={this._hideAll}>
        <View style={Styles.body}>
          <View style={Styles.title}>
            <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
          </View>

          <View style={Styles.content}>
            <Text style={Styles.h3}>Your Progress</Text>

            <BodyweightGraph
              data={this.state.bodyweightData}
              clientTimestamp={this.state.clientTimestamp} />

            <View style={[Styles.flexRow, styles.todaysBodyweight]}>
              <TouchableHighlight
                style={styles.bodyweightDateButton}
                onPress={this._showDatepicker}>
                <FontAwesome
                  name='calendar'
                  size={24}
                />
              </TouchableHighlight>

              <TextInput
                style={[Styles.forms.textInput, styles.bodyweightInput]}
                keyboardType={'numeric'}
                placeholder={'Enter your weight'}
                onFocus={() => this.setState({ showDatepicker: false })}
                onChangeText={weight => this.setState({ weight })}
                value={this.state.weight}
              />

              <TouchableHighlight
                style={styles.bodyweightSaveButton}
                onPress={this._submitWeight}
                disabled={this.state.weight.trim().length < 1}>
                <FontAwesome
                  name='check'
                  size={24}
                />
              </TouchableHighlight>
            </View>

            {this.state.showDatepicker &&
              <DatePickerIOS
                mode={'date'}
                date={this.state.date}
                maximumDate={new Date()}
                onDateChange={date => this.setState({ date })}
              />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create ({
  todaysBodyweight: {
    marginTop: 20,
    marginBottom: 20
  },
  bodyweightDateButton: {
    width: 40,
    paddingTop: 15
  },
  bodyweightInput: {
    flex: 1
  },
  bodyweightSaveButton: {
    width: 40,
    paddingTop: 15,
    paddingLeft: 10
  },
  bodyweight: {
    fontSize: 36
  }
});
