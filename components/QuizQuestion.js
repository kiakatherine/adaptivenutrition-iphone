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

   render() {
     const question = this.props.question.question;
     const answers = this.props.question.answers;

     return (
       <View style={styles.quizQuestionWrapper}>
        <Text style={styles.quizQuestionText}>{question}</Text>

        {answers.map((answer, i) =>
          <Text style={styles.quizAnswerText} key={i}>{answer.answer}</Text>)}
       </View>
     );
   }
}

export default QuizQuestion;

QuizQuestion.propTypes = {
};

const styles = StyleSheet.create ({
  quizQuestionWrapper: {
    marginBottom: 40
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
