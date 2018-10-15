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

const WaketimeTooltip = props => {
  return (
    <View>
      <Text style={Styles.modalH1}>Wake Time</Text>
      <Text style={Styles.paragraphText}>{"Enter the time you woke up today. We'll use this to help you figure out when to eat each meal for optimal energy and body composition."}</Text>

      <Text style={Styles.h2}>Meal timing guidelines</Text>
      <Text style={Styles.paragraphText}>Have breakfast within an hour of waking up and subsequent meals 3-5 hours apart.</Text>

      <Text style={Styles.h2}>Why does this matter?</Text>

      <Text style={Styles.h3}>To have better energy</Text>
      <Text style={Styles.paragraphText}>Eating four balanced meals 3-5 hours apart will help keep blood sugar levels steady throughout the day. This will help you maintain even energy and avoid that afternoon slump.</Text>

      <Text style={Styles.h3}>To maintain lean muscle</Text>
      <Text style={Styles.paragraphText}>Protein is not stored in your body like fat and carbs are, so a constant stream of amino acids (the building blocks of protein) is necessary to maintain lean muscle mass.</Text>
      <Text style={Styles.paragraphText}>Why do we want to retain our lean muscle mass? Because more lean muscle directly correlates to a faster metabolism!</Text>

      <Text></Text>
      <Text></Text>
    </View>
  );
};

export default WaketimeTooltip;
