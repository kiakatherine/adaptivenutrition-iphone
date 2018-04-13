import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Keyboard,
  Modal,
  Picker,
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

import { createFoodMenu } from '../utils/helpers';

class FoodOptions extends React.Component {
   state = {
     selection: this.props.selection || null
   }

   clickPrevious() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const template = this.props.template;
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
     const template = this.props.template;
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

   setSelection(itemValue) {
     this.setState({ selection: itemValue });
   }

   render() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const template = this.props.template;
     const showInGrams = this.props.showInGrams;
     const sources = this.props.sources;
     const selection = this.state.selection;
     const isBedtimeMeal = this.props.bedtime;
     const isPwoShake = this.props.pwo;
     let hidePwoShakeArrows = false;

     let options = createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake);

     let content = null;
     const currMeal = Number(currentMeal) + 1;
     const string = macro + currMeal;

     if(Number.isInteger(currMeal)) {
       if(selection) {
         content = selection;
       } else if(isPwoShake) {
         hidePwoShakeArrows = (macro === 'fats' || macro === 'veggies') ? true : false;
         content = sources[string + 'Grams'] + ' of whey protein';
       } else if(showInGrams) {
         content = sources[string + 'Grams'];
       }
     }

     let optionsHtml = [];
     options.forEach((opt, i) => {
       optionsHtml.push(<Picker.Item label={opt} value={opt} key={i} />)
     });

     return (
       <View>
         {!showInGrams &&
           <View>
             <Picker
               style={styles.picker}
               itemStyle={{height: 50, textAlign: 'left', fontSize: 22, width: '100%'}}
               selectedValue={selection ? selection : options[0]}
               onValueChange={(itemValue, itemIndex) => this.setSelection(itemValue)}>
               {optionsHtml}
             </Picker>
         </View>}

         {showInGrams && <Text style={styles.content}>{content}</Text>}
       </View>
     );
   }
}

export default FoodOptions;

FoodOptions.propTypes = {
  // trainingIntensity: PropTypes.number,
  mealsBeforeWorkout: PropTypes.number,
  template: PropTypes.number,
  currentMeal: PropTypes.number,
  age: PropTypes.number,
  gender: PropTypes.string,
  height: PropTypes.number,
  bodyweight: PropTypes.number,
  bodyfat: PropTypes.number,
  showMacros: PropTypes.bool
};

const styles = StyleSheet.create ({
   foodOptionsWrapper: {
     display: 'flex',
     flexDirection: 'row'
   },
   content: {
     textAlign: 'center',
     paddingLeft: 20,
     paddingRight: 20,
     paddingTop: 5,
     paddingBottom: 5
   },
   foodOptionsButton: {
     width: 20,
     height: 20
   },
   disabled: {
     display: 'none'
   }
});
