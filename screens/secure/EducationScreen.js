import React from 'react';
import { AsyncStorage } from 'react-native';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import Lesson from '../../components/Lesson';
import LessonDetail from '../../components/LessonDetail';
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
      selectedLessonNumber: '1',
      question1: false,
      question2: false,
      question3: false,
      question4: false,
      question5: false,
      quizPassed: false,
      question1Selection: null,
      question2Selection: null,
      question3Selection: null,
      question4Selection: null,
      question5Selection: null
    }

    this._clickTakeQuiz = this._clickTakeQuiz.bind(this);
    this._selectAnswer = this._selectAnswer.bind(this);
    this._showLessonDetail = this._showLessonDetail.bind(this);
    this._checkQuizAnswers = this._checkQuizAnswers.bind(this);
    this._closeQuiz = this._closeQuiz.bind(this);
  }

  async getSnapshot() {
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + uid);

    clientRef.on('value', snapshot => {
      this.setState({ client: snapshot.val() });
    });
  }

  componentDidMount() {
    // const uid = firebase.auth().currentUser.uid;
    this.getSnapshot()
  }

  _clickTakeQuiz(lessonNumber, timestamp) {
    this.setState({
      showLessonDetail: false,
      showQuiz: true,
      selectedLessonNumber: lessonNumber
    });
  }

  _selectAnswer(questionNumber, isCorrect, index) {
    const q = 'question' + questionNumber;
    const s = 'question' + questionNumber + 'Selection';
    this.setState({
      [q]: isCorrect,
      [s]: index
    });
  }

  _showLessonDetail(val, lessonNumber) {
    this.setState({ showLessonDetail: val, selectedLesson: lessonNumber });
  }

  async _checkQuizAnswers() {
    // const uid = firebase.auth().currentUser.uid;
    let userData = await AsyncStorage.getItem("user")
    let currentUser = JSON.parse(userData)
    const uid = currentUser.uid
    const clientRef = firebase.database().ref('/clients/' + uid);
    let client;
    const quiz = 'quiz' + this.state.selectedLessonNumber;

    clientRef.on('value', snapshot => {
      client = snapshot.val();
    });

    if(this.state.question1 &&
      this.state.question2 &&
      this.state.question3 &&
      this.state.question4 &&
      this.state.question5) {
        this.setState({ quizPassed: true });
        clientRef.update({
          [quiz]: true,
          quizPoints: Number(client.quizPoints) + 3,
          totalPoints: Number(client.totalPoints) + 3,
        });
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
        question5: false,
        question1Selection: null,
        question2Selection: null,
        question3Selection: null,
        question4Selection: null,
        question5Selection: null
      });
  }

  _closeQuiz() {
    this.setState({ showQuiz: false, showLessonDetail: true });
  }

  render() {
    const client = this.state.client;
    const lessons = [1,2,3,4,5,6,7,8,9,10,11];

    return (
      <View style={[Styles.body, styles.body]}>
        {!this.state.showQuiz && <ScrollView style={[Styles.content, styles.content]}>
          <View>
            <Text style={[Styles.bigTitle, Styles.pageTitle]}>Lessons</Text>

            {lessons.map(i => <Lesson
              key={i}
              lessonNumber={i}
              quiz1={client ? client.quiz1 : false}
              quiz2={client ? client.quiz2 : false}
              quiz3={client ? client.quiz3 : false}
              quiz4={client ? client.quiz4 : false}
              quiz5={client ? client.quiz5 : false}
              quiz6={client ? client.quiz6 : false}
              quiz7={client ? client.quiz7 : false}
              quiz8={client ? client.quiz8 : false}
              quiz9={client ? client.quiz9 : false}
              quiz10={client ? client.quiz10 : false}
              quiz11={client ? client.quiz11 : false}
              clickTakeQuiz={this._clickTakeQuiz}
              showLessonDetail={this._showLessonDetail}
              timestamp={this.state.client ? this.state.client : null} />)}
            </View>
        </ScrollView>}

        {this.state.showLessonDetail &&
          <LessonDetail
            lessonNumber={this.state.selectedLesson}
            timestamp={this.props.timestamp}
            showLessonDetail={this._showLessonDetail}
            clickTakeQuiz={this._clickTakeQuiz} />}

        {this.state.showQuiz &&
          <LessonQuiz
            lesson={this.state.selectedLessonNumber}
            question1Selection={this.state.question1Selection}
            question2Selection={this.state.question2Selection}
            question3Selection={this.state.question3Selection}
            question4Selection={this.state.question4Selection}
            question5Selection={this.state.question5Selection}
            selectAnswer={this._selectAnswer}
            checkQuizAnswers={this._checkQuizAnswers}
            quiz1={client ? client.quiz1 : false}
            quiz2={client ? client.quiz2 : false}
            quiz3={client ? client.quiz3 : false}
            quiz4={client ? client.quiz4 : false}
            quiz5={client ? client.quiz5 : false}
            quiz6={client ? client.quiz6 : false}
            quiz7={client ? client.quiz7 : false}
            quiz8={client ? client.quiz8 : false}
            quiz9={client ? client.quiz9 : false}
            quiz10={client ? client.quiz1 : false}
            quizPassed={this.state.quizPassed}
            closeQuiz={this._closeQuiz} />}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  body: {
    paddingBottom: 30
  },
  content: {
    padding: 0
  }
});
