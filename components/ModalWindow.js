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

// nutrition screen
import WaketimeTooltip from './modals/WaketimeTooltip';
import TrainingTooltip from './modals/TrainingTooltip';
import MealPlanSettingsModal from './modals/MealPlanSettingsModal';
import TemplateConfirmationModal from './modals/TemplateConfirmationModal';

// progress screen
import AddBodyweightModal from './modals/AddBodyweightModal';
import MealCompletionModal from './modals/MealCompletionModal';

// education screen
import LessonQuizModal from './modals/LessonQuizModal';

// help screen
import BiometricSettingsModal from './modals/BiometricSettingsModal';
import FoodsToAvoidModal from './modals/FoodsToAvoidModal';
import AboutModal from './modals/AboutModal';
import ContactUsModal from './modals/ContactUsModal';

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
          completeMeal={this.props.completeMeal} />;
      } else if(this.props.currentModal === 'LESSON_QUIZ') {
        modal = <LessonQuizModal
          lesson={this.props.lesson}
          timestamp={this.props.timestamp}
          closeModal={this.props.closeModal} />;
      } else if(this.props.currentModal === 'CONTACT_US') {
        modal = <ContactUsModal />;
      } else if(this.props.currentModal === 'WAKETIME_TOOLTIP') {
        modal = <WaketimeTooltip />
      } else if(this.props.currentModal === 'TRAINING_TOOLTIP') {
        modal = <TrainingTooltip phase={this.props.phase} />
      } else if(this.props.currentModal === 'ADD_BODYWEIGHT') {
        modal = <AddBodyweightModal
          weight={this.props.weight}
          date={this.props.date}
          updateWeight={this.props.updateWeight}
          setDate={this.props.setDate}
          submitWeight={this.props.submitWeight} />
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
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: 20,
      paddingRight: 20

   },
   closeButton: {
     padding: 20
   }
});
