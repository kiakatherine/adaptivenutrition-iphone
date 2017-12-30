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

import FoodOptions from './FoodOptions';

class Meal extends React.Component {
   state = {
     selected: false,
   }

   render() {
     return (
       <View>
        <View style={Styles.flexRow}>
          <Text style={Styles.flexRowCol}>{this.props.label}Label</Text>
          <Text style={Styles.flexRowCol}>{this.props.timing}Timing</Text>
        </View>

        <View style={styles.mealRow}>
          <Text style={styles.mealRowCol}>Protein</Text>
          <FoodOptions style={styles.mealRowColLong}
            trainingIntensity={this.props.trainingIntensity}
            trainingTime={this.props.trainingTime}
            template={this.props.template}
            selectedMeal={this.props.selectedMeal}
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
            selectedMeal={this.props.selectedMeal}
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
            selectedMeal={this.props.selectedMeal}
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
            selectedMeal={this.props.selectedMeal}
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

const styles = StyleSheet.create ({
  mealRow: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  mealRowCol: {
    flex: 1
  },
  mealRowColLong: {
    flex: 2
  }
});
