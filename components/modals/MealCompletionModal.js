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

class MealCompletionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedTemplate1: false,
      checkedTemplate2: false,
      checkedTemplate3: false,
      checkedTemplate4: false,
      checkedTemplate5: false,
      checkedTemplate6: false
    };
  }

  completeMeal(completion) {
    // 1 = complete; 2 = incomplete
    this.props.completeMeal(completion);
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={styles.h1}>{this.props.date}</Text>
        <Text style={styles.h1}>Meal {this.props.mealNumber}</Text>

        {this.state.showError &&
          <Text>{"Make sure everything's filled out!"}</Text>}

        <TouchableHighlight
          style={[Styles.button, styles.completeButton]}
          underlayColor={Colors.white}
          onPress={() => { this.completeMeal(1) }}>
          <Text style={styles.completeButtonText}>
            <FontAwesome
              name='check'
              size={16}
            />
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[Styles.button, styles.incompleteButton]}
          underlayColor={Colors.white}
          onPress={() => { this.completeMeal(2) }}>
          <Text style={styles.incompleteButtonText}>
            <FontAwesome
              name='remove'
              size={16}
            />
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default MealCompletionModal;

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    color: Colors.primaryColor,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    fontSize: 24
  },
  completeButton: {
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10
  },
  completeButtonText: {
    color: Colors.white,
    textAlign: 'center'
  },
  incompleteButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.paleRed,
    borderRadius: 100,
    borderWidth: 2
  },
  incompleteButtonText: {
    color: Colors.paleRed,
    textAlign: 'center'
  }
});
