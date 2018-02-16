import React from 'react';

import firebase from '../../services/FirebaseService';

import Styles from '../../constants/Styles';

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

import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';

class BiometricSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      birthdate: this.props.client.birthdate ? this.props.client.birthdate : new Date(),
      showDatePicker: false,
      showGenderPicker: false
    }

    this._showDatePicker = this._showDatePicker.bind(this);
    this._showGenderPicker = this._showGenderPicker.bind(this);
    this._hideAll = this._hideAll.bind(this);
  }

  _showDatePicker () {
    Keyboard.dismiss();
    this.setState({ showDatePicker: !this.state.showDatePicker });
  }

  _showGenderPicker () {
    Keyboard.dismiss();
    this.setState({ showGenderPicker: !this.state.showGenderPicker });
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatePicker: false, showGenderPicker: false });
  }

  onChangeGender(g) {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ gender: g });
    this._showGenderPicker();
  }

  onChangeBodyweight(text) {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ bodyweight: Number(text) });
  }

  onChangeHeight(text) {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ height: Number(text) });
  }

  onChangeBodyfat(text) {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ bodyfat: Number(text) });
  }

  onChangeBirthdate(text) {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    client.update({ birthdate: format(text, "MMMM D, YYYY") });
    this.setState({ birthdate: format(text, "MMMM D, YYYY") });
    this._showDatePicker();
  }

  clickSave() {
    alert('Saved!');
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={Styles.modalH1}>Biometric Settings</Text>

        <Text style={Styles.paragraphText}>Your meal plan is based on the following biometrics.</Text>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Gender</Text>
          <View>
            <Button
              title={this.props.client.gender}
              onPress={this._showGenderPicker}/>

            {this.state.showGenderPicker &&
              <Picker
                selectedValue={this.props.client.gender}
                onValueChange={(g) => this.onChangeGender(g)}>
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>}
          </View>
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Bodyweight</Text>
          <TextInput
            style={Styles.forms.textInput}
            keyboardType='numeric'
            onChangeText={(text) => this.onChangeBodyweight(text)}
            value={this.props.client.bodyweight.toString()} />
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Birthday</Text>

          <View>
            <Button
              title={format(this.state.birthdate, 'MMMM DD, YYYY')}
              onPress={this._showDatePicker}/>

            {this.state.showDatePicker &&
              <DatePickerIOS
                mode={'date'}
                date={new Date(this.state.birthdate)}
                onDateChange={date => this.onChangeBirthdate(date)}
              />}
          </View>
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Height (in inches)</Text>
          <TextInput
            style={Styles.forms.textInput}
            value={this.props.client.height.toString()}
            onChangeText={(text) => this.onChangeHeight(text)}
            keyboardType='numeric' />
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Body fat percentage</Text>
          <TextInput
            style={Styles.forms.textInput}
            value={this.props.client.bodyfat.toString()}
            onChangeText={(text) => this.onChangeBodyfat(text)}
            keyboardType='numeric' />
        </View>

        <TouchableHighlight style={Styles.modalButton} onPress={ () => { this.clickSave() } }>
           <Text style={Styles.modalButtonText}>Save</Text>
        </TouchableHighlight>
      </View>
      // <ModalWrapper
      //   {...props}
      //   title="Sign in"
      //   width={400}
      //   showOk={false}
      // >
      //   <p>Choose your flavor</p>
      //   <button onClick={() => signIn('facebook')}>Facebook</button>
      //   <button onClick={() => signIn('google')}>Google</button>
      //   <button onClick={() => signIn('twitter')}>Twitter</button>
      // </ModalWrapper>
    );
  }
};

export default BiometricSettingsModal;
