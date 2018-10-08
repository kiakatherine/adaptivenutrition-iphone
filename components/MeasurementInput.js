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

    let defaultSetting = 0;

    // set defaults
    if(this.props.macro === 'protein' || this.props.macro === 'fats') {
      defaultSetting = 3;
    } else {
      defaultSetting = 1
    }

    this.state = {
      measurementInput: props.value ? props.value : defaultSetting
    };
  }

  decreaseMeasurement(measurement) {
    let updatedInput = measurement;

    if(this.props.macro === 'protein') {
      updatedInput = (Number(measurement) - 0.1).toFixed(1);
    } else if(this.props.macro === 'carbs') {
      updatedInput = (Number(measurement) - 0.25).toFixed(2);
    } else if(this.props.macro === 'fats') {
      updatedInput = (Number(measurement) - 1).toFixed(0);
    } else if(this.props.macro === 'veggies') {
      updatedInput = (Number(measurement) - 1).toFixed(0);
    }
    this.setState({ measurementInput: updatedInput > 0 ? updatedInput : 0 });
  }

  increaseMeasurement(measurement) {
    let updatedInput = measurement;

    if(this.props.macro === 'protein') {
      updatedInput = (Number(measurement) + 0.1).toFixed(1);
    } else if(this.props.macro === 'carbs') {
      updatedInput = (Number(measurement) + 0.25).toFixed(2);
    } else if(this.props.macro === 'fats') {
      updatedInput = (Number(measurement) + 1).toFixed(0);
    } else if(this.props.macro === 'veggies') {
      updatedInput = (Number(measurement) + 1).toFixed(0);
    }
    this.setState({ measurementInput: updatedInput > 0 ? updatedInput : 0 });
  }

   render() {
     const label = this.props.macro === 'protein' ? 'ounces' :
      this.props.macro === 'fats' ? 'tsp' : 'cups';

     return (
       <View>
       {/*<View style={styles.measurementInputWrapper}>
         <TextInput
           style={styles.measurementInput}
           unit={this.props.unit}
           value={this.props.value ? this.props.value : this.state.measurement}
           onChangeText={value => { this.props.updateMeasurement(this.props.currentMeal, this.props.macro, value)}}
           keyboardType={'numeric'}
         />
       </View>*/}
         <View style={Styles.flexRow}>
           <TouchableHighlight
             style={Styles.buttonCircularInverted}
             underlayColor={Colors.white}
             onPress={() => this.decreaseMeasurement(this.state.measurementInput) }>
             <Text style={Styles.buttonCircularInvertedText}>
               <FontAwesome
                 name='minus'
                 size={16}
               />
             </Text>
           </TouchableHighlight>

          <Text style={styles.measurementInput}>{this.state.measurementInput} {label}</Text>

           <TouchableHighlight
             style={Styles.buttonCircularInverted}
             underlayColor={Colors.white}
             onPress={() => this.increaseMeasurement(this.state.measurementInput) }>
             <Text style={Styles.buttonCircularInvertedText}>
               <FontAwesome
                 name='plus'
                 size={16}
               />
             </Text>
           </TouchableHighlight>
         </View>
      </View>
     );
   }
}

export default MeasurementInput;

MeasurementInput.propTypes = {
};

const styles = StyleSheet.create ({
  measurementInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 13
  },
});
