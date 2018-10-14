import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

import Header from '../../components/Header';
import ModalWindow from '../../components/ModalWindow';
import MenuRow from '../../components/MenuRow';

import {
  Button,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Help',
  };

  constructor(props) {
    super(props);
    this.state = {
      client: null,
      showBiometricSettings: false,
      showFoodsToAvoid: false,
      showAbout: false,
      showContact: false
    }

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    client.on('value', snapshot => {
      this.setState({
        client: snapshot.val()
      });
    });
  }

  closeModal() {
    this.setState({
      showBiometricSettings: false,
      showFoodsToAvoid: false,
      showAbout: false,
      showContact: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <ScrollView style={Styles.content}>
          <Text style={Styles.menuItem}>How Do I Use the App?</Text>
          <Text style={Styles.menuItemSubText}>Take a tour</Text>

          <Text style={Styles.menuItem}
            onPress={() => this.setState({ showBiometricSettings: true }) }>Biometric Settings</Text>
          <Text style={Styles.menuItemSubText}
            onPress={() => this.setState({ showBiometricSettings: true }) }>What we use to build your meal plan</Text>

          {this.state.showBiometricSettings &&
            <ModalWindow
              currentModal="BIOMETRIC_SETTINGS"
              data={this.state.client}
              closeModal={this.closeModal} />}

          <Text style={Styles.menuItem}
            onPress={() => this.setState({ showFoodsToAvoid: true }) }>Foods to Avoid</Text>
          <Text style={Styles.menuItemSubText}
            onPress={() => this.setState({ showFoodsToAvoid: true }) }>Inflammatory foods</Text>

          {this.state.showFoodsToAvoid &&
            <ModalWindow
              currentModal="FOODS_TO_AVOID"
              data={this.state.client}
              closeModal={this.closeModal} />}

          <Text style={Styles.menuItem}
            onPress={() => Linking.openURL('http://adaptivenutrition.us/member-toolkit')}>Member Toolkit</Text>
          <Text style={Styles.menuItemSubText}>Meal prep, recipes, & more</Text>

          <Text style={Styles.menuItem}
            onPress={() => Linking.openURL('http://adaptivenutrition.us/client-faq')}>Client FAQ</Text>
          <Text style={Styles.menuItemSubText}
            onPress={() => Linking.openURL('http://adaptivenutrition.us/client-faq')}>Answers to our most frequently asked questions</Text>

          <Text style={Styles.menuItem}
            onPress={() => this.setState({ showContact: true }) }>Contact</Text>
          <Text style={Styles.menuItemSubText}
            onPress={() => this.setState({ showContact: true }) }>Have a question or comment? Let us know!</Text>

          {this.state.showContact &&
            <ModalWindow
              currentModal="CONTACT_US"
              closeModal={this.closeModal} />}

          <Text style={Styles.menuItem}
            onPress={() => this.setState({ showAbout: true }) }>About</Text>

          {this.state.showAbout &&
            <ModalWindow
              currentModal="ABOUT"
              data={this.state.client}
              closeModal={this.closeModal} />}
        </ScrollView>
      </View>
    );
  }
}
