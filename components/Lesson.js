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

import * as quizzes from '../constants/Quizzes';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLessonDetail: false
    };
  }

  render() {
    const lessonNumber = this.props.lessonNumber;
    let lessonName = quizzes.quizzes['lesson' + lessonNumber].name;
    let isCompleted = false;

    if((lessonNumber === 1 && this.props.quiz1) ||
     (lessonNumber === 2 && this.props.quiz2) ||
     (lessonNumber === 3 && this.props.quiz3) ||
     (lessonNumber === 4 && this.props.quiz4) ||
     (lessonNumber === 5 && this.props.quiz5) ||
     (lessonNumber === 6 && this.props.quiz6) ||
     (lessonNumber === 7 && this.props.quiz7) ||
     (lessonNumber === 8 && this.props.quiz8) ||
     (lessonNumber === 9 && this.props.quiz9) ||
     (lessonNumber === 10 && this.props.quiz10)) {
       isCompleted = true;
     }

    return (
       <TouchableHighlight
        style={[styles.lessonWrapper, isCompleted ? styles.completed : null]}
        onPress={() => this.props.showLessonDetail(true, lessonNumber)}>

       <View>
         {isCompleted &&
          <Text style={[Styles.textCenter, styles.checkmark]}>
            <FontAwesome
              name='check'
              size={48} />
          </Text>}

          <Text style={[styles.lessonNumber, isCompleted ? styles.lessonNumberCompleted : null]}>{lessonNumber} {lessonName}</Text>
        </View>
       </TouchableHighlight>
     );
   }
}

export default Lesson;

Lesson.propTypes = {
};

const styles = StyleSheet.create ({
  completed: {
    backgroundColor: Colors.primaryColor
  },
  lessonNumberCompleted: {
    color: Colors.white
  },
  lessonTextCompleted: {
    color: Colors.white
  },
  checkmark: {
    color: Colors.white,
    marginBottom: 10
  },
  lessonWrapper: {
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 2,
    borderColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 100,
    margin: 15,
    marginTop: 0
  },
  lessonNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10
  },
  lessonButtons: {
    marginTop: 15
  },
  viewLessonButton: {
    marginBottom: 10
  }
});
