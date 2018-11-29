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

  render() {
    const name = this.props.client ? this.props.client.firstName : null;
    const gender = this.props.client ? this.props.client.gender : 'Female';
    const height = this.props.client && this.props.client.height ? this.props.client.height.toString() : null;
    const bodyweight = this.props.client && this.props.client.weight ? this.props.client.weight.toString() : null;
    const bodyfat = this.props.client && this.props.client.bodyfat ? this.props.client.bodyfat.toString() : null;
    const birthdate = this.props.client ? this.props.client.birthdate : new Date();
    const phase = this.props.client ? this.props.client.phase : 1;

    // TO DO: not hardcoded dates; check what goal is to see what step 2 should be
    const template = convertTemplateToString(this.props.client.template);
    const templateStartDate = 'October 1, 2018';
    const nextTemplate = this.props.client.template + 1 < 5 ? convertTemplateToString(this.props.client.template + 1) : 0;
    const nextTemplateStartDate = 'December 1, 2018';

    return (
      <View style={[Styles.modalContent, styles.modalContent]}>
        <Text style={Styles.bigTitle}>{name}</Text>

        <View style={Styles.tabButtons}>
          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showTemplateInfo ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showTemplateInfo: true, showBiometricSettings: false })}>
            <Text style={this.state.showTemplateInfo ? Styles.tabButtonTextActive : Styles.tabButtonText}>MEAL PLAN</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showBiometricSettings ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showTemplateInfo: false, showBiometricSettings: true })}>
            <Text style={this.state.showBiometricSettings ? Styles.tabButtonTextActive : Styles.tabButtonText}>BIOMETRICS</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contentWrapper}>
          {this.state.showTemplateInfo && <View style={styles.templatesWrapper}>
            <View style={styles.templatesWrapper}>
              <View style={styles.templateWrapper}>
                <Text style={[Styles.textCenter, Styles.h3]}>CURRENT</Text>
                <Text style={[Styles.textCenter, styles.template]}>{phase === 3 ? template : 'Phase ' + phase}</Text>
                <Text style={[Styles.textCenter, styles.templateStartDate]}>Started {templateStartDate}</Text>
              </View>

              <View style={styles.templateWrapper}>
                <Text style={[Styles.textCenter, Styles.h3]}>NEXT UP</Text>
                <Text style={[Styles.textCenter, styles.template]}>{phase === 3 ? nextTemplate : phase === 2 ? 'Phase 3' : phase === 1 ? 'Phase 2' : null}</Text>
                <Text style={[Styles.textCenter, styles.templateStartDate]}>Begins {nextTemplateStartDate}</Text>
              </View>
            </View>
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

            <View style={[Styles.biometricRow, styles.noBorder]}>
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
  noBorder: {
    borderBottomWidth: 0
  },
  blurb: {
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});
