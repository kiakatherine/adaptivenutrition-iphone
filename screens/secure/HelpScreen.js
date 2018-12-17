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
      showSuccessChecklist: false,
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
      showFoodsToAvoid: false,
      showSuccessChecklist: false,
      showAbout: false,
      showContact: false
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={Styles.body}>
        <View style={Styles.flexRow}>
          <TouchableHighlight
            underlayColor={Colors.white}
            style={[Styles.flexCol, this.state.showMealPlanList ? Styles.progressButtonActive : Styles.progressButton]}
            onPress={() => this.setState({ showMealPlanList: true, showResourcesList: false, showOtherList: false })}>
            <Text style={this.state.showMealPlanList ? Styles.progressButtonTextActive : Styles.progressButtonText}>MEAL PLAN</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={Colors.white}
            style={[Styles.flexCol, this.state.showResourcesList ? Styles.progressButtonActive : Styles.progressButton]}
            onPress={() => this.setState({ showMealPlanList: false, showResourcesList: true, showOtherList: false })}>
            <Text style={this.state.showResourcesList ? Styles.progressButtonTextActive : Styles.progressButtonText}>RESOURCES</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={Colors.white}
            style={[Styles.flexCol, this.state.showOtherList ? Styles.progressButtonActive : Styles.progressButton]}
            onPress={() => this.setState({ showMealPlanList: false, showResourcesList: false, showOtherList: true })}>
            <Text style={this.state.showOtherList ? Styles.progressButtonTextActive : Styles.progressButtonText}>OTHER</Text>
          </TouchableHighlight>
        </View>

        <ScrollView>
          {this.state.showMealPlanList && <View style={styles.helpSection}>
            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}>How to Use the App</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showFoodsToAvoid: true }) }>Foods to Avoid for 6 Weeks</Text>
            </View>
          </View>}

          {this.state.showResourcesList && <View style={styles.helpSection}>
            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/member-toolkit')}>Member Toolkit</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showSuccessChecklist: true }) }>Success Checklist</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('http://adaptivenutrition.us/client-faq')}>Frequently Asked Questions</Text>
            </View>
          </View>}

          {this.state.showOtherList && <View style={styles.helpSection}>
            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => Linking.openURL('https://app.moonclerk.com/portal/ghgknyh4wz8/signin')}>Your Subscription</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showContact: true }) }>Contact</Text>
            </View>

            <View style={Styles.menuItemWrapper}>
              <Text style={Styles.menuItem}
                onPress={() => this.setState({ showAbout: true }) }>About</Text>
            </View>
          </View>}

          {this.state.showFoodsToAvoid &&
            <ModalWindow
              currentModal="FOODS_TO_AVOID"
              data={this.state.client}
              closeModal={this.closeModal} />}

          {this.state.showSuccessChecklist &&
            <ModalWindow
              currentModal="SUCCESS_CHECKLIST"
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
