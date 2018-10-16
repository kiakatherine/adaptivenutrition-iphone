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
    this.state = {
      // showQuiz: false
    };

    // this._clickTakeQuiz = this._clickTakeQuiz.bind(this);
    // this._closeModal = this._closeModal.bind(this);
  }

  // _clickTakeQuiz(lessonNumber, timestamp) {
  //   this.setState({ showQuiz: true });
  // }

  // _closeModal() {
  //   this.setState({ showQuiz: false });
  // }

   render() {
     const lessonNumber = this.props.lessonNumber;

     return (
       <View>
         <Text style={Styles.menuItem}>Lesson {lessonNumber}</Text>

         <View>
           <TouchableHighlight
             style={styles.optionTooltip}
             underlayColor={Colors.white}
             onPress={() => Linking.openURL('http://adaptivenutrition.us/lesson' + this.props.lessonNumber)}>
             <Text style={styles.lessonText}>View lesson</Text>
           </TouchableHighlight>

           <TouchableHighlight
             style={styles.optionTooltip}
             underlayColor={Colors.white}
             onPress={() => { this.props.clickTakeQuiz(lessonNumber, this.props.timestamp) }}>
             <Text style={styles.lessonText}>Take quiz</Text>
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
  lessonWrapper: {
    marginBottom: 20
  },
  lessonText: {
    fontSize: 20,
    color: Colors.black
  }
});
