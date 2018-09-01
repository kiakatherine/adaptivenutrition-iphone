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

class ModalWindow extends React.Component {
   state = {
     modalVisible: false,
   }

   toggleModal(visible) {
     this.setState({
       modalVisible: visible
     });
   }

   render() {
     let modal = null;

     if(this.props.currentModal === 'BIOMETRIC_SETTINGS') {
       modal = <BiometricSettingsModal client={this.props.data} />;
     } else if(this.props.currentModal === 'FOODS_TO_AVOID') {
       modal = <FoodsToAvoidModal />;
     } else if(this.props.currentModal === 'ABOUT') {
       modal = <AboutModal />;
     }

     return (
       <View>
         <View style={styles.container}>
           <Modal animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { console.log("Modal has been closed.") } }>

            <ScrollView>
              <View style={styles.modal}>
                <TouchableHighlight
                  style={styles.closeButton}
                  underlayColor={Colors.white}
                  onPress={() => {this.toggleModal(!this.state.modalVisible)}}>
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

         <TouchableHighlight onPress={() => {this.toggleModal(true)}}>
            <Text style={Styles.menuItem}>{this.props.label}</Text>
         </TouchableHighlight>
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
