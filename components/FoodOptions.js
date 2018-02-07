import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
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

import Styles from '../constants/Styles';

import { createFoodMenu } from '../utils/helpers';

class FoodOptions extends React.Component {
   state = {
     selected: false
   }

   clickPrevious() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const sources = this.props.sources;
     const selection = this.props.selection; //need
     const isBedtimeMeal = this.props.bedtime;
     const isPwoShake = this.props.pwo;
     const options = createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake);
     const newSelection = options[options.indexOf(selection) - 1];

     if(options.indexOf(selection) <= 0 || selection === null) {
       this.setSelection(phase, macro, options[options.length-1], currentMeal);
     } else if(newSelection) {
       this.setState({
         selection: options.indexOf(newSelection) === -1 ? options[0] : newSelection
       });
       this.setSelection(phase, macro, newSelection, currentMeal);
     } else {
       this.setSelection(phase, macro, options[options.length-1], currentMeal);
     }
   }

   clickNext() {

   }

   setSelection() {
     alert('set selection!');
   }

   render() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const sources = this.props.sources;
     const selection = this.props.selection; //need
     const isBedtimeMeal = this.props.bedtime;
     const isPwoShake = this.props.pwo;
     const options = createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake);

     return (
       <View style={styles.foodOptionsWrapper}>
         <TouchableHighlight onPress={() => {this.clickPrevious()}}>
           <FontAwesome
             name='chevron-left'
             size={16}
           />
         </TouchableHighlight>

         <Text style={styles.content}>{selection ? selection : options[0]}</Text>

         <TouchableHighlight onPress={() => {this.clickNext()}}>
           <FontAwesome
             name='chevron-right'
             size={16}
           />
         </TouchableHighlight>
       </View>
     );
   }
}

export default FoodOptions;

const styles = StyleSheet.create ({
   foodOptionsWrapper: {
     alignSelf: 'stretch',
     alignItems: 'flex-start',
     flexDirection: 'row'
   },
   content: {
     paddingLeft: 20,
     paddingRight: 20
   }
});
