import React from 'react';

import firebase from '../../services/FirebaseService';

import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import { convertTemplateToString } from '../../utils/helpers';

import { FontAwesome } from 'react-native-vector-icons';
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

import {
  Button,
  DatePickerIOS,
  Keyboard,
  Modal,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class UserModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDatePicker: false,
      showTemplateInfo: true,
      showBiometricSettings: false
    }

    this._showDatePicker = this._showDatePicker.bind(this);
    this._hideAll = this._hideAll.bind(this);
  }

  _showDatePicker () {
    Keyboard.dismiss();
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatePicker: false });
  }

  clickSave() {
    alert('Saved!');
  }

  clickGoal(goal) {
    this.props.clickGoal(goal);
  }

  render() {
    const name = this.props.client ? this.props.client.firstName : null;
    const gender = this.props.client ? this.props.client.gender : 'Female';
    const height = this.props.client && this.props.client.height ? this.props.client.height.toString() : null;
    const bodyweight = this.props.client && this.props.client.weight ? this.props.client.weight.toString() : null;
    const bodyfat = this.props.client && this.props.client.bodyfat ? this.props.client.bodyfat.toString() : null;
    const birthdate = this.props.client ? this.props.client.birthdate : new Date();
    const phase = this.props.client ? this.props.client.phase : 1;
    const goal = this.props.client.goal ? true : false;

    // TO DO: not hardcoded dates; check what goal is to see what step 2 should be
    const template = convertTemplateToString(this.props.client.template);
    const templateStartDate = this.props.client.templateStartDate ? this.props.client.templateStartDate : 'October 1, 2018';

    return (
      <View style={[Styles.modalContent, styles.modalContent]}>
        <Text style={Styles.bigTitle}>{name}</Text>

        <View style={Styles.flexRow}>
          <TouchableHighlight
            underlayColor={Colors.white}
            style={[Styles.flexCol, this.state.showTemplateInfo ? Styles.progressButtonActive : Styles.progressButton]}
            onPress={() => this.setState({ showTemplateInfo: true, showBiometricSettings: false })}>
            <Text style={this.state.showTemplateInfo ? Styles.progressButtonTextActive : Styles.progressButtonText}>MEAL PLAN</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={Colors.white}
            style={[Styles.flexCol, this.state.showBiometricSettings ? Styles.progressButtonActive : Styles.progressButton]}
            onPress={() => this.setState({ showTemplateInfo: false, showBiometricSettings: true })}>
            <Text style={this.state.showBiometricSettings ? Styles.progressButtonTextActive : Styles.progressButtonText}>BIOMETRICS</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contentWrapper}>
          {this.state.showTemplateInfo && <View style={styles.templatesWrapper}>
            {!goal && <View style={styles.goalWrapper}>
              <View style={styles.templateWrapper}>
                <Text style={[Styles.textCenter, Styles.h3]}>{"WHAT'S YOUR GOAL?"}</Text>
              </View>

              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.button, Styles.buttonInverted]}
                onPress={() => this.clickGoal(2)}>
                <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>Lose weight</Text>
              </TouchableHighlight>

              <Text></Text>

              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.button, Styles.buttonInverted]}
                onPress={() => this.clickGoal(1)}>
                <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>Add lean muscle</Text>
              </TouchableHighlight>

              <Text></Text>

              <TouchableHighlight
                underlayColor={Colors.white}
                style={[Styles.button, Styles.buttonInverted]}
                onPress={() => this.clickGoal(0)}>
                <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>Maintain current weight</Text>
              </TouchableHighlight>
            </View>}

            {goal && <View style={styles.templatesWrapper}>
              <View style={styles.templateWrapper}>
                <Text style={[Styles.textCenter, Styles.h3]}>CURRENT PLAN</Text>
                <Text style={[Styles.textCenter, styles.template]}>{phase === 3 ? template : 'Phase ' + phase}</Text>
                <Text style={[Styles.textCenter, styles.templateStartDate]}>Started {templateStartDate}</Text>
              </View>

              <TouchableHighlight
                underlayColor={Colors.white}
                style={Styles.button}
                onPress={this.props.clickTemplateType}>
                <Text style={Styles.buttonText}>Change template</Text>
              </TouchableHighlight>
            </View>}
          </View>}

          {this.state.showBiometricSettings && <View style={styles.biometricSettingsWrapper}>
            <Text style={[Styles.paragraphText, Styles.textCenter, styles.blurb]}>Your meal plan is built from your biometric settings below.</Text>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>GENDER</Text>
              <View style={Styles.flexRow}>
                <FontAwesome
                  style={[Styles.flexRowCol, styles.femaleIcon, gender === 'Female' ? styles.genderIconSelected : null]}
                  onPress={() => this.props.onChangeGender('Female')}
                  name='female'
                  size={48} />
                <FontAwesome
                  style={[Styles.flexRowCol, styles.maleIcon, gender === 'Male' ? styles.genderIconSelected : null]}
                  onPress={() => this.props.onChangeGender('Male')}
                  name='male'
                  size={48} />
              </View>
            </View>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>WEIGHT</Text>
              <TextInput
                style={[Styles.forms.textInput]}
                keyboardType='decimal-pad'
                maxLength={3}
                onChangeText={(text) => this.props.onChangeBodyweight(text)}
                value={bodyweight} />
            </View>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>BIRTHDAY</Text>

              <View style={Styles.flexCol}>
                <TouchableHighlight
                  underlayColor={Colors.white}
                  style={Styles.linkButton}
                  onPress={this._showDatePicker}>
                    <Text style={Styles.forms.textInput}>{format(birthdate, 'MMMM DD, YYYY')}</Text>
                </TouchableHighlight>

                {this.state.showDatePicker &&
                  <DatePickerIOS
                    mode={'date'}
                    date={new Date(birthdate)}
                    onDateChange={date => this.props.onChangeBirthdate(date)} />}
              </View>
            </View>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>HEIGHT (IN INCHES)</Text>
              <TextInput
                style={[Styles.forms.textInput]}
                value={height}
                maxLength={2}
                onChangeText={(text) => this.props.onChangeHeight(text)}
                keyboardType='decimal-pad' />
            </View>

            <View style={[Styles.biometricRow, Styles.noBorderBottom]}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>BODY FAT %</Text>
              <TextInput
                style={[Styles.forms.textInput]}
                value={bodyfat}
                maxLength={2}
                onChangeText={(text) => this.props.onChangeBodyfat(text)}
                keyboardType='decimal-pad' />
            </View>

            <TouchableHighlight
              style={Styles.modalButton}
              onPress={() => { this.clickSave() } }>
                <Text style={Styles.modalButtonText}>UPDATE</Text>
            </TouchableHighlight>
          </View>}
        </View>
      </View>
    );
  }
};

export default UserModal;

const styles = StyleSheet.create ({
  modalContent: {
    margin: 0,
    alignSelf: 'stretch'
  },
  contentWrapper: {
    padding: 20
  },
  femaleIcon: {
    textAlign: 'right',
    padding: 20
  },
  maleIcon: {
    textAlign: 'left',
    padding: 20
  },
  genderIconSelected: {
    color: Colors.primaryColor
  },
  templatesWrapper: {
    marginTop: 20
  },
  templateWrapper: {
    marginBottom: 40
  },
  template: {
    fontFamily: 'Futura',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10
  },
  templateStartDate: {
    fontSize: 18,
    letterSpacing: 1,
    color: Colors.gray
  },
  birthdate: {
    fontSize: 28
  },
  blurb: {
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});
