import React from 'react';

// import ModalWrapper from '../ModalWrapper.jsx';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

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

class LessonQuizModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={styles.h1}>Quiz {this.props.lesson}</Text>

      </View>
    );
  }
};

export default LessonQuizModal;

const styles = StyleSheet.create({ });
