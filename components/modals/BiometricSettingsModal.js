import React from 'react';

import Styles from '../../constants/Styles';

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

import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';

class BiometricSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      showDatepicker: false
    }

    this._showDatepicker = this._showDatepicker.bind(this);
    this._hideAll = this._hideAll.bind(this);
  }

  _showDatepicker () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: !this.state.showDatepicker });
  }

  _hideAll () {
    Keyboard.dismiss();
    this.setState({ showDatepicker: false });
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={Styles.modalH1}>Biometric Settings</Text>

        <Text style={Styles.paragraphText}>Your meal plan is based on the following biometrics.</Text>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Gender</Text>
          <Text>Female</Text>
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Bodyweight*</Text>
          <Text>128</Text>
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Birthday</Text>

          <View>
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
              placeholder={"Enter Your Birthday"}
              onFocus={() => this.setState({ showDatepicker: false })}
              onChangeText={birthday => this.setState({ birthday })}
              value={this.state.birthday}
            />
          </View>
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Height (in inches)</Text>
          <TextInput/>
        </View>

        <View style={Styles.biometricRow}>
          <Text style={Styles.h3}>Body fat percentage</Text>
          <TextInput/>
        </View>

        <Text style={Styles.finePrint}>*As your bodyweight should not change during your 8-10 week cut/bulk cycle, please email us at <Text onPress={() => Linking.openURL('mailto:support@adaptivenutrition.us')}>support@adaptivenutrition.us</Text> to update this setting.</Text>

        <TouchableHighlight style={Styles.modalButton} onPress={() => {this.saveSettings}}>
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
