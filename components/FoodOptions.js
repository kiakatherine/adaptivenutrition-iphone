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

class FoodOptions extends React.Component {
   // state = {
   //   selected: false,
   // }

   clickPrevious() {
     // this.setState({
     //   modalVisible: visible
     // });
   }

   clickNext() {

   }

   render() {
     // let modal = null;
     //
     // if(this.props.currentModal === 'BIOMETRIC_SETTINGS') {
     //   modal = <BiometricSettingsModal />;
     // } else if(this.props.currentModal === 'FOODS_TO_AVOID') {
     //   modal = <FoodsToAvoidModal />;
     // } else if(this.props.currentModal === 'ABOUT') {
     //   modal = <AboutModal />;
     // }

     return (
       <View style={styles.foodOptionsWrapper}>
         <TouchableHighlight onPress={() => {this.clickPrevious()}}>
           <FontAwesome
             name='chevron-left'
             size={16}
           />
         </TouchableHighlight>

         <Text style={styles.content}>4 oz sweet potatoes</Text>

         <TouchableHighlight onPress={() => {this.clickNext()}}>
           <FontAwesome
             name='chevron-right'
             size={16}
           />
         </TouchableHighlight>
       </View>
     );
   }
}

export default FoodOptions;

const styles = StyleSheet.create ({
   foodOptionsWrapper: {
     alignSelf: 'stretch',
     alignItems: 'flex-start',
     flexDirection: 'row'
   },
   content: {
     paddingLeft: 20,
     paddingRight: 20
   }
});
