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

const TrainingTooltip = props => {
  return (
    <View>
      <Text style={Styles.modalH1}>Working Out</Text>
      <Text style={Styles.paragraphText}>{"Enter your workout for today. We'll use this to help you figure out when to eat carbohydrates and fats for optimal performance and aesthetics."}</Text>

      {props.phase < 3 && <View>
        <Text style={Styles.paragraphText}>Here, working out is considered exercise that uses carbohydrates as the primary fuel source. This includes weightlifting, high-intensity interval training, sprinting, CrossFit, and endurance training.</Text>
        <Text style={Styles.paragraphText}>Activities such as steady-state cardio, walking, jogging, yoga, barre, etc are primary fueled by fat and do not require eating more carbohydrate. These activities are considered low-intensity, so you can click rest day/low-intensity exercise.</Text>
      </View>}

      {props.phase === 3 && <View>
        <Text style={Styles.paragraphText}>Here, working out is considered high-intensity exercise. High-intensity exercises uses carbohydrates as the primary fuel source.</Text>
        <Text style={Styles.paragraphText}>Examples include weightlifting, high-intensity interval training, sprinting, CrossFit, and endurance training.</Text>
        <Text style={Styles.paragraphText}>If it leaves you gasping for breath, it probably qualifies as high-intensity!</Text>

        <Text style={Styles.h2}>Rest or low-intensity</Text>
        <Text style={Styles.paragraphText}>{"Rest day or low intensity exercise like walking, jogging, yoga, etc. Anything that doesn't feel like a huge strain and leave you breathing really hard."}</Text>

        <Text style={Styles.h2}>Less than 90 min high-intensity</Text>
        <Text style={Styles.paragraphText}>If your high-intensity workout (see above) lasts for less than an hour and a half.</Text>

        <Text style={Styles.h2}>More than 90 min high-intensity</Text>
        <Text style={Styles.paragraphText}>If your high-intensity workout (see above) lasts for more than an hour and a half.</Text>
      </View>}

      <Text></Text>
      <Text></Text>
    </View>
  );
};

export default TrainingTooltip;
