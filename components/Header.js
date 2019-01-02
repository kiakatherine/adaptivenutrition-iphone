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

    this._closeModal = this._closeModal.bind(this);
    this._saveTemplateType = this._saveTemplateType.bind(this);
    this._clickGoal = this._clickGoal.bind(this);
  }

  _closeModal(page) {
    this.setState({
      showPoints: false,
      showUserInfo: false
    }, () => {
      if(page == "logout") {
        this.props.logout()
      }
    });
  }

  _saveTemplateType() {
    this.props.saveTemplateType();
  }

  _clickGoal(goal) {
    this.props.clickGoal(goal);
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
                   size={24} /> {this.props.client ? this.props.client.displayName : null}
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

           {this.props.phase === 2 &&
             <Text style={styles.headerItem}>
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase2meal1 === 1 ? styles.complete :
                  this.props.phase2meal1 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase2meal2 === 1 ? styles.complete :
                  this.props.phase2meal2 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase2meal3 === 1 ? styles.complete :
                  this.props.phase2meal3 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
               <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase2meal4 === 1 ? styles.complete :
                  this.props.phase2meal4 === 2 ? styles.completeBad :
                  styles.incomplete]}
                 name={'check'}
                 size={28} />
              </Text>}

           {this.props.phase === 3 && this.props.trainingIntensity === 0 &&
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

            {this.props.phase === 3 && this.props.trainingIntensity > 0 &&
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
                <FontAwesome
                 style={[styles.checkmark,
                  this.props.phase3meal5 === 1 ? styles.complete :
                  this.props.phase3meal5 === 2 ? styles.completeBad :
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
            client={this.props.client ? this.props.client : null}
            closeModal={(page)=> this._closeModal(page)} /> }

        {this.state.showUserInfo &&
          <ModalWindow
            currentModal="USER"
            clickGoal={this._clickGoal}
            saveTemplateType={this._saveTemplateType}
            onChangeGender={this.props.onChangeGender}
            onChangeBodyweight={this.props.onChangeBodyweight}
            onChangeHeight={this.props.onChangeHeight}
            onChangeBodyfat={this.props.onChangeBodyfat}
            onChangeBirthdate={this.props.onChangeBirthdate}
            client={this.props.client ? this.props.client : null}
            wide={true}
            closeModal={(page)=> this._closeModal(page)}
            /> }
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
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.lightGray
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
    color: Colors.primaryColor
  },
  completeBad: {
    color: Colors.paleRed
  },
  incomplete: {
    color: Colors.gray
  }
});
