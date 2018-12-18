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
      // points: 20, // TO DO
      teamPoints: 100,
      team: 'Orange',
      totalDays: 0
    }
  }

  componentDidMount() {
    const joinDate = this.props.client.joinDate;

    const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(joinDate);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

    this.setState({ totalDays: diffDays });
  }

  render() {
    const client = this.props.client;
    const teams = [
      { name: 'Apple', points: 500 },
      { name: 'Banana', points: 400 },
      { name: 'Kiwi', points: 300 },
      { name: 'Lemon', points: 200 },
      { name: 'Orange', points: 100 }
    ];

    const totalDays = this.state.totalDays;
    // TO DO: not hardcoded
    const totalAvailableQuizzes = 3;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.trophyIcon}>
          <FontAwesome
            name='trophy'
            size={48} />
        </Text>

        <Text style={[Styles.textCenter, styles.specificPointsDescription]}>Total Points</Text>
        <Text style={[Styles.bigTitle, Styles.textCenter, styles.individualPoints]}>{client.totalPoints}</Text>

        <View>
          <View style={[Styles.biometricRow, {paddingBottom: 35}]}>
          <Text style={styles.specificPointsDescription}>Meals</Text>
            <Text style={styles.specificPoints}>{client.mealPoints ? client.mealPoints : 0} / {totalDays}</Text>
          </View>
          <View style={[Styles.biometricRow, {paddingBottom: 35}]}>
            <Text style={styles.specificPointsDescription}>Weight</Text>
            <Text style={styles.specificPoints}>{client.weightPoints ? client.weightPoints : 0} / {totalDays}</Text>
          </View>
          <View style={[Styles.biometricRow, {paddingBottom: 35}]}>
            <Text style={styles.specificPointsDescription}>Lessons</Text>
            <Text style={styles.specificPoints}>{client.quizPoints ? client.quizPoints : 0} / {totalAvailableQuizzes}</Text>
          </View>
          <View style={[Styles.biometricRow, Styles.noBorderBottom, {paddingBottom: 35}]}>
            <Text style={styles.specificPointsDescription}>Social</Text>
            <Text style={styles.specificPoints}>{client.socialPoints ? client.socialPoints : 0}</Text>
          </View>
        </View>

        {/*<Text style={[Styles.bigTitle, Styles.textCenter, styles.teamPoints]}>{this.state.teamPoints}</Text>
        <Text style={[Styles.textCenter, styles.pointsDescription]}>Team {this.state.team} Points</Text>

        <View style={styles.teamsWrapper}>
          {teams.map((team, i) =>
            <View style={[Styles.flexRow, styles.teamWrapper]} key={i}>
              <Text style={[Styles.flexRowCol, styles.leaderboardText]}>Team {team.name}</Text>
              <Text style={[Styles.flexRowCol, styles.leaderboardText, styles.leaderboardPoints]}>{team.points}</Text>
            </View>)}
        </View>*/}
      </View>
    );
  }
};

export default PointsModal;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%'
  },
  trophyIcon: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center'
  },
  individualPoints: {
    fontSize: 56,
    marginBottom: 10
  },
  specificPoints: {
    fontFamily: 'Futura',
    fontSize: 24,
    textAlign: 'center'
  },
  specificTotal: {
    color: Colors.darkGray,
    textAlign: 'center'
  },
  specificPointsDescription: {
    letterSpacing: 1,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 15
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
