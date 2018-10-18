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
      points: 20, // TO DO
      teamPoints: 100
    }
  }

  render() {
    const teams = [1,2,3,4,5];

    return (
      <View style={Styles.modalContent}>
        <Text>{this.state.points}</Text>
        <Text>Your Points</Text>

        <Text>{this.state.teamPoints}</Text>
        <Text>Team Points</Text>

        {teams.map((team, i) => {
          <View key={i}>
            <Text>Team {team}</Text>
            <Text>10</Text>
          </View>})}
      </View>
    );
  }
};

export default PointsModal;
