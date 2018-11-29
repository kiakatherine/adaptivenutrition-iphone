import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Image,
  Keyboard,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import { FontAwesome, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    setTimeout(() => { this.props.closeAlert(); }, 1750);

    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {(this.props.type === 'success') &&
           <Text style={styles.checkmark}>
             <FontAwesome
               name='check'
               size={24} />
           </Text>}

           {(this.props.type === 'failure') &&
            <Text style={styles.checkmark}>
              <FontAwesome
                name='check'
                size={24} />
            </Text>}

          <Text style={styles.message}>{this.props.message}</Text>
        </View>
      </View>
     );
   }
}

export default Alert;

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

const styles = StyleSheet.create ({
  wrapper: {
    // height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: {
    color: Colors.primaryColor,
    textAlign: 'center'
  },
  message: {
    fontSize: 22,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 15
  }
});
