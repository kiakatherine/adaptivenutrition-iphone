import React from 'react';

import firebase from '../../services/FirebaseService';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

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
      client: null
    }
  }

  componentWillMount() {
    var client = firebase.database().ref('clients/-L5KTqELYJEOv55oR8bF');

    client.on('value', snapshot => {
      this.setState({
        client: snapshot.val()
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
        </View>

        <ScrollView style={Styles.content}>
          <Text style={Styles.menuItem}>How Do I Use the App?</Text>
          <Text style={Styles.menuItemSubText}>Take a tour</Text>

          <ModalWindow label="Biometric Settings" currentModal="BIOMETRIC_SETTINGS" data={this.state.client}  />
          <Text style={Styles.menuItemSubText}>What we use to build your meal plan</Text>

          <ModalWindow label="Foods to Avoid" currentModal="FOODS_TO_AVOID" />
          <Text style={Styles.menuItemSubText}>Inflammatory foods</Text>

          <Text style={Styles.menuItem} onPress={() => Linking.openURL('http://adaptivenutrition.us/member-toolkit')}>Member Toolkit</Text>
          <Text style={Styles.menuItemSubText}>Meal prep, recipes, & more</Text>

          <Text style={Styles.menuItem} onPress={() => Linking.openURL('http://adaptivenutrition.us/client-faq')}>Client FAQ</Text>
          <Text style={Styles.menuItemSubText}>Answers to our most frequently asked questions</Text>

          <Text style={Styles.menuItem} onPress={() => Linking.openURL('mailto:support@adaptivenutrition.us')}>Email Us</Text>
          <Text style={Styles.menuItemSubText}>Have a question or comment? Let us know!</Text>

          <ModalWindow label="About" currentModal="ABOUT" />
        </ScrollView>
      </View>
    );
  }
}
