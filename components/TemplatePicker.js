import React from 'react';
import Swiper from 'react-native-swiper';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

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
    const template = this.props.template;
    console.log('template', template)

    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        loop={false}
        index={0}>

        <View style={styles.slide}>
          <TouchableHighlight
            underlayColor={Colors.paleGreen}
            onPress={this.props.closeTemplatePicker}>
            <FontAwesome
              style={[Styles.textCenter, Styles.tooltipClose]}
              name='remove'
              size={28}
            />
          </TouchableHighlight>

          <Text style={Styles.paragraphText}>Step 1</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle]}>Home</Text>
          <Text style={Styles.paragraphText}>Minimum of 1 week</Text>
          <Text style={Styles.paragraphText}>[ purpose ]</Text>
          {template !== 0 && <TouchableHighlight
            underlayColor={Colors.paleGreen}
            onPress={this.props.closeQuiz}>
            <Text>Select</Text>
          </TouchableHighlight>}
        </View>

        <View style={styles.slide}>
          <Text style={Styles.paragraphText}>Step 2</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle]}>Lose weight</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle]}>Build lean muscle</Text>
          <Text style={Styles.paragraphText}>8-10 weeks</Text>
          <Text style={Styles.paragraphText}>[ purpose ]</Text>
          {template !== 1 && template !== 2 && <TouchableHighlight
            underlayColor={Colors.paleGreen}
            onPress={this.props.closeQuiz}>
            <Text>Select</Text>
          </TouchableHighlight>}
        </View>

        <View style={[styles.slide, template === 0 ? styles.slideDisabled : null]}>
          {template === 0 &&
            <FontAwesome
              style={styles.textDisabled}
              name="lock"
              size={28} />}
          <Text style={[Styles.paragraphText, template === 0 ? styles.textDisabled : null]}>Step 3</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle, template === 0 ? styles.textDisabled : null]}>Lock in results</Text>
          <Text style={[Styles.paragraphText, template === 0 ? styles.textDisabled : null]}>2 weeks</Text>
          <Text style={[Styles.paragraphText, template === 0 ? styles.textDisabled : null]}>[ purpose ]</Text>
          {template !== 0 && template !== 3 && <TouchableHighlight
            underlayColor={Colors.paleGreen}
            onPress={this.props.closeQuiz}>
            <Text>Select</Text>
          </TouchableHighlight>}
        </View>

        <View style={[styles.slide, template < 3 ? styles.slideDisabled : null]}>
          {template < 3 &&
            <FontAwesome
              style={styles.textDisabled}
              name="lock"
              size={28} />}
          <Text style={[Styles.paragraphText, template < 3 ? styles.textDisabled : null]}>Step 4</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle, template < 3 ? styles.textDisabled : null]}>Lock in results</Text>
          <Text style={[Styles.paragraphText, template < 3 ? styles.textDisabled : null]}>2 weeks</Text>
          <Text style={[Styles.paragraphText, template < 3 ? styles.textDisabled : null]}>[ purpose ]</Text>
          {template === 3 && <TouchableHighlight
            underlayColor={Colors.paleGreen}
            onPress={this.props.closeQuiz}>
            <Text>Select</Text>
          </TouchableHighlight>}
        </View>

        <View style={[styles.slide, template < 4 ? styles.slideDisabled : null]}>
          {template < 4 &&
            <FontAwesome
              style={styles.textDisabled}
              name="lock"
              size={28} />}
            <Text style={[Styles.paragraphText, template < 4 ? styles.textDisabled : null]}>Step 5</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle, template < 4 ? styles.textDisabled : null]}>New home</Text>
          <Text style={[Styles.paragraphText, template < 4 ? styles.textDisabled : null]}>Minimum of 4 weeks</Text>
          <Text style={[Styles.paragraphText, template < 4 ? styles.textDisabled : null]}>[ purpose ]</Text>
          {template === 4 && <TouchableHighlight
            underlayColor={Colors.paleGreen}
            onPress={this.props.closeQuiz}>
            <Text>Select</Text>
          </TouchableHighlight>}
        </View>

        <View style={[styles.slide, template < 5 ? styles.slideDisabled : null]}>
          {template < 5 &&
            <FontAwesome
              style={styles.textDisabled}
              name="lock"
              size={28} />}
            <Text style={[Styles.paragraphText, template < 5 ? styles.textDisabled : null]}>Next</Text>
          <Text style={[Styles.bigTitle, Styles.pageTitle, template < 5 ? styles.textDisabled : null]}>Step</Text>
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
  },
  slideDisabled: {
    backgroundColor: Colors.lightGray
  },
  textDisabled: {
    color: Colors.darkGray
  }
});
