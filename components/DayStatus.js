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

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from 'react-native-vector-icons';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import moment from 'moment';

class Meal extends React.Component {
   render() {
     const day = this.props.day;

     return (
       <View style={styles.dayStatusWrapper}>
        <View style={styles.dayStatusDate}>
          <Text>{moment(day.fullDate).format('ddd M/D/YY')}</Text>
        </View>

        <View style={styles.dayStatusMeals}>
          <View style={[
            styles.dayStatusMeal,
            day.meal1 === 1 ? styles.dayStatusMealGood :
            day.meal1 === 2 ? styles.dayStatusMealBad : '']}>
          </View>
          <View style={[
            styles.dayStatusMeal,
            day.meal2 === 1 ? styles.dayStatusMealGood :
            day.meal2 === 2 ? styles.dayStatusMealBad : '']}>
          </View>
          <View style={[
            styles.dayStatusMeal,
            day.meal3 === 1 ? styles.dayStatusMealGood :
            day.meal3 === 2 ? styles.dayStatusMealBad : '']}>
          </View>
          <View style={[
            styles.dayStatusMeal,
            day.meal4 === 1 ? styles.dayStatusMealGood :
            day.meal4 === 2 ? styles.dayStatusMealBad : '']}>
          </View>
          <View style={[
            styles.dayStatusMeal,
            day.meal5 === 1 ? styles.dayStatusMealGood :
            day.meal5 === 2 ? styles.dayStatusMealBad : '']}>
          </View>
          <View style={[
            styles.dayStatusMeal,
            day.meal6 === 1 ? styles.dayStatusMealGood :
            day.meal6 === 2 ? styles.dayStatusMealBad : '']}>
          </View>
        </View>
       </View>
     );
   }
}

export default Meal;

Meal.propTypes = { };

const styles = StyleSheet.create ({
  dayStatusDate: {
    width: 100
  },
  dayStatusMeals: {
    display: 'flex',
    flexDirection: 'row',
  },
  dayStatusMeal: {
    flex: 1,
    height: 20,
    marginRight: 2,
    backgroundColor: Colors.lightGray
  },
  dayStatusMealGood: {
    backgroundColor: Colors.paleGreen
  },
  dayStatusMealBad: {
    backgroundColor: Colors.paleRed
  }
});
