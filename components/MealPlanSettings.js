import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Image,
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

class MealPlanSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  toggleView(viewAllMeals) {
    this.props.toggleView(viewAllMeals);
  }

  toggleUnits(showInGrams) {
    this.props.toggleUnits(showInGrams);
  }

   render() {
     const template = this.props.template;
     const viewAllMeals = this.props.viewAllMeals;
     const showInGrams = this.props.showInGrams;
     const doNotShowMacroWarning = this.props.doNotShowMacroWarning;

     return (
       <View style={styles.mealSettingsSection}>
         <Text style={[Styles.h2, Styles.textCenter]}>Meal Plan Settings</Text>

         <View style={styles.mealSettingsSectionList}>
           <TouchableHighlight
            underlayColor='white'
            onPress={() => { this.toggleView(viewAllMeals) }}>
              <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>
              {viewAllMeals && 'View by meal'}
              {!viewAllMeals && 'View by day'}
              </Text>
           </TouchableHighlight>

           {showInGrams && <TouchableHighlight
             underlayColor='white'
             onPress={() => { this.toggleUnits(showInGrams) }}>
              <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>
               View in serving sizes
              </Text>
           </TouchableHighlight>}

           {!showInGrams && <TouchableHighlight
             underlayColor='white'
             onPress={() => { doNotShowMacroWarning ? this.toggleUnits(showInGrams) : this.setState({ showModal: true, showMacrosWarning: true }) }}>
              <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>
               View in macros
              </Text>
           </TouchableHighlight>}

           <TouchableHighlight
            underlayColor='white'
            onPress={() => { this.setState({ showEnergyBalancePicker: true, showModal: true }) }}>
              <Text style={[Styles.link, Styles.textCenter, styles.mealSettingsLink]}>Adjust goal ({template})</Text>
           </TouchableHighlight>
         </View>
       </View>
     );
   }
}

export default MealPlanSettings;

MealPlanSettings.propTypes = {
};

const styles = StyleSheet.create ({
  mealSettingsSection: {
    marginTop: 20,
    marginBottom: 30
  },
  mealSettingsLink: {
    paddingTop: 10,
    paddingBottom: 10
  },
});
