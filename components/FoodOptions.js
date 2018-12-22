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

import { createFoodMenu } from '../utils/helpers';

class FoodOptions extends React.Component {
  state = { }

  render() {
    const macro = this.props.macro;
    const currentMeal = this.props.currentMeal;
    const phase = this.props.phase;
    const showInGrams = this.props.showInGrams;
    const sources = this.props.sources;
    const isPwoShake = this.props.pwo;
    const trainingIntensity = this.props.trainingIntensity;
    let hidePwoShakeArrows = false;
    let formattedOptions = [];
    let formattedOptionsLength = 0;
    let i = 0;
    let macros = null;

    if(showInGrams) {
      const key = macro + (Number(currentMeal) + 1) + 'Grams';
      macros = sources[key];
    } else {
      if(macro !== 'veggies') {
        let options = createFoodMenu(macro, currentMeal, phase, sources, isPwoShake);

        if(options) {
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
        }
      } else {
        if(!this.props.pwo) {
          formattedOptions.push({
            amount: '1 cup',
            food: 'veggies',
            key: i
          });
        }
      }

      formattedOptionsLength = formattedOptions.length;
    }

    return (
      <View>
        {!showInGrams && formattedOptionsLength > 0 &&
          <FlatList
            horizontal={true}
            style={styles.foodOptionsList}
            data={formattedOptions}
            renderItem={({item}) => (
              <View style={[styles.foodOption, formattedOptions.length === (item.key + 1) ? { marginRight: 0 } : null]} key={item.key}>
                <Text style={styles.foodOptionAmount}>{item.amount}</Text>
                {item.food && <Text style={styles.foodOptionFood}>{item.food}</Text>}
              </View>)}
          />}

        {!showInGrams && formattedOptionsLength === 0 &&
          <Text style={[Styles.emptyMessage, styles.emptyMessage]}>No {macro} needed for this meal</Text>}

        {showInGrams && <Text style={styles.content}>{macros}</Text>}
      </View>
    );
  }
}

export default FoodOptions;

FoodOptions.propTypes = {
  // trainingIntensity: PropTypes.number,
  // mealsBeforeWorkout: PropTypes.number,
  // template: PropTypes.string,
  // currentMeal: PropTypes.number,
  // age: PropTypes.number,
  // gender: PropTypes.string,
  // height: PropTypes.number,
  // bodyweight: PropTypes.number,
  // bodyfat: PropTypes.number,
  // showMacros: PropTypes.bool
};

const styles = StyleSheet.create ({
   disabled: {
     display: 'none'
   },
   foodOptionsList: {
     marginTop: 10,
     marginBottom: 30
   },
   foodOption: {
     flex: 1,
     marginRight: 15,
     padding: 25,
     backgroundColor: Colors.lightGray
   },
   foodOptionAmount: {
     fontFamily: 'Futura',
     fontSize: 22,
     fontWeight: '600',
     marginBottom: 3,
     color: Colors.black
   },
   foodOptionFood: {
     fontSize: 18,
     letterSpacing: 1,
     color: Colors.black
   },
   emptyMessage: {
     marginBottom: 30
   }
});
