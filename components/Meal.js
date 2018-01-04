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

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

import FoodOptions from './FoodOptions';

class Meal extends React.Component {
   state = {
     selected: false,
   }

   render() {
     return (
       <View style={styles.mealContainer}>
        <View style={styles.mealRowHeader}>
          <Text style={styles.mealRowHeaderCol}>{this.props.label}{'Meal'.toUpperCase()} #{this.props.currentMeal}</Text>
          <Text style={styles.mealRowHeaderColTime}>{this.props.timing}{'Timing'.toUpperCase()}</Text>
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Protein</Text>
          <FoodOptions style={styles.mealRowColLong}
            trainingIntensity={this.props.trainingIntensity}
            trainingTime={this.props.trainingTime}
            template={this.props.template}
            currentMeal={this.props.currentMeal}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showMacros={this.state.showMacros} />
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Starches</Text>
          <FoodOptions style={styles.mealRowColLong}
            trainingIntensity={this.props.trainingIntensity}
            trainingTime={this.props.trainingTime}
            template={this.props.template}
            currentMeal={this.props.currentMeal}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showMacros={this.state.showMacros} />
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Fats</Text>
          <FoodOptions style={styles.mealRowColLong}
            trainingIntensity={this.props.trainingIntensity}
            trainingTime={this.props.trainingTime}
            template={this.props.template}
            currentMeal={this.props.currentMeal}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showMacros={this.state.showMacros} />
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Veggies</Text>
          <FoodOptions style={styles.mealRowColLong}
            trainingIntensity={this.props.trainingIntensity}
            trainingTime={this.props.trainingTime}
            template={this.props.template}
            currentMeal={this.props.currentMeal}
            age={this.props.age}
            gender={this.props.gender}
            height={this.props.height}
            bodyweight={this.props.bodyweight}
            bodyfat={this.props.bodyfat}
            showMacros={this.state.showMacros} />
        </View>
       </View>
     );
   }
}

export default Meal;

Meal.propTypes = {
  trainingIntensity: PropTypes.number,
  trainingTime: PropTypes.number,
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
  mealContainer: {
    marginTop: 30,
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
  },
  mealRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  mealRowCol: {
    flex: 1
  },
  mealRowColLong: {
    flex: 2
  },
  mealRowHeader: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
  },
  mealRowHeaderCol: {
    width: '50%',
    letterSpacing: 1
  },
  mealRowHeaderColTime: {
    width: '50%',
    textAlign: 'right',
    letterSpacing: 1
  }
});
