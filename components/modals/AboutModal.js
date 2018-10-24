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

const AboutModal = props => {
  return (
    <View style={Styles.modalContent}>
      <Text style={Styles.modalH1}>About</Text>

      <Text style={Styles.paragraphText}>Our goal is to help people feel knowledgeable and in control of how food impacts their health, appearance, and quality of life.</Text>

      <Text style={Styles.paragraphText}>We were frustrated with the lack of education around personal nutrition, as well as the lack of sustainability and scientific support for many diets.</Text>

      <Text style={Styles.h3}>At Adaptive Nutrition, we:</Text>

      <Text style={Styles.paragraphText}>Aim to provide facts on what works and what doesn’t.</Text>

      <Text style={Styles.paragraphText}>Distill complex concepts into simple tools and guidelines.</Text>

      <Text style={Styles.paragraphText}>Know the effects of nutrition are far-reaching - everything from skin to mood, from alertness to training performance.</Text>

      <Text style={Styles.paragraphText}>Believe that nutrition is important when addressing the root of many health problems.</Text>

      <Text style={Styles.paragraphText}>Understand that while food is important for your health, it is more than just fuel - it’s a cultural and social fabric.</Text>

      <Text style={Styles.paragraphText}>Teach how to align your enjoyment of food with your health, training, and/or aesthetic goals.</Text>

      <Text style={Styles.paragraphText}>{"We're excited that you're here and hope these tools will help you be the best version of yourself."}</Text>

      <Text style={Styles.paragraphText}>Learn more at <Text style={Styles.link} onPress={() => Linking.openURL('http://adaptivenutrition.us')}>adaptivenutrition.us</Text>.</Text>
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
