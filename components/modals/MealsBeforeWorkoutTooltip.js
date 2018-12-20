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

const MealsBeforeWorkoutTooltip = props => {
  return (
    <View>
      <Text style={Styles.modalH1}>{"Number of Meals Before Workout"}</Text>
      <Text style={[Styles.paragraphText, Styles.textBold]}>{"We use this to help you figure out when to eat protein, carbohydrates, and fat for optimal performance and aesthetics."}</Text>

      <Text style={Styles.h2}>Determining the Number</Text>
      <Text style={Styles.paragraphText}>{"Keep in mind that breakfast should be within an hour of waking, and the rest of your meals should be 3-5 hours apart."}</Text>
      <Text style={Styles.paragraphText}>{"For example, if you workout first thing in the morning, you would choose 0 meals before working out."}</Text>

      <Text></Text>
      <Text></Text>
    </View>
  );
};

export default MealsBeforeWorkoutTooltip;
