import React from 'react';

// import ModalWrapper from '../ModalWrapper.jsx';

import Styles from '../../constants/Styles';

import {
  Button,
  Linking,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

const ContactUsModal = props => {
  return (
    <View style={Styles.modalContent}>
      <Text style={Styles.modalH1}>Contact Us</Text>

      <Text style={Styles.paragraphText}>If you have any questions, you can visit our website at <Text style={Styles.link} onPress={() => Linking.openURL('http://adaptivenutrition.us')}>adaptivenutrition.us</Text> or email us at <Text>{"support@adaptivenutrition.us"}</Text>.</Text>
    </View>
  );
};

export default ContactUsModal;
