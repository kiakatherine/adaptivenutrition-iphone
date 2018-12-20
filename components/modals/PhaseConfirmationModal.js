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
      checkedPhaseOne5: false,

      checkedPhaseTwo1: false,
      checkedPhaseTwo2: false,
      checkedPhaseTwo3: false,
      checkedPhaseTwo4: false,
      checkedPhaseTwo5: false
    };
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={Styles.modalH1}>{"Let's take it to the next level"}</Text>

        <Text style={Styles.modalParagraph}>{"But first, let's quickly ensure you're set up for success!"}</Text>
        <Text style={Styles.modalParagraph}>{"Check off the items below to confirm you're ready to move forward."}</Text>
        <Text style={Styles.modalParagraph}>{"If you're unsure about any of them, no worries. We recommend spending a few more days on the current phase nailing these down before moving on."}</Text>
        <Text></Text>

        {this.props.currentPhase === 1 && <View>
          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseOne1 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne1: !this.state.checkedPhaseOne1 }); }}>
              <Text>{this.state.checkedPhaseOne1 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne1 ? styles.checkedText : styles.uncheckedText]}>{"I've stayed on Phase "} {this.props.currentPhase} {" for at least 1 week."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseOne2 ? styles.checked : '']}
              onPress={ () => { this.setState({ checkedPhaseOne2: !this.state.checkedPhaseOne2 }); }}>
              <Text>{this.state.checkedPhaseOne2 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne2 ? styles.checkedText : styles.uncheckedText]}>{"I've gotten all my meals in each day."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseOne3 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne3: !this.state.checkedPhaseOne3 }); }}>
              <Text>{this.state.checkedPhaseOne3 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne3 ? styles.checkedText : styles.uncheckedText]}>{"I've eaten according to the food options in the app."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseOne4 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne4: !this.state.checkedPhaseOne4 }); }}>
              <Text>{this.state.checkedPhaseOne4 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne4 ? styles.checkedText : styles.uncheckedText]}>{"I've spaced my meals out according to the app."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseOne5 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseOne5: !this.state.checkedPhaseOne5 }); }}>
              <Text>{this.state.checkedPhaseOne5 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseOne5 ? styles.checkedText : styles.uncheckedText]}>{"I've eaten the portions according to the app."}</Text>
          </View>

          <Text></Text>

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

          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>}

        {this.props.currentPhase === 2 && <View>
          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseTwo1 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseTwo1: !this.state.checkedPhaseTwo1 }); }}>
              <Text>{this.state.checkedPhaseTwo1 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseTwo1 ? styles.checkedText : styles.uncheckedText]}>{"I've stayed on Phase "} {this.props.currentPhase} {" for at least 1 week."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseTwo2 ? styles.checked : '']}
              onPress={ () => { this.setState({ checkedPhaseTwo2: !this.state.checkedPhaseTwo2 }); }}>
              <Text>{this.state.checkedPhaseTwo2 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseTwo2 ? styles.checkedText : styles.uncheckedText]}>{"I've gotten all my meals in each day."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseTwo3 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseTwo3: !this.state.checkedPhaseTwo3 }); }}>
              <Text>{this.state.checkedPhaseTwo3 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseTwo3 ? styles.checkedText : styles.uncheckedText]}>{"I've eaten according to the food options in the app."}</Text>
          </View>

          <View style={styles.checkboxRow}>
            <TouchableHighlight
              style={[styles.checkbox, this.state.checkedPhaseTwo4 ? styles.checked : '']}
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedPhaseTwo4: !this.state.checkedPhaseTwo4 }); }}>
              <Text>{this.state.checkedPhaseTwo4 && <FontAwesome
                name='check'
                size={20} />}</Text>
            </TouchableHighlight>
            <Text style={[Styles.modalParagraph, this.state.checkedPhaseTwo4 ? styles.checkedText : styles.uncheckedText]}>{"I've spaced my meals out according to the app."}</Text>
          </View>

          <Text></Text>

          <TouchableHighlight
            style={[Styles.modalButton,
              this.state.checkedPhaseTwo1 &&
              this.state.checkedPhaseTwo2 &&
              this.state.checkedPhaseTwo3 &&
              this.state.checkedPhaseTwo4 ? null : Styles.modalButtonDisabled]}
            underlayColor={Colors.primaryColor}
            onPress={() => {
              this.state.checkedPhaseTwo1 &&
              this.state.checkedPhaseTwo2 &&
              this.state.checkedPhaseTwo3 &&
              this.state.checkedPhaseTwo4 ? this.props.movePhase(3) : null}}>
            <Text style={[Styles.modalButtonText,
              this.state.checkedPhaseTwo1 &&
              this.state.checkedPhaseTwo2 &&
              this.state.checkedPhaseTwo3 &&
              this.state.checkedPhaseTwo4 ? null : Styles.modalButtonDisabledText]}>
              {"I'M READY!"}</Text>
          </TouchableHighlight>

          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>}
      </View>
    );
  }
};

export default PhaseConfirmationModal;

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: 'row',
    // marginBottom: 10,
    paddingRight: 50
  },
  checkbox: {
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    marginRight: 10,
    width: 32,
    height: 32,
    padding: 5
  },
  checked: {
    backgroundColor: Colors.primaryColor
  },
  checkedText: {
    color: Colors.primaryColor
  },
  uncheckedText: {
    color: Colors.black
  }
});
