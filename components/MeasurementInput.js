import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Image,
  Keyboard,
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

class MeasurementInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measurement: null
    };
  }

   render() {
     return (
       <View style={styles.measurementInputWrapper}>
         <TextInput
           style={styles.measurementInput}
           unit={this.props.unit}
           value={this.props.value ? this.props.value : this.state.measurement}
           onChangeText={value => { this.props.updateMeasurement(this.props.currentMeal, this.props.macro, value)}}
           keyboardType={'numeric'}
         />
       </View>
     );
   }
}

export default MeasurementInput;

MeasurementInput.propTypes = {
};

const styles = StyleSheet.create ({
  measurementInput: {
    backgroundColor: Colors.lightGray,
    width: 50,
    height: 20
  }
});
