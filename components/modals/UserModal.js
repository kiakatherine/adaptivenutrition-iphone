import React from 'react';

import firebase from '../../services/FirebaseService';

import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';

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
      date: new Date(),
      birthdate: this.props.client ? this.props.client.birthdate : new Date(),
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

  // onChangeGender(g) {
  //   var client = this.props.client;
  //   client.update({ gender: g });
  // }
  //
  // onChangeBodyweight(text) {
  //   var client = this.props.client;
  //   client.update({ bodyweight: Number(text) });
  // }
  //
  // onChangeHeight(text) {
  //   var client = this.props.client;
  //   client.update({ height: Number(text) });
  // }
  //
  // onChangeBodyfat(text) {
  //   var client = this.props.client;
  //   client.update({ bodyfat: Number(text) });
  // }
  //
  // onChangeBirthdate(text) {
  //   var client = this.props.client;
  //   client.update({ birthdate: format(text, "MMMM D, YYYY") });
  //   this.setState({ birthdate: format(text, "MMMM D, YYYY") });
  //   this._showDatePicker();
  // }

  clickSave() {
    alert('Saved!');
  }

  render() {
    // TO DO: not hardcoded
    const name = this.props.client ? this.props.client.displayName : 'Kia';
    const gender = this.props.client ? this.props.client.gender : 'Female';
    const height = this.props.client ? this.props.client.height : 62;
    const bodyweight = this.props.client ? this.props.client.bodyweight : 128;
    const bodyfat = this.props.client ? this.props.client.bodyfat : 18;
    const birthdate = this.state.birthdate;

    const template = 'Lose weight (Step 2)';
    const templateStartDate = 'October 1, 2018';
    const nextTemplate = 'Lock in results (Step 3)';
    const nextTemplateStartDate = 'December 1, 2018';
    // console.log('client', this.props.client)
    return (
      <View style={[Styles.modalContent, styles.modalContent]}>
        <Text style={Styles.bigTitle}>{name}</Text>

        <View style={Styles.tabButtons}>
          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showTemplateInfo ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showTemplateInfo: true, showBiometricSettings: false })}>
            <Text style={this.state.showTemplateInfo ? Styles.tabButtonTextActive : Styles.tabButtonText}>TEMPLATE</Text>
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
                <Text style={[Styles.textCenter, styles.template]}>{template}</Text>
                <Text style={[Styles.textCenter, styles.templateStartDate]}>Started {templateStartDate}</Text>
              </View>

              <View style={styles.templateWrapper}>
                <Text style={[Styles.textCenter, Styles.h3]}>NEXT UP</Text>
                <Text style={[Styles.textCenter, styles.template]}>{nextTemplate}</Text>
                <Text style={[Styles.textCenter, styles.templateStartDate]}>Switch on {nextTemplateStartDate}</Text>
              </View>
            </View>
          </View>}

          {this.state.showBiometricSettings && <View style={styles.biometricSettingsWrapper}>
            <Text style={[Styles.paragraphText, Styles.textCenter]}>Your meal plan is built from your biometrics below.</Text>

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
                keyboardType='numeric'
                onChangeText={(text) => this.props.onChangeBodyweight(text)}
                value={bodyweight.toString()} />
            </View>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>BIRTHDAY</Text>

              <View style={Styles.flexCol}>
                <Button
                  title={format(birthdate, 'MMMM DD, YYYY')}
                  onPress={this._showDatePicker}/>

                {this.state.showDatePicker &&
                  <DatePickerIOS
                    mode={'date'}
                    date={new Date(birthdate)}
                    onDateChange={date => this.props.onChangeBirthdate(date)}
                  />}
              </View>
            </View>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>HEIGHT (IN INCHES)</Text>
              <TextInput
                style={[Styles.forms.textInput]}
                value={height.toString()}
                onChangeText={(text) => this.props.onChangeHeight(text)}
                keyboardType='numeric' />
            </View>

            <View style={Styles.biometricRow}>
              <Text style={[Styles.inputLabel, Styles.textCenter]}>BODY FAT %</Text>
              <TextInput
                style={[Styles.forms.textInput]}
                value={bodyfat.toString()}
                onChangeText={(text) => this.props.onChangeBodyfat(text)}
                keyboardType='numeric' />
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
  }
});
