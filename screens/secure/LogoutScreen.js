import React from 'react';

import {
  Button,
  Image,
  Text,
  View,
  Modal
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

  _logout() {
    this.props.closeLogoutModal()
    
  }

  render() {
    return (
      <View style={Styles.body}>
        <Modal animationType={"slide"}
          transparent={false}
          onRequestClose={() => { console.log("Modal has been closed.") } }>
          <View style={Styles.title}>
            <Image source={require('../../assets/an_logo.png')} style={{ width: 75, height: 75 }} />
          </View>
          <View style={Styles.content}>
            <Text style={Styles.contentHeading}>Are you sure you want to logout?</Text>
            <Button
              title="Yep!"
              onPress={()=> {
                this.props.closeLogoutModal()
              }}
            />
          </View>
        </Modal>
      </View>
    )
  }
}
