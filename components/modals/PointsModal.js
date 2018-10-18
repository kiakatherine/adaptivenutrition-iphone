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

class PointsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: 20, // TO DO
      teamPoints: 100,
      team: 'Orange'
    }
  }

  render() {
    const teams = [
      { name: 'Apple', points: 500 },
      { name: 'Banana', points: 400 },
      { name: 'Kiwi', points: 300 },
      { name: 'Lemon', points: 200 },
      { name: 'Orange', points: 100 }
    ];

    // TO DO: not hardcoded
    const totalDays = 25;
    const totalAvailableQuizzes = 3;

    return (
      <View style={[Styles.modalContent, styles.wrapper]}>
        <Text style={styles.trophyIcon}>
          <FontAwesome
            name='trophy'
            size={48} />
        </Text>

        <Text style={[Styles.bigTitle, Styles.textCenter, styles.individualPoints]}>{this.state.points}</Text>
        <Text style={[Styles.textCenter, styles.pointsDescription]}>Your Points</Text>

        <View style={Styles.flexRow}>
          <View style={[Styles.flexCol, styles.specificPointsWrapper]}>
            <Text style={styles.specificPoints}>{5}</Text>
            <Text style={styles.specificTotal}>out of {totalDays}</Text>
            <Text style={styles.specificPointsDescription}>Meals</Text>
          </View>
          <View style={[Styles.flexCol, styles.specificPointsWrapper]}>
            <Text style={styles.specificPoints}>{3}</Text>
            <Text style={styles.specificTotal}>out of {totalDays}</Text>
            <Text style={styles.specificPointsDescription}>Weight</Text>
          </View>
          <View style={[Styles.flexCol, styles.specificPointsWrapper]}>
            <Text style={styles.specificPoints}>{3}</Text>
            <Text style={styles.specificTotal}>out of {totalAvailableQuizzes}</Text>
            <Text style={styles.specificPointsDescription}>Quizzes</Text>
          </View>
          <View style={[Styles.flexCol, styles.specificPointsWrapper]}>
            <Text style={styles.specificPoints}>{0}</Text>
            <Text style={styles.specificTotal}>{' '}</Text>
            <Text style={styles.specificPointsDescription}>Social</Text>
          </View>
        </View>

        <Text style={[Styles.bigTitle, Styles.textCenter, styles.teamPoints]}>{this.state.teamPoints}</Text>
        <Text style={[Styles.textCenter, styles.pointsDescription]}>Team {this.state.team} Points</Text>

        <View style={styles.teamsWrapper}>
          {teams.map((team, i) =>
            <View style={[Styles.flexRow, styles.teamWrapper]} key={i}>
              <Text style={[Styles.flexRowCol, styles.leaderboardText]}>Team {team.name}</Text>
              <Text style={[Styles.flexRowCol, styles.leaderboardText, styles.leaderboardPoints]}>{team.points}</Text>
            </View>)}
        </View>
      </View>
    );
  }
};

export default PointsModal;

const styles = StyleSheet.create ({
  wrapper: {
    marginTop: 20,
    alignItems: 'center'
  },
  trophyIcon: {
    marginTop: 10,
    marginBottom: 20
  },
  individualPoints: {
    fontSize: 56,
    marginBottom: 10
  },
  specificPointsWrapper: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  specificPoints: {
    fontFamily: 'Futura',
    fontSize: 24,
    textAlign: 'center'
  },
  specificTotal: {
    color: Colors.darkGray,
    marginBottom: 5
  },
  specificPointsDescription: {
    letterSpacing: 1,
    textAlign: 'center'
  },
  teamPoints: {
    fontSize: 56,
    marginTop: 40,
    marginBottom: 10
  },
  pointsDescription: {
    fontSize: 24,
    letterSpacing: 1,
    marginBottom: 10
  },
  teamsWrapper: {
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  teamWrapper: {
    marginBottom: 10
  },
  leaderboardText: {
    fontSize: 20,
    letterSpacing: 1
  },
  leaderboardPoints: {
    textAlign: 'right'
  }
});
