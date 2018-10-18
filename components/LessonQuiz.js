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
    const lessonNumber = this.props.lesson;
    let title = null;
    let questions = [];
    let quizPassed = false;

    if(lessonNumber) {
      if(lessonNumber === 1) { questions = quizzes.quizzes.lesson1.questions; title = quizzes.quizzes.lesson1.name; }
      else if(lessonNumber === 2) { questions = quizzes.quizzes.lesson2.questions; title = quizzes.quizzes.lesson2.name; }
      else if(lessonNumber === 3) { questions = quizzes.quizzes.lesson3.questions; title = quizzes.quizzes.lesson3.name; }
      else if(lessonNumber === 4) { questions = quizzes.quizzes.lesson4.questions; title = quizzes.quizzes.lesson4.name; }
      else if(lessonNumber === 5) { questions = quizzes.quizzes.lesson5.questions; title = quizzes.quizzes.lesson5.name; }
      else if(lessonNumber === 6) { questions = quizzes.quizzes.lesson6.questions; title = quizzes.quizzes.lesson6.name; }
      else if(lessonNumber === 7) { questions = quizzes.quizzes.lesson7.questions; title = quizzes.quizzes.lesson7.name; }
      else if(lessonNumber === 8) { questions = quizzes.quizzes.lesson8.questions; title = quizzes.quizzes.lesson8.name; }
      else if(lessonNumber === 9) { questions = quizzes.quizzes.lesson9.questions; title = quizzes.quizzes.lesson9.name; }
      else if(lessonNumber === 10) { questions = quizzes.quizzes.lesson10.questions; title = quizzes.quizzes.lesson10.name; }
    }

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
       quizPassed = true;
     }

    return (
      <Swiper
          style={styles.wrapper}
          showsButtons={true}
          loop={false}
          index={0}>

          <View style={styles.slide}>
            <TouchableHighlight
              underlayColor={Colors.paleGreen}
              onPress={this.props.closeQuiz}>
              <FontAwesome
                style={[Styles.textCenter, Styles.tooltipClose]}
                name='remove'
                size={28}
              />
            </TouchableHighlight>

            <Text style={[Styles.bigTitle, Styles.pageTitle]}>Quiz {this.props.lesson}</Text>
            <Text style={Styles.paragraphText}>{title}</Text>
          </View>

          <View style={styles.slide}>
            <QuizQuestion
              key={0}
              quizPassed={quizPassed}
              questionNumber={1}
              question={questions[0]}
              question1Selection={this.props.question1Selection}
              question2Selection={this.props.question2Selection}
              question3Selection={this.props.question3Selection}
              question4Selection={this.props.question4Selection}
              question5Selection={this.props.question5Selection}
              selectAnswer={this.props.selectAnswer} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion
              key={1}
              quizPassed={quizPassed}
              questionNumber={2}
              question={questions[1]}
              question1Selection={this.props.question1Selection}
              question2Selection={this.props.question2Selection}
              question3Selection={this.props.question3Selection}
              question4Selection={this.props.question4Selection}
              question5Selection={this.props.question5Selection}
              selectAnswer={this.props.selectAnswer} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion
              key={2}
              quizPassed={quizPassed}
              questionNumber={3}
              question={questions[2]}
              question1Selection={this.props.question1Selection}
              question2Selection={this.props.question2Selection}
              question3Selection={this.props.question3Selection}
              question4Selection={this.props.question4Selection}
              question5Selection={this.props.question5Selection}
              selectAnswer={this.props.selectAnswer} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion
              key={3}
              quizPassed={quizPassed}
              questionNumber={4}
              question={questions[3]}
              question1Selection={this.props.question1Selection}
              question2Selection={this.props.question2Selection}
              question3Selection={this.props.question3Selection}
              question4Selection={this.props.question4Selection}
              question5Selection={this.props.question5Selection}
              selectAnswer={this.props.selectAnswer} />
          </View>

          <View style={styles.slide}>
            <QuizQuestion
              key={4}
              quizPassed={quizPassed}
              questionNumber={5}
              question={questions[4]}
              question1Selection={this.props.question1Selection}
              question2Selection={this.props.question2Selection}
              question3Selection={this.props.question3Selection}
              question4Selection={this.props.question4Selection}
              question5Selection={this.props.question5Selection}
              selectAnswer={this.props.selectAnswer} />
          </View>

          <View style={styles.slide}>
            {!quizPassed && <TouchableHighlight
              style={Styles.button}
              underlayColor={Colors.darkerPrimaryColor}
              onPress={this.props.checkQuizAnswers}>
              <Text style={Styles.buttonText}>Check my answers</Text>
            </TouchableHighlight>}

            {quizPassed &&
              <View>
                <TouchableHighlight
                  underlayColor={Colors.paleGreen}
                  onPress={this.props.closeQuiz}>
                  <FontAwesome
                    style={[Styles.textCenter, Styles.tooltipClose]}
                    name='remove'
                    size={28}
                  />
                </TouchableHighlight>
                <View style={styles.congratsMessage}>
                  <Text style={styles.congratsMessageText}>Great job!</Text>
                  <Text style={styles.congratsMessageText}>+3 points</Text>
                </View>
              </View>}
          </View>
        </Swiper>
    );
  }
};

export default LessonQuiz;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.paleGreen,
    padding: 40
  },
  congratsMessageText: {
    fontFamily: 'Futura-Medium',
    textAlign: 'center',
    fontSize: 36,
    letterSpacing: 1
  }
});
