import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';

import {
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Scoreboard',
  };

  constructor(props) {
    super(props);
    this.state = {
      client: null
    }
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');
    // var challengeGroupTeam = firebase.database().ref('challengeGroupTeams/-LK7UbdarUAEVW9H8C2W');
    var challengeGroupTeams = firebase.database().ref('challengeGroupTeams');

    client.on('value', snapshot => {
      this.setState({
        client: snapshot.val()
      });
    });

    challengeGroupTeams.on('value', snapshot => {
      this.setState({
        challengeGroupTeams: snapshot.val()
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const teamName = this.state.client ? this.state.client.challengeGroupTeam : null;
    let teams = [1,2,3,4,5];

    return (
      <View style={Styles.body}>
        <Header />

        <ScrollView style={Styles.content}>
          <Text style={[Styles.bigTitle, Styles.pageTitle]}>Scoreboard</Text>

          {teams.map((team, i) => <Text key={i}>{team}</Text>)}
        </ScrollView>
      </View>
    );
  }
}
