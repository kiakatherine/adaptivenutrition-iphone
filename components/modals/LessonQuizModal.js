import React from 'react';

// import ModalWrapper from '../ModalWrapper.jsx';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

import QuizQuestion from '../../components/QuizQuestion';
import * as quizzes from '../../constants/Quizzes';

import {
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class LessonQuizModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    const lesson = this.props.lesson;
    let questions = [];

    if(lesson) {
      if(lesson === 1) { questions = quizzes.quizzes.lesson1.questions; }
      else if(lesson === 2) { questions = quizzes.quizzes.lesson2.questions; }
      else if(lesson === 3) { questions = quizzes.quizzes.lesson3.questions; }
      else if(lesson === 4) { questions = quizzes.quizzes.lesson4.questions; }
      else if(lesson === 5) { questions = quizzes.quizzes.lesson5.questions; }
      else if(lesson === 6) { questions = quizzes.quizzes.lesson6.questions; }
      else if(lesson === 7) { questions = quizzes.quizzes.lesson7.questions; }
      else if(lesson === 8) { questions = quizzes.quizzes.lesson8.questions; }
      else if(lesson === 9) { questions = quizzes.quizzes.lesson9.questions; }
      else if(lesson === 10) { questions = quizzes.quizzes.lesson10.questions; }
    }

    return (
      <View style={Styles.modalContent}>
        <Text style={[Styles.bigTitle, Styles.pageTitle]}>Quiz {this.props.lesson}</Text>

        <View style={styles.quizWrapper}>
          {questions.map((lesson, i) => <QuizQuestion
            key={i}
            question={questions[i]} />)}
        </View>

        <View style={styles.quizButtonsWrapper}>
          <TouchableHighlight
            style={Styles.button}
            underlayColor={Colors.darkerPrimaryColor}>
            <Text style={Styles.buttonText}>Check my answers</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[Styles.button, Styles.buttonInverted, styles.goBackButton]}
            underlayColor={Colors.darkerPrimaryColor}
            onPress={() => navigate('Education')}>
            <Text style={[Styles.buttonText, Styles.buttonInvertedText]}>Go back to lessons</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};

export default LessonQuizModal;

const styles = StyleSheet.create({
  quizWrapper: {
    marginTop: 20,
    marginBottom: 20
  },
  quizButtonsWrapper: {
    marginBottom: 40
  },
  goBackButton: {
    marginTop: 10
  }
});
