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

class TemplateConfirmationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedTemplate1: false,
      checkedTemplate2: false,
      checkedTemplate3: false,
      checkedTemplate4: false,
      checkedTemplate5: false,
      checkedTemplate6: false
    };
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={Styles.modalH1}>{"Let's take it to the next level"}</Text>

        <Text style={Styles.modalParagraph}>{"But first, let's quickly ensure you're set up for success!"}</Text>
        <Text style={Styles.modalParagraph}>{"Check off the items below to confirm you're ready to move forward."}</Text>
        <Text style={Styles.modalParagraph}>{"If you're unsure about any of them, no worries. We advise spending a few more days on the current step nailing these down before moving on. (It might be harder to see results otherwise.)"}</Text>

        <View>
          <View style={[styles.checkboxRow, this.state.checkedTemplate1 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedTemplate1: !this.state.checkedTemplate1 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedTemplate1 ? styles.checkedText : styles.uncheckedText]}>I have stayed on {this.props.currentTemplate} for at least 1 week.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedTemplate2 ? styles.checked : '']}>
            <TouchableHighlight
              onPress={ () => { this.setState({ checkedTemplate2: !this.state.checkedTemplate2 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedTemplate2 ? styles.checkedText : styles.uncheckedText]}>I have gotten all my meals in each day.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedTemplate3 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedTemplate3: !this.state.checkedTemplate3 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedTemplate3 ? styles.checkedText : styles.uncheckedText]}>I have eaten according to the food options in the app.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedTemplate4 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedTemplate4: !this.state.checkedTemplate4 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedTemplate4 ? styles.checkedText : styles.uncheckedText]}>I have spaced my meals out according to the app.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedTemplate5 ? styles.checked : '']}>
            <TouchableHighlight
              underlayColor={Colors.secondaryColor}
              onPress={ () => { this.setState({ checkedTemplate5: !this.state.checkedTemplate5 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedTemplate5 ? styles.checkedText : styles.uncheckedText]}>I have gotten 7+ hours of sleep each night.</Text>
            </TouchableHighlight>
          </View>

          <View style={[styles.checkboxRow, this.state.checkedTemplate6 ? styles.checked : '']}>
            <TouchableHighlight
              onPress={ () => { this.setState({ checkedTemplate6: !this.state.checkedTemplate6 }); }}>
              <Text style={[Styles.modalParagraph, this.state.checkedTemplate6 ? styles.checkedText : styles.uncheckedText]}>My body weight has been relatively consistent for the past 5+ days.</Text>
            </TouchableHighlight>
          </View>

        </View>

        <TouchableHighlight
          style={[Styles.modalButton,
            this.state.checkedTemplate1 &&
            this.state.checkedTemplate2 &&
            this.state.checkedTemplate3 &&
            this.state.checkedTemplate4 &&
            this.state.checkedTemplate5 &&
            this.state.checkedTemplate6 ? '' : Styles.modalButtonDisabled]}
          underlayColor={Colors.primaryColor}
          onPress={
            this.state.checkedTemplate1 &&
            this.state.checkedTemplate2 &&
            this.state.checkedTemplate3 &&
            this.state.checkedTemplate4 &&
            this.state.checkedTemplate5 &&
            this.state.checkedTemplate6 ? this.props.saveTemplateType : null}>
          <Text style={[Styles.modalButtonText,
            this.state.checkedTemplate1 &&
            this.state.checkedTemplate2 &&
            this.state.checkedTemplate3 &&
            this.state.checkedTemplate4 &&
            this.state.checkedTemplate5 &&
            this.state.checkedTemplate6 ? '' : Styles.modalButtonDisabledText]}>
            CONFIRM</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default TemplateConfirmationModal;

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
