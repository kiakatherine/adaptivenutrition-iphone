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
      showMealPlanList: true,
      showResourcesList: false,
      showOtherList: false,
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
        <Text style={[Styles.bigTitle, Styles.pageTitle]}>Help</Text>

        <View style={Styles.tabButtons}>
          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showMealPlanList ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showMealPlanList: true, showResourcesList: false, showOtherList: false })}>
            <Text style={this.state.showMealPlanList ? Styles.tabButtonTextActive : Styles.tabButtonText}>MEAL PLAN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showResourcesList ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showMealPlanList: false, showResourcesList: true, showOtherList: false })}>
            <Text style={this.state.showResourcesList ? Styles.tabButtonTextActive : Styles.tabButtonText}>RESOURCES</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showOtherList ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showMealPlanList: false, showResourcesList: false, showOtherList: true })}>
            <Text style={this.state.showOtherList ? Styles.tabButtonTextActive : Styles.tabButtonText}>OTHER</Text>
          </TouchableHighlight>
        </View>

        <ScrollView>
          {this.state.showMealPlanList && <View style={styles.helpSection}>
            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}>How Do I Use the App?</Text>
              <Text style={Styles.menuItemSubText}>Take a tour!</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showBiometricSettings: true }) }>Biometric Settings</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => this.setState({ showBiometricSettings: true }) }>Settings used to create your meal plan.</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showFoodsToAvoid: true }) }>Foods to Avoid</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => this.setState({ showFoodsToAvoid: true }) }>Inflammatory foods to remove for 6 weeks.</Text>
            </View>
          </View>}

          {this.state.showResourcesList && <View style={styles.helpSection}>
            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/success-checklist')}>Success Checklist</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/success-checklist')}>If you stop seeing progress, use this list to help pinpoint issues.</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/member-toolkit')}>Member Toolkit</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/member-toolkit')}>Meal prep, recipes, & more.</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/client-faq')}>Client FAQ</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/client-faq')}>Answers to our most frequently asked questions.</Text>
            </View>
          </View>}

          {this.state.showOtherList && <View style={styles.helpSection}>
            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('https://app.moonclerk.com/portal/ghgknyh4wz8/signin')}>Your Subscription</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => Linking.openURL('https://app.moonclerk.com/portal/ghgknyh4wz8/signin')}>Manage your subscription.</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showContact: true }) }>Contact</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => this.setState({ showContact: true }) }>Have a question or comment? Let us know!</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showAbout: true }) }>About</Text>
              <Text style={Styles.menuItemSubText}
                onPress={() => this.setState({ showAbout: true }) }>Who is Adaptive Nutrition?</Text>
            </View>
          </View>}

          {this.state.showBiometricSettings &&
            <ModalWindow
              currentModal="BIOMETRIC_SETTINGS"
              data={this.state.client}
              closeModal={this.closeModal} />}

          {this.state.showFoodsToAvoid &&
            <ModalWindow
              currentModal="FOODS_TO_AVOID"
              data={this.state.client}
              closeModal={this.closeModal} />}

          {this.state.showContact &&
            <ModalWindow
              currentModal="CONTACT_US"
              closeModal={this.closeModal} />}

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

const styles = StyleSheet.create({ });
