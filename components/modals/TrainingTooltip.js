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
      <Text style={[Styles.paragraphText, Styles.textBold]}>{"We use this to help you figure out when to eat protein, carbohydrates, and fat for optimal performance and aesthetics."}</Text>

      {props.phase < 3 && <View>
        <Text style={Styles.h2}>When to Select Yes</Text>
        <Text style={Styles.paragraphText}>{"Here, working out is considered exercise that uses carbohydrates as the primary fuel source. It's the kind of workout during which it's difficult to hold a conversation."}</Text>
        <Text style={Styles.paragraphText}>Examples include weightlifting, high-intensity interval training, sprinting, CrossFit, and endurance training.</Text>

        <Text style={Styles.h2}>When to Select No</Text>
        <Text style={Styles.paragraphText}>{"Activities that are primary fueled by fat and do not require eating more carbohydrate are considered low-intensity. If you're able to carry on a conversation during the workout, this is likely the category it falls under."}</Text>
        <Text style={Styles.paragraphText}>Examples include steady-state cardio, walking, jogging, yoga, barre.</Text>
      </View>}

      {props.phase === 3 && <View>
        <Text style={Styles.paragraphText}>{"Here, working out is considered high-intensity exercise. High-intensity exercises uses carbohydrates as the primary fuel source. If you're able to carry on a conversation during the workout, this is likely the category it falls under."}</Text>
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
