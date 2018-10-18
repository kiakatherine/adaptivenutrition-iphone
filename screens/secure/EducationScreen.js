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
      selectedLessonNumber: 1,
      question1: false,
      question2: false,
      question3: false,
      question4: false,
      question5: false,
      quizPassed: false
    }

    this._clickTakeQuiz = this._clickTakeQuiz.bind(this);
    this._selectAnswer = this._selectAnswer.bind(this);
    this._checkQuizAnswers = this._checkQuizAnswers.bind(this);
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

  _selectAnswer(questionNumber, isCorrect) {
    const q = 'question' + questionNumber;
    this.setState({ [q]: isCorrect });
  }

  _checkQuizAnswers() {
    if(this.state.question1 &&
      this.state.question2 &&
      this.state.question3 &&
      this.state.question4 &&
      this.state.question5) {
        this.setState({ quizPassed: true });
      } else {
        this.setState({ quizPassed: false, showQuiz: false }, () => {
          // restart quiz
          this.setState({ showQuiz: true });
        });
      }

      this.setState({
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false
      })
  }

  _closeQuiz() {
    this.setState({ showQuiz: false });
  }

  render() {
    const lessons = [1,2,3,4,5,6,7,8];

    return (
      <View style={Styles.body}>
        {!this.state.showQuiz && <ScrollView style={Styles.content}>
          <View>
            <Text style={[Styles.bigTitle, Styles.pageTitle]}>Lessons</Text>

            {lessons.map(i => <Lesson
              key={i}
              lessonNumber={i}
              clickTakeQuiz={this._clickTakeQuiz}
              timestamp={this.state.client ? this.state.client : null} />)}
            </View>
        </ScrollView>}

        {this.state.showQuiz &&
          <LessonQuiz
            lesson={this.state.selectedLessonNumber}
            selectAnswer={this._selectAnswer}
            checkQuizAnswers={this._checkQuizAnswers}
            quizPassed={this.state.quizPassed}
            closeQuiz={this._closeQuiz} />}
      </View>
    );
  }
}

const styles = StyleSheet.create ({

});
