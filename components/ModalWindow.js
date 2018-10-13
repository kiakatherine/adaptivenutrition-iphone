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

import BiometricSettingsModal from './modals/BiometricSettingsModal';
import FoodsToAvoidModal from './modals/FoodsToAvoidModal';
import AboutModal from './modals/AboutModal';
import MealPlanSettingsModal from './modals/MealPlanSettingsModal';
import TemplateConfirmationModal from './modals/TemplateConfirmationModal';
import MealCompletionModal from './modals/MealCompletionModal';

class ModalWindow extends React.Component {
   constructor(props) {
    super(props);

    // this.state = {
    //   isVisible: false
    // }

    // this.closeModal = this.closeModal.bind(this);
   }
   //
   // closeModal() {
   //   this.setState({ isVisible: false });
   // }

   render() {
     let modal = null;

     if(this.props.currentModal === 'BIOMETRIC_SETTINGS') {
       modal = <BiometricSettingsModal client={this.props.data} />;
     } else if(this.props.currentModal === 'FOODS_TO_AVOID') {
       modal = <FoodsToAvoidModal />;
     } else if(this.props.currentModal === 'ABOUT') {
       modal = <AboutModal />;
     } else if(this.props.currentModal === 'MEAL_PLAN_SETTINGS') {
       modal = <MealPlanSettingsModal
         style={this.props.style}
         data={this.props.data}
         template={this.props.template}
         viewAllMeals={this.props.viewAllMeals}
         showInGrams={this.props.showInGrams}
         doNotShowMacroWarning={this.props.doNotShowMacroWarning}
         toggleView={this.props.toggleView}
         toggleUnits={this.props.toggleUnits}
         showEnergyBalancePicker={this.props.showEnergyBalancePicker}
         clickNavPhase={this.props.clickNavPhase}
         closeModal={this.props.closeModal} />;
      } else if(this.props.currentModal === 'TEMPLATE_CONFIRMATION') {
        modal = <TemplateConfirmationModal
          currentTemplate={this.props.currentTemplate}
          saveTemplateType={this.props.saveTemplateType} />;
      } else if(this.props.currentModal === 'MEAL_COMPLETION') {
        modal = <MealCompletionModal
          phase={this.props.phase}
          date={this.props.date}
          mealNumber={this.props.mealNumber}
          completeMeal={this.props.completeMeal}/>;
      }

     return (
       <View>
         <View style={styles.container}>
           <Modal animationType={"slide"}
            transparent={false}
            onRequestClose={() => { console.log("Modal has been closed.") } }>

            <ScrollView>
              <View style={styles.modal}>
                <TouchableHighlight
                  style={styles.closeButton}
                  underlayColor={Colors.white}
                  onPress={this.props.closeModal}>
                   <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                     <FontAwesome
                       name='remove'
                       size={28}
                     />
                   </Text>
                </TouchableHighlight>
                 {modal}
               </View>
            </ScrollView>

           </Modal>
         </View>
       </View>
     );
   }
}

export default ModalWindow;

const styles = StyleSheet.create ({
   container: {
      alignItems: 'flex-start',
      backgroundColor: '#ede3f2'
   },
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFF',
      padding: 40
   },
   closeButton: {
     padding: 20
   }
});
