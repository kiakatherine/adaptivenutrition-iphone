import React from 'react';

import firebase from '../../services/FirebaseService';

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

    this.setState({ showDatepicker: false, date: new Date(), weight: "" });
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    client.on('value', snapshot => {
      this.setState({ clientTimestamp: snapshot.val().timestamp });
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
            <Button
              title={format(this.state.date, "MMMM D, YYYY")}
              onPress={this._showDatepicker}/>

            {this.state.showDatepicker &&
            <DatePickerIOS
              mode={'date'}
              date={this.state.date}
              minimumDate={subDays(new Date(), 30)}
              maximumDate={new Date()}
              onDateChange={date => this.setState({ date })}
            />}

            <TextInput
              style={Styles.forms.textInput}
              keyboardType={'numeric'}
              placeholder={"Enter Your Weight"}
              onFocus={() => this.setState({ showDatepicker: false })}
              onChangeText={weight => this.setState({ weight })}
              value={this.state.weight}
            />

            <Button
              title="Submit"
              onPress={this._submitWeight}
              disabled={this.state.weight.trim().length < 1}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
