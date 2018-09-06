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
       <View>
        <Text>{question}</Text>

        {answers.map((answer, i) =>
          <Text key={i}>{answer.answer}</Text>)}
       </View>
     );
   }
}

export default QuizQuestion;

QuizQuestion.propTypes = {
};

const styles = StyleSheet.create ({
  lessonWrapper: {
    marginBottom: 20
  },
  lessonText: {
    fontSize: 20,
    color: Colors.black
  }
});
