import React from 'react';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Nutrition',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View style={Styles.title}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
        </View>

        <View>
          <View style={Styles.optionWrapper}>
            <Text style={Styles.optionTitle}>What time did you wake up?</Text>
          </View>

          <View style={Styles.optionSection}>
            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text style={Styles.optionTitle}>8:00 a.m.</Text>
            </TouchableHighlight>
          </View>

          <View style={Styles.optionWrapper}>
            <Text style={Styles.optionTitle}>Are you training today?</Text>
          </View>

          <View style={Styles.optionSection}>
            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>Rest or low-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>&#60; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>&#62; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>
          </View>

          <View style={Styles.optionWrapper}>
            <Text style={Styles.optionTitle}>How many meals before your workout?</Text>
          </View>

          <View style={Styles.optionSection}>
            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>None</Text>
            </TouchableHighlight>

            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>1</Text>
            </TouchableHighlight>

            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>2</Text>
            </TouchableHighlight>

            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>3</Text>
            </TouchableHighlight>

            <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
               <Text>4</Text>
            </TouchableHighlight>
          </View>

          <View style={Styles.mealPlanSection}>
            <Text style={Styles.h1}>Todays Meal Plan</Text>
            <Text>Phase 3</Text>

            <View style={Styles.mealsMenu}>
              <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
                 <Text>1</Text>
              </TouchableHighlight>

              <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
                 <Text>2</Text>
              </TouchableHighlight>

              <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
                 <Text>3</Text>
              </TouchableHighlight>

              <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
                 <Text>4</Text>
              </TouchableHighlight>

              <TouchableHighlight style={Styles.optionButton} onPress={() => {}}>
                 <Text>5</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
