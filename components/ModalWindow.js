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

// header
import UserModal from './modals/UserModal';
import PointsModal from './modals/PointsModal';

// nutrition screen
import WaketimeTooltip from './modals/WaketimeTooltip';
import TrainingTooltip from './modals/TrainingTooltip';
import MealPlanSettingsModal from './modals/MealPlanSettingsModal';
import TemplateConfirmationModal from './modals/TemplateConfirmationModal';
import PhaseConfirmationModal from './modals/PhaseConfirmationModal';

// progress screen
import AddBodyweightModal from './modals/AddBodyweightModal';
import MealCompletionModal from './modals/MealCompletionModal';

// help screen
import BiometricSettingsModal from './modals/BiometricSettingsModal';
import FoodsToAvoidModal from './modals/FoodsToAvoidModal';
import SuccessChecklistModal from './modals/SuccessChecklistModal';
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
      } else if(this.props.currentModal === 'PHASE_CONFIRMATION') {
        modal = <PhaseConfirmationModal
          currentPhase={this.props.currentPhase}
          movePhase={this.props.movePhase} />;
      } else if(this.props.currentModal === 'MEAL_COMPLETION') {
        modal = <MealCompletionModal
          phase={this.props.phase}
          date={this.props.date}
          mealNumber={this.props.mealNumber}
          completeMeal={this.props.completeMeal} />;
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
      } else if(this.props.currentModal === 'POINTS') {
        modal = <PointsModal
          client={this.props.client} />
      } else if(this.props.currentModal === 'USER') {
        modal = <UserModal
          client={this.props.client}
          onChangeGender={this.props.onChangeGender}
          onChangeBodyweight={this.props.onChangeBodyweight}
          onChangeHeight={this.props.onChangeHeight}
          onChangeBodyfat={this.props.onChangeBodyfat}
          onChangeBirthdate={this.props.onChangeBirthdate}/>
      } else if(this.props.currentModal === 'SUCCESS_CHECKLIST') {
        modal = <SuccessChecklistModal />
      }

     return (
       <View>
         <View style={styles.container}>
           <Modal animationType={"slide"}
            transparent={false}
            onRequestClose={() => { console.log("Modal has been closed.") } }>

            <ScrollView>
              <View style={[styles.modal, this.props.wide ? styles.modalWide : null]}>
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
   modalWide: {
     paddingLeft: 0,
     paddingRight: 0
   },
   closeButton: {
     padding: 20
   }
});
