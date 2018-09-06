import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import QuizQuestion from '../../components/QuizQuestion';
import * as quizzes from '../../constants/Quizzes';

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
    title: 'Quiz',
  };

  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const { params } = this.props.navigation.state;
    const timestamp = params ? params.timestamp : null;
    const lessonNumber = params ? params.lessonNumber : null;
    let questions = [];

    if(lessonNumber) {
      if(lessonNumber === 1) { questions = quizzes.quizzes.lesson1.questions; }
      else if(lessonNumber === 2) { questions = quizzes.quizzes.lesson2.questions; }
      else if(lessonNumber === 3) { questions = quizzes.quizzes.lesson3.questions; }
      else if(lessonNumber === 4) { questions = quizzes.quizzes.lesson4.questions; }
      else if(lessonNumber === 5) { questions = quizzes.quizzes.lesson5.questions; }
      else if(lessonNumber === 6) { questions = quizzes.quizzes.lesson6.questions; }
      else if(lessonNumber === 7) { questions = quizzes.quizzes.lesson7.questions; }
      else if(lessonNumber === 8) { questions = quizzes.quizzes.lesson8.questions; }
      else if(lessonNumber === 9) { questions = quizzes.quizzes.lesson9.questions; }
      else if(lessonNumber === 10) { questions = quizzes.quizzes.lesson10.questions; }
    }

    return (
      <View style={Styles.body}>
        <Header />

        <ScrollView style={Styles.content}>
          <Text style={[Styles.bigTitle, Styles.pageTitle]}>Quiz</Text>
          <Text style={Styles.pageSubTitle}>Lesson {lessonNumber}</Text>

          <View style={styles.quizWrapper}>
            {questions.map((lesson, i) => <QuizQuestion
              key={i}
              question={questions[i]}
              timestamp={timestamp} />)}
          </View>

          <View style={styles.quizButtonsWrapper}>
            <TouchableHighlight
              style={Styles.button}
              underlayColor={Colors.darkerPrimaryColor}>
              <Text style={Styles.buttonText}>Check my answers</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={Styles.buttonInverted}
              underlayColor={Colors.darkerPrimaryColor}
              onPress={() => navigate('Education')}>
              <Text style={Styles.buttonInvertedText}>Go back to lessons</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  quizWrapper: {
    marginBottom: 40
  },
  quizButtonsWrapper: {
    marginBottom: 40
  }
});
