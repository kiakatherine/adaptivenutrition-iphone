import React from 'react';
import Swiper from 'react-native-swiper';
// import ModalWrapper from '../ModalWrapper.jsx';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

import QuizQuestion from '../components/QuizQuestion';
import * as quizzes from '../constants/Quizzes';

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

class LessonQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showSwiper: false };
  }

  componentDidMount() {
    // Must use this 100-ms delayed swiper workaround to render on Android properly
    setTimeout(() => {
      this.setState({ showSwiper: true });
    }, 100);
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
      <View>
        {this.state.showSwiper && <Swiper
          style={styles.wrapper}
          showsButtons={true}
          loop={false}
          index={1}>

          <View style={styles.slide}>
            <TouchableHighlight
              underlayColor={Colors.paleGreen}
              onPress={this.props.closeQuiz}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={24}
              />
            </TouchableHighlight>

            <Text style={[Styles.bigTitle, Styles.pageTitle]}>Quiz {this.props.lesson}</Text>
            <Text style={Styles.paragraphText}>Title</Text>
          </View>

          <View style={styles.slide}>
            <QuizQuestion key={0} question={questions[0]} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion key={1} question={questions[1]} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion key={2} question={questions[2]} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion key={3} question={questions[3]} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion key={4} question={questions[4]} />
          </View>

          <View style={styles.slide}>
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
        </Swiper>}
      </View>
    );
  }
};

export default LessonQuiz;

const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.paleGreen,
    padding: 40
  },
  goBackButton: {
    marginTop: 10
  }
});
