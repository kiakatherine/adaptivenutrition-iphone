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
     selection: this.props.selection || null
   }

   clickPrevious() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const sources = this.props.sources;
     const isBedtimeMeal = this.props.bedtime;
     const isPwoShake = this.props.pwo;
     const options = createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake);
     const selection = this.props.selection || this.state.selection || options[0]; //need
     const newSelection = options[options.indexOf(selection) - 1];
     const string = 'phase' + (phase === 3 ? 3 : 1) + macro + currentMeal;

     if(options.indexOf(selection) <= 0 || selection === null) {
       // this.setState({ [string]: newSelection }); --- change to set to client, not state
       this.setState({ selection: options[options.length-1] });
     } else if(newSelection) {
       // this.setState({ [string]: newSelection }); --- change to set to client, not state
       this.setState({ selection: options.indexOf(newSelection) === -1 ? options[0] : newSelection });
     }
   }

   clickNext() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const sources = this.props.sources;
     const isBedtimeMeal = this.props.bedtime;
     const isPwoShake = this.props.pwo;
     const options = createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake);
     const selection = this.props.selection || this.state.selection || options[0]; //need
     const newSelection = options[options.indexOf(selection) + 1];
     const string = 'phase' + (phase === 3 ? 3 : 1) + macro + currentMeal;

     if(newSelection) {
       // this.setState({ [string]: newSelection }); --- change to set to client, not state
       this.setState({ selection: newSelection });
     } else {
       // this.setState({ [string]: newSelection }); --- change to set to client, not state
       this.setState({ selection: options[0] });
     }
   }

   render() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const sources = this.props.sources;
     const selection = this.state.selection;
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
