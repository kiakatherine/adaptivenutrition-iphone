import React from 'react';

// import ModalWrapper from '../ModalWrapper.jsx';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

import {
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class PhaseConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedPhaseOne1: false,
      checkedPhaseOne2: false,
      checkedPhaseOne3: false,
      checkedPhaseOne4: false,
      checkedPhaseOne5: false
    };
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={Styles.modalH1}>{"Let's take it to the next level"}</Text>

        <Text style={Styles.modalParagraph}>{"But first, let's quickly ensure you're set up for success!"}</Text>
        <Text style={Styles.modalParagraph}>{"Check off the items below to confirm you're ready to move forward."}</Text>
        <Text style={Styles.modalParagraph}>{"If you're unsure about any of them, no worries. We recommend spending a few more days on the current phase nailing these down before moving on."}</Text>

        <View>
          <View style={[styles.checkboxRow, this.state.checkedPhaseOne1 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne1: !this.state.checkedPhaseOne1 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne1 ? styles.checkedText : styles.uncheckedText]}>I have stayed on Phase {this.props.currentPhase} for at least 1 week.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedPhaseOne2 ? styles.checked : '']}>
            <TouchableHighlight
              onPress={ () => { this.setState({ checkedPhaseOne2: !this.state.checkedPhaseOne2 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne2 ? styles.checkedText : styles.uncheckedText]}>I have gotten all my meals in each day.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedPhaseOne3 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne3: !this.state.checkedPhaseOne3 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne3 ? styles.checkedText : styles.uncheckedText]}>I have eaten according to the food options in the app.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedPhaseOne4 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne4: !this.state.checkedPhaseOne4 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne4 ? styles.checkedText : styles.uncheckedText]}>I have spaced my meals out according to the app.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedPhaseOne5 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne5: !this.state.checkedPhaseOne5 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne5 ? styles.checkedText : styles.uncheckedText]}>I have eaten the portions according to the app.</Text>
            </TouchableHighlight>
          </View>
        </View>

        <TouchableHighlight
          style={[Styles.modalButton,
            this.state.checkedPhaseOne1 &&
            this.state.checkedPhaseOne2 &&
            this.state.checkedPhaseOne3 &&
            this.state.checkedPhaseOne4 &&
            this.state.checkedPhaseOne5 ? null : Styles.modalButtonDisabled]}
          underlayColor={Colors.primaryColor}
          onPress={() => {
            this.state.checkedPhaseOne1 &&
            this.state.checkedPhaseOne2 &&
            this.state.checkedPhaseOne3 &&
            this.state.checkedPhaseOne4 &&
            this.state.checkedPhaseOne5 ? this.props.movePhase(2) : null}}>
          <Text style={[Styles.modalButtonText,
            this.state.checkedPhaseOne1 &&
            this.state.checkedPhaseOne2 &&
            this.state.checkedPhaseOne3 &&
            this.state.checkedPhaseOne4 &&
            this.state.checkedPhaseOne5 ? null : Styles.modalButtonDisabledText]}>
            {"I'M READY!"}</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default PhaseConfirmationModal;

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 12,
    paddingBottom: 3
  },
  checked: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: 5
  },
  checkedText: {
    color: Colors.white,
    fontWeight: 'bold'
  },
  uncheckedText: {
    color: Colors.black
  }
});
