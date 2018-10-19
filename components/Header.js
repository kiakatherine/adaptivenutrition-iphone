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

import ModalWindow from '../components/ModalWindow';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPoints: false,
      showUserInfo: false
    };

    this._onChangeGender = this._onChangeGender.bind(this);
    this._onChangeBodyweight = this._onChangeBodyweight.bind(this);
    this._onChangeHeight = this._onChangeHeight.bind(this);
    this._onChangeBodyfat = this._onChangeBodyfat.bind(this);
    this._onChangeBirthdate = this._onChangeBirthdate.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  componentDidMount() {
    const clientId = firebase.auth().currentUser.uid;
    const clientRef = firebase.database().ref('/client/' + clientId);
    console.log('currentuser', firebase.auth().currentUser);
    clientRef.on('value', snapshot => {
      console.log('snapshot', snapshot.val())
      this.setState({ client: snapshot.val() });
    });
  }

  _onChangeGender(g) {
    const clientId = firebase.auth().currentUser.uid;
    const clientRef = firebase.database().ref('/client/' + clientId);
    clientRef.update({ gender: g });
  }

  _onChangeBodyweight(text) {
    var client = this.state.client;
    client.update({ bodyweight: Number(text) });
  }

  _onChangeHeight(text) {
    var client = this.state.client;
    client.update({ height: Number(text) });
  }

  _onChangeBodyfat(text) {
    var client = this.state.client;
    client.update({ bodyfat: Number(text) });
  }

  _onChangeBirthdate(text) {
    var client = this.state.client;
    client.update({ birthdate: format(text, "MMMM D, YYYY") });
    this.setState({ birthdate: format(text, "MMMM D, YYYY") });
    this._showDatePicker();
  }

  _closeModal() {
    this.setState({ showPoints: false, showUserInfo: false });
  }

   render() {
     return (
       <View>
         <View style={styles.header}>
           {/*<Image source={require('../assets/an_logo.png')} style={styles.logo} />
           <Text style={styles.nameHeaderText}>
            {this.state.client ? this.state.client.name : ''} - Phase {this.state.client ? this.state.client.phase : ''} {(this.state.client && this.state.client.phase === 3) ? "- " + this.state.client.templateType : ''}
           </Text>*/}

           <TouchableHighlight
             underlayColor={Colors.white}
             onPress={() => { this.setState({ showUserInfo: true }) }}>
               <Text style={styles.headerItem}>
                 <FontAwesome
                   name={'user'}
                   size={24} /> {this.state.client ? this.state.client.displayName : null}
               </Text>
           </TouchableHighlight>

          {this.props.phase === 1 &&
            <Text style={styles.headerItem}>
              <FontAwesome
                style={[styles.checkmark,
                  this.props.phase1meal1 === 1 ? styles.complete :
                  this.props.phase1meal1 === 2 ? styles.completeBad :
                  styles.incomplete]}
                name={'check'}
                size={28} />
              <FontAwesome
                style={[styles.checkmark,
                  this.props.phase1meal2 === 1 ? styles.complete :
                  this.props.phase1meal2 === 2 ? styles.completeBad :
                  styles.incomplete]}
                name={'check'}
                size={28} />
              <FontAwesome
                style={[styles.checkmark,
                  this.props.phase1meal3 === 1 ? styles.complete :
                  this.props.phase1meal3 === 2 ? styles.completeBad :
                  styles.incomplete]}
                name={'check'}
                size={28} />
              <FontAwesome
                style={[styles.checkmark,
                  this.props.phase1meal4 === 1 ? styles.complete :
                  this.props.phase1meal4 === 2 ? styles.completeBad :
                  styles.incomplete]}
                name={'check'}
                size={28} />
             </Text>}

           {this.props.phase === 3 &&
             <Text style={styles.headerItem}>
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase3meal1 === 1 ? styles.complete :
                  this.props.phase3meal1 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase3meal2 === 1 ? styles.complete :
                  this.props.phase3meal2 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase3meal3 === 1 ? styles.complete :
                  this.props.phase3meal3 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase3meal4 === 1 ? styles.complete :
                  this.props.phase3meal4 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
              </Text>}

           <TouchableHighlight
             underlayColor={Colors.white}
             onPress={() => { this.setState({ showPoints: true }) }}>
              <Text style={styles.headerItem}>
                <FontAwesome
                  name={'trophy'}
                  size={24} /> {this.props.points}
              </Text>
           </TouchableHighlight>
         </View>

        {this.state.showPoints &&
          <ModalWindow
            currentModal="POINTS"
            closeModal={this._closeModal} /> }

        {this.state.showUserInfo &&
          <ModalWindow
            currentModal="USER"
            onChangeGender={this._onChangeGender}
            onChangeBodyweight={this._onChangeBodyweight}
            onChangeHeight={this._onChangeHeight}
            onChangeBodyfat={this._onChangeBodyfat}
            onChangeBirthdate={this._onChangeBirthdate}
            client={this.state.client ? this.state.client : null}
            wide={true}
            closeModal={this._closeModal} /> }
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
    backgroundColor: Colors.white,
    padding: 10
  },
  headerItem: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Futura',
    color: Colors.black,
    textAlign: 'center'
  },
  checkmark: {
    marginRight: 5
  },
  complete: {
    color: Colors.secondaryColor
  },
  completeBad: {
    color: Colors.paleRed
  },
  incomplete: {
    color: Colors.gray
  }
});
