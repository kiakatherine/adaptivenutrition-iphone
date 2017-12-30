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

import Meal from '../../components/Meal';

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
          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>What time did you wake up?</Text>
          </View>

          <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text style={styles.optionTitle}>8:00 a.m.</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>Are you training today?</Text>
          </View>

          <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>Rest or low-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>&#60; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>&#62; 90 min of high-intensity exercise</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.optionWrapper}>
            <Text style={styles.optionTitle}>How many meals before your workout?</Text>
          </View>

          <View style={styles.optionSection}>
            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>None</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>1</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>2</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>3</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.optionButton} onPress={() => {}}>
               <Text>4</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.mealPlanSection}>
            <Text style={Styles.h1}>Todays Meal Plan</Text>
            <Text>Phase 3</Text>

            <View style={styles.mealsMenu}>
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

            <Meal />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  optionWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  optionSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  optionTitle: {
    color: Colors.black,
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10
  },
  optionButton: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.paleBlue
  },
  mealPlanSection: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 50
  },
  mealsMenu: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20
  }
});
