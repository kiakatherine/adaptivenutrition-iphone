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
      <View>
        {lessonNumber === 1 ? <Text style={[Styles.uppercaseText, styles.weekHeader]}>WEEK 1</Text> :
         lessonNumber === 3 ? <Text style={[Styles.uppercaseText, styles.weekHeader]}>WEEK 2</Text> :
         lessonNumber === 5 ? <Text style={[Styles.uppercaseText, styles.weekHeader]}>WEEK 3</Text> :
         lessonNumber === 7 ? <Text style={[Styles.uppercaseText, styles.weekHeader]}>WEEK 4</Text> :
         lessonNumber === 9 ? <Text style={[Styles.uppercaseText, styles.weekHeader]}>WEEK 5</Text> :
         lessonNumber === 11 ? <Text style={[Styles.uppercaseText, styles.weekHeader]}>WEEK 6</Text> : null}

        <TouchableHighlight
          underlayColor={Colors.lightGray}
          style={[styles.lessonWrapper, isCompleted ? styles.completed : null]}
          onPress={() => this.props.showLessonDetail(true, lessonNumber)}>

         <View style={Styles.flexRow}>
            <Text style={[Styles.flexCol, styles.lessonNumber, isCompleted ? styles.lessonNumberCompleted : null]}>{lessonName}</Text>

            {isCompleted &&
             <Text style={styles.checkmark}>
               <FontAwesome
                 name='check'
                 size={24} />
             </Text>}
          </View>
        </TouchableHighlight>
      </View>
     );
   }
}

export default Lesson;

Lesson.propTypes = {
  lessonNumber: PropTypes.number,
  quiz1: PropTypes.bool,
  quiz2: PropTypes.bool,
  quiz3: PropTypes.bool,
  quiz4: PropTypes.bool,
  quiz5: PropTypes.bool,
  quiz6: PropTypes.bool,
  quiz7: PropTypes.bool,
  quiz8: PropTypes.bool,
  quiz9: PropTypes.bool,
  quiz10: PropTypes.bool,
  quiz11: PropTypes.bool,
  clickTakeQuiz: PropTypes.func,
  showLessonDetail: PropTypes.func,
  timestamp: PropTypes.object
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
    color: Colors.white
  },
  weekHeader: {
    marginLeft: 40,
    marginBottom: 15,
    marginTop: 30,
    fontWeight: 'bold'
  },
  lessonWrapper: {
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 2,
    borderColor: Colors.white,
    padding: 25,
    borderRadius: 10,
    margin: 15,
    marginTop: 0
  },
  lessonNumber: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '500',
    color: Colors.black
  },
  lessonButtons: {
    marginTop: 15
  },
  viewLessonButton: {
    marginBottom: 10
  }
});
