import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Image,
  Keyboard,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

class QuizQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  selectAnswer(questionNumber, isCorrect, index) {
    this.props.selectAnswer(questionNumber, isCorrect, index);
  }

   render() {
     const question = this.props.question.question;
     const answers = this.props.question.answers;
     const questionNumber = this.props.questionNumber;

     return (
       <View style={styles.quizQuestionWrapper}>
        <Text style={styles.quizQuestionText}>{question}</Text>

        {answers.map((answer, i) =>
          <TouchableHighlight
            style={[styles.quizAnswerButton,
              (questionNumber === 1 && this.props.question1Selection === i) ? styles.selected :
              (questionNumber === 2 && this.props.question2Selection === i) ? styles.selected :
              (questionNumber === 3 && this.props.question3Selection === i) ? styles.selected :
              (questionNumber === 4 && this.props.question4Selection === i) ? styles.selected :
              (questionNumber === 5 && this.props.question5Selection === i) ? styles.selected : null]}
            underlayColor={Colors.paleGreen}
            key={i}
            onPress={() => this.selectAnswer(questionNumber, answer.isCorrect, i)}>
            <Text style={styles.quizAnswerText}>{answer.answer}</Text>
          </TouchableHighlight>)}
       </View>
     );
   }
}

export default QuizQuestion;

QuizQuestion.propTypes = {
};

const styles = StyleSheet.create ({
  quizQuestionWrapper: {
    paddingLeft: 30,
    paddingRight: 30
  },
  quizQuestionText: {
    fontFamily: 'Futura-Medium',
    fontSize: 24,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  quizAnswerButton: {
    padding: 15
  },
  quizAnswerText: {
    fontSize: 24
  },
  selected: {
    backgroundColor: Colors.white,
    borderRadius: 3
  },
  lessonWrapper: {
    marginBottom: 20
  },
  lessonText: {
    fontSize: 20,
    color: Colors.black
  }
});
