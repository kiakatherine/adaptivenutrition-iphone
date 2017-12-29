import React from 'react';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import {
  Button,
  DatePickerIOS,
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
    title: 'Home',
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

  _submitWeight () {
    this.setState({ showDatepicker: false, date: new Date(), weight: "" });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={this._hideAll}>
        <View style={Styles.body}>
          <View style={Styles.title}>
            <Text style={Styles.titleText}>Adaptive Nutrition</Text>
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

          <View>
            <Text style={Styles.titleText}>Graph goes here</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
