import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../services/FirebaseService';

import {
  Button,
  Image,
  Keyboard,
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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
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
     return (
       <View>
         <View style={styles.header}>
           {/*<Image source={require('../assets/an_logo.png')} style={styles.logo} />
           <Text style={styles.nameHeaderText}>
            {this.state.client ? this.state.client.name : ''} - Phase {this.state.client ? this.state.client.phase : ''} {(this.state.client && this.state.client.phase === 3) ? "- " + this.state.client.templateType : ''}
           </Text>*/}

           <Text style={styles.headerItem}>
           <MaterialCommunityIcons
             name={'fire'}
             size={16}
           /> Streak
           </Text>

           <Text style={styles.headerItem}>
             <MaterialCommunityIcons
               name={'silverware-fork'}
               size={16}
             /> {"Today's Meals"}
           </Text>

           <Text style={styles.headerItem}>
             <MaterialCommunityIcons
               name={'trophy-outline'}
               size={16}
             /> Points
           </Text>
         </View>
      </View>
     );
   }
}

export default Header;

Header.propTypes = {
};

const styles = StyleSheet.create ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    padding: 10
  },
  headerItem: {
    flex: 1,
    color: Colors.white,
    textAlign: 'center'
  }
  // nameHeader: {
  //   backgroundColor: Colors.secondaryColor,
  //   paddingTop: 10,
  //   paddingBottom: 10
  // },
  // nameHeaderText: {
  //   textAlign: 'center',
  //   color: Colors.white
  // },
  // logo: {
  //   width: 50,
  //   height: 50
  // },
  // header: {
  //   // backgroundColor: Colors.primaryColor,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: 50
  // }
});
