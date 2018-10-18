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

// import ModalWindow from '../components/ModalWindow';

class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const lessonNumber = this.props.lessonNumber;
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
       <View style={[styles.lessonWrapper, isCompleted ? styles.completed : null]}>

       {isCompleted &&
        <Text style={[Styles.textCenter, styles.checkmark]}>
          <FontAwesome
            name='check'
            size={48} />
        </Text>}

        <Text style={[Styles.textCenter, styles.lessonNumber, isCompleted ? styles.lessonNumberCompleted : null]}>Lesson {lessonNumber}</Text>

        <View style={styles.lessonButtons}>
          <TouchableHighlight
            style={[Styles.button, isCompleted ? Styles.buttonInverted : null, styles.viewLessonButton]}
            underlayColor={Colors.white}
            onPress={() => Linking.openURL('http://adaptivenutrition.us/lesson' + this.props.lessonNumber)}>
            <Text style={[Styles.buttonText, styles.lessonText, isCompleted ? styles.lessonTextCompleted : null, isCompleted ? Styles.buttonInvertedText : null]}>View lesson</Text>
          </TouchableHighlight>

           <TouchableHighlight
             style={[Styles.button, isCompleted ? Styles.buttonInverted : null, ]}
             underlayColor={Colors.white}
             onPress={() => { this.props.clickTakeQuiz(lessonNumber, this.props.timestamp) }}>
             <Text style={[Styles.buttonText, styles.lessonText, isCompleted ? styles.lessonTextCompleted : null, isCompleted ? Styles.buttonInvertedText : null]}>Take quiz</Text>
           </TouchableHighlight>
          </View>
       </View>
     );
   }
}

export default Lesson;

Lesson.propTypes = {
};

const styles = StyleSheet.create ({
  completed: {
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
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
    borderWidth: 2,
    borderColor: Colors.paleGreen,
    marginBottom: 20,
    padding: 30,
    borderRadius: 3
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
