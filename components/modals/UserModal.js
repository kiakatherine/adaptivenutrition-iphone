import React from 'react';

import firebase from '../../services/FirebaseService';

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

    this.state = { };
  }

  render() {
    // console.log('client', this.props.client)
    return (
      <View style={[Styles.modalContent, styles.wrapper]}>
      <Text>Hi</Text>
      </View>
    );
  }
};

export default UserModal;

const styles = StyleSheet.create ({
  wrapper: {
    marginTop: 20,
    alignItems: 'center'
  }
});
