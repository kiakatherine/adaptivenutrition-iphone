import React from 'react';

import {
  Button,
  Text,
  View
} from 'react-native';

import AuthService from '../../services/AuthService';

import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';

export default class LogoutScreen extends React.Component {
  static navigationOptions = {
    title: 'Logout',
  };

  constructor (props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  async _logout() {
    const { navigate } = this.props.navigation;
    await AuthService.logout();
    navigate('Login');
  }

  render() {
    return (
      <View style={Styles.body}>
        <View style={Styles.title}>
          <Text style={Styles.titleText}>Adaptive Nutrition</Text>
        </View>
        <View style={Styles.content}>
          <Text style={Styles.contentHeading}>Are you sure you want to logout?</Text>
          <Button
            title="Yep!"
            onPress={this._logout}
          />
        </View>
      </View>
    )
  }
}
