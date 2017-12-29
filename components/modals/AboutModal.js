import React from 'react';

// import ModalWrapper from '../ModalWrapper.jsx';

import Styles from '../../constants/Styles';

import {
  Button,
  Keyboard,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

const AboutModal = props => {
  return (
    <View style={Styles.modalContent}>
      <Text style={Styles.modalH1}>About</Text>

      <Text style={Styles.paragraphText}>Our mission is to provide our clients with sustainable nutritional and lifestyle tools necessary to meet and exceed their fitness goals.</Text>

      <Text style={Styles.paragraphText}>Growing up, we aren’t taught how to appropriately fuel our bodies for health and activity. As adults, different fad diets vie for our attention. We know first-hand how difficult it is to navigate all of this information to get the results we want.</Text>

      <Text style={Styles.paragraphText}>Eventually, we realized it’s not rocket science…but it is science. We have found what’s been proven to work for people from all different health backgrounds and fitness levels, and we are hoping to share them with you in order to help you find your success. We meet you where you are and build you up to your goals and beyond.</Text>

      <Text style={Styles.paragraphText}>Learn more at <Text onPress={() => Linking.openURL('http://adaptivenutrition.us')}>adaptivenutrition.us</Text>.</Text>
    </View>

    // <ModalWrapper
    //   {...props}
    //   title="Sign in"
    //   width={400}
    //   showOk={false}
    // >
    //   <p>Choose your flavor</p>
    //   <button onClick={() => signIn('facebook')}>Facebook</button>
    //   <button onClick={() => signIn('google')}>Google</button>
    //   <button onClick={() => signIn('twitter')}>Twitter</button>
    // </ModalWrapper>
  );
};

export default AboutModal;
