import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import Lesson from '../../components/Lesson';

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
    title: 'Education',
  };

  constructor(props) {
    super(props);
    this.state = {
      client: null
    }

    this._clickTakeQuiz = this._clickTakeQuiz.bind(this);
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    client.on('value', snapshot => {
      this.setState({
        client: snapshot.val()
      });
    });
  }

  _clickTakeQuiz(lessonNumber, timestamp) {
    const { navigate } = this.props.navigation;
    navigate('Quiz', { lessonNumber: lessonNumber, timestamp: timestamp });
  }

  render() {
    const lessons = [1,2,3,4,5,6,7,8,9,10];

    return (
      <View style={Styles.body}>
        <Header />

        <ScrollView style={Styles.content}>
          <Text style={[Styles.bigTitle, Styles.pageTitle]}>Lessons</Text>

          {lessons.map(i => <Lesson
            key={i}
            lessonNumber={i}
            clickTakeQuiz={this._clickTakeQuiz}
            timestamp={this.state.client ? this.state.client : null} />)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({

});
