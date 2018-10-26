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
import { convertTemplateToString } from '../../utils/helpers';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

class MealPlanSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  toggleView(viewAllMeals) {
    this.props.toggleView(viewAllMeals);
    this.props.closeModal();
  }

  toggleUnits(showInGrams) {
    this.props.toggleUnits(showInGrams);
    this.props.closeModal();
  }

  showTemplatePicker() {
    this.props.showTemplatePicker();
    this.props.closeModal();
  }

  clickNavPhase() {
    this.props.clickNavPhase(2);
    this.props.closeModal();
  }

   render() {
     const template = this.props.template;
     const viewAllMeals = this.props.viewAllMeals;
     const showInGrams = this.props.showInGrams;
     const doNotShowMacroWarning = this.props.doNotShowMacroWarning;

     return (
       <View style={[Styles.modalContent, styles.mealSettingsSection]}>
         <Text style={Styles.modalH1}>Meal Plan Settings</Text>

         <View style={styles.mealSettingsSectionList}>
           <TouchableHighlight
            underlayColor={Colors.darkerPrimaryColor}
            style={Styles.modalButton}
            onPress={() => { this.toggleView(viewAllMeals) }}>
              <Text style={Styles.buttonText}>
              {viewAllMeals && 'View single meal'}
              {!viewAllMeals && 'View all meals'}
              </Text>
           </TouchableHighlight>

           {showInGrams && <TouchableHighlight
             underlayColor={Colors.darkerPrimaryColor}
             style={Styles.modalButton}
             onPress={() => { this.toggleUnits(showInGrams) }}>
              <Text style={Styles.buttonText}>
               View in serving sizes
              </Text>
           </TouchableHighlight>}

           {!showInGrams && <TouchableHighlight
             underlayColor={Colors.darkerPrimaryColor}
             style={Styles.modalButton}
             onPress={() => { doNotShowMacroWarning ? this.toggleUnits(showInGrams) : this.setState({ showModal: true, showMacrosWarning: true }) }}>
              <Text style={Styles.buttonText}>
               View in macros
              </Text>
           </TouchableHighlight>}

           <TouchableHighlight
            underlayColor={Colors.darkerPrimaryColor}
            style={Styles.modalButton}
            onPress={() => { this.showTemplatePicker() }}>
              <Text style={Styles.buttonText}>Adjust goal - {convertTemplateToString(template)}</Text>
           </TouchableHighlight>

           <TouchableHighlight
            underlayColor={Colors.darkerPrimaryColor}
            style={Styles.modalButton}
            onPress={() => { this.clickNavPhase() }}>
              <Text style={Styles.buttonText}>Go back to Phase 2</Text>
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
    marginTop: 40
  },
  mealSettingsLink: {
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    marginBottom: 10
  }
});
