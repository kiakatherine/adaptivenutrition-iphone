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
    this.state = { };
  }

  selectAnswer(questionNumber, isCorrect) {
    this.props.selectAnswer(questionNumber, isCorrect);
  }

   render() {
     const question = this.props.question.question;
     const answers = this.props.question.answers;

     return (
       <View style={styles.quizQuestionWrapper}>
        <Text style={styles.quizQuestionText}>{question}</Text>

        {answers.map((answer, i) =>
          <TouchableHighlight
            underlayColor={Colors.paleGreen}
            key={i}
            onPress={() => this.selectAnswer(this.props.questionNumber, answer.isCorrect)}>
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
    fontSize: 20,
    marginBottom: 15
  },
  quizAnswerText: {
    fontSize: 20
  },
  lessonWrapper: {
    marginBottom: 20
  },
  lessonText: {
    fontSize: 20,
    color: Colors.black
  }
});
