import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import Lesson from '../../components/Lesson';
import LessonQuiz from '../../components/LessonQuiz';

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
      client: null,
      showQuiz: false,
      selectedLessonNumber: 1
    }

    this._clickTakeQuiz = this._clickTakeQuiz.bind(this);
    this._closeQuiz = this._closeQuiz.bind(this);
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
    this.setState({
      showQuiz: true,
      selectedLessonNumber: lessonNumber
    });
  }

  _closeQuiz() {
    this.setState({ showQuiz: false });
  }

  render() {
    const lessons = [1,2,3,4,5,6,7,8];

    return (
      <View style={Styles.body}>
        <ScrollView style={Styles.content}>
          {!this.state.showQuiz && <View>
            <Text style={[Styles.bigTitle, Styles.pageTitle]}>Lessons</Text>

            {lessons.map(i => <Lesson
              key={i}
              lessonNumber={i}
              clickTakeQuiz={this._clickTakeQuiz}
              timestamp={this.state.client ? this.state.client : null} />)}
            </View>}

          {this.state.showQuiz &&
            <LessonQuiz
              lesson={this.state.selectedLessonNumber}
              closeQuiz={this._closeQuiz} />}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({

});
