import React from 'react';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';
import moment from 'moment';

import QuizQuestion from '../../components/QuizQuestion';
import * as quizzes from '../../constants/Quizzes';

import {
  Button,
  DatePickerIOS,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class AddBodyweightModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDatepicker: false
    };

    this._showDatepicker = this._showDatepicker.bind(this);
  }

  _showDatepicker () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: !this.state.showDatepicker });
  }

  setDate(date) {
    Keyboard.dismiss();
    this.setState({ showDatepicker: !this.state.showDatepicker });
    this.setState({ date });
    this.props.setDate(date);
  }

  render() {
    let weight = this.props.weight;

    return (
      <View style={Styles.modalContent}>
        <View>
          <TouchableHighlight
            underlayColor={Colors.white}
            onPress={this._showDatepicker}>
            <Text style={styles.bodyweightDate}>
              {moment(this.props.date).format('MMMM D')} <FontAwesome
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
            date={this.props.date}
            maximumDate={new Date()}
            onDateChange={date => this.setDate(date) }
          />}

        <View>
          <Text style={styles.bodyweightDate}>{moment(this.props.date).format('MMMM D')}</Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.bodyweightInputWrapper}>
            <TouchableHighlight
              underlayColor={Colors.darkerPrimaryColor}
              style={[Styles.buttonCircular, Styles.buttonInverted]}
              onPress={() => { this.props.updateWeight(weight, 'decrease') }}
              disabled={weight < 0}>
              <Text style={[Styles.buttonCircularIcon, Styles.buttonInvertedText]}>
                <FontAwesome
                  name='minus'
                  size={16}
                />
              </Text>
            </TouchableHighlight>

            <Text style={styles.weight}>{weight.toString()}</Text>

            <TouchableHighlight
              underlayColor={Colors.darkerPrimaryColor}
              style={[Styles.buttonCircular, Styles.buttonInverted]}
              onPress={() => { this.props.updateWeight(weight, 'increase') }}
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
            onPress={this.props.submitWeight}
            disabled={weight < 0}>
            <Text style={[Styles.buttonText, Styles.buttonWithIconText]}>
              <FontAwesome
                name='check'
                size={20}
              />
            </Text>
          </TouchableHighlight>

          {this.props.duplicateError &&
            <Text style={[Styles.message, {fontSize: 18, color: Colors.paleRed, marginTop: 30}]}>{"Oops, looks like there's already an entry for that day"}</Text>}
        </View>
      </View>
    );
  }
};

export default AddBodyweightModal;

const styles = StyleSheet.create({
  progressSection: {
    marginTop: 20,
    marginBottom: 50
  },
  bodyweightDate: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  },
  bodyweightInputWrapper: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  weight: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'Futura',
    color: Colors.black,
    paddingTop: 8,
    paddingLeft: 20,
    paddingRight: 20
  }
});
