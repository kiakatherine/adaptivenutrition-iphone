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

class PointsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <View style={Styles.modalContent}><Text>hi</Text></View>
    );
  }
};

export default PointsModal;
