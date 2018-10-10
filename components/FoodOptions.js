import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Image,
  FlatList,
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
import * as templates from '../constants/Templates';

import { convertTemplateToNumber, createFoodMenu } from '../utils/helpers';

class FoodOptions extends React.Component {
   state = { }

   render() {
     const macro = this.props.macro;
     const currentMeal = this.props.currentMeal;
     const phase = this.props.phase;
     const showInGrams = this.props.showInGrams;
     const sources = this.props.sources;
     const selection = this.state.selection;
     const isBedtimeMeal = this.props.bedtime;
     const isPwoShake = this.props.pwo;
     const trainingIntensity = this.props.trainingIntensity;
     let hidePwoShakeArrows = false;

     let formattedOptions = [];
     let i = 0;

     if(macro !== 'veggies') {
       let options = createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake);

       options.forEach(opt => {
         const option = opt !== '---' ? opt.split('of ') : null;

         if(option) {
           formattedOptions.push({
             amount: option[0],
             food: option[1],
             key: i
           });
         }

         i++;
       });
     } else {
       formattedOptions.push({
         amount: '1 cup',
         food: 'veggies',
         key: i
       });
     }

     let content = null;
     const currMeal = Number(currentMeal) + 1;
     const string = macro + currMeal;

     // if(Number.isInteger(currMeal)) {
     //   if(selection) {
     //     content = selection;
     //   } else if(isPwoShake) {
     //     hidePwoShakeArrows = (macro === 'fats' || macro === 'veggies') ? true : false;
     //     content = sources[string + 'Grams'] + ' of whey protein';
     //   } else if(showInGrams) {
     //     content = sources[string + 'Grams'];
     //   }
     // }

     // let optionsHtml = [];
     // options.forEach((opt, i) => {
     //   optionsHtml.push(<Picker.Item label={opt} value={opt} key={i} />)
     // });

    return (
      <View>
        {!showInGrams &&
          <FlatList
            horizontal={true}
            style={styles.foodOptionsList}
            data={formattedOptions}
            renderItem={({item}) => (
              <View style={styles.foodOption} key={item.key}>
                <Text style={styles.foodOptionAmount}>{item.amount}</Text>
                <Text style={styles.foodOptionFood}>{item.food}</Text>
                {(phase < 3 && macro === 'protein') &&
                  <Image source={require('../assets/icons/protein.jpg')}
                    style={{ width: 60, height: 60, resizeMode: 'contain' }} />}
                {(phase < 3 && macro === 'carbs' && trainingIntensity === true) &&
                  <Image source={require('../assets/icons/carbs-training.jpg')}
                    style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />}
                {(phase < 3 && macro === 'carbs' && trainingIntensity === false) &&
                  <Image source={require('../assets/icons/carbs-rest.jpg')}
                    style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined, resizeMode: 'contain' }} />}
                {(phase < 3 && macro === 'fats') &&
                  <Image source={require('../assets/icons/fats.jpg')}
                    style={{ width: 60, height: 60, resizeMode: 'contain' }} />}
              </View>)}
          />}

        {showInGrams && <Text style={styles.content}>{content}</Text>}
      </View>
    );
  }
}

export default FoodOptions;

FoodOptions.propTypes = {
  // trainingIntensity: PropTypes.number,
  mealsBeforeWorkout: PropTypes.number,
  template: PropTypes.string,
  currentMeal: PropTypes.number,
  age: PropTypes.number,
  gender: PropTypes.string,
  height: PropTypes.number,
  bodyweight: PropTypes.number,
  bodyfat: PropTypes.number,
  showMacros: PropTypes.bool
};

const styles = StyleSheet.create ({
   disabled: {
     display: 'none'
   },
   foodOptionsList: {
     flex: 1,
     flexDirection: 'row',
     marginTop: 10,
     marginBottom: 40
   },
   foodOption: {
     flex: 1,
     height: 150,
     marginRight: 15,
     padding: 20,
     paddingTop: 40,
     backgroundColor: Colors.lightGray
   },
   foodOptionAmount: {
     fontSize: 20,
     fontWeight: '600',
     marginBottom: 3,
     color: Colors.black
   },
   foodOptionFood: {
     fontSize: 18,
     letterSpacing: 1,
     color: Colors.black
   }
});
