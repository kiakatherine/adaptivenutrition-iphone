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
    setTimeout(() => { this.props.closeAlert(); }, 1500);

    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {(this.props.type === 'success') &&
           <Text style={styles.checkmark}>
             <FontAwesome
               name='check'
               size={36} />
           </Text>}

           {(this.props.type === 'error') &&
            <Text style={styles.remove}>
              <FontAwesome
                name='remove'
                size={36} />
            </Text>}

          <Text style={Styles.message}>{this.props.message}</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkmark: {
    color: Colors.primaryColor,
    textAlign: 'center'
  },
  remove: {
    color: Colors.paleRed,
    textAlign: 'center'
  }
});
