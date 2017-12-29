import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

// import ExportDataModal from './ExportDataModal.jsx';
// import SignInModal from './SignInModal.jsx';
// import FeedbackModal from './FeedbackModal.jsx';
// import BoxDetailsModal from './BoxDetailsModal.jsx';

class ModalWindow extends React.Component {
  // switch (props.currentModal) {
  //  case 'EXPORT_DATA':
  //    return <ExportDataModal {...props}/>;
  //
  //  case 'SOCIAL_SIGN_IN':
  //    return <SignInModal {...props}/>;
  //
  //  case 'FEEDBACK':
  //    return <FeedbackModal {...props}/>;
  //
  //  case 'EDIT_BOX':
  //    return <BoxDetailsModal {...props}/>;
  //
  //  default:
  //    return null;
  //  }

   state = {
     modalVisible: false,
   }

   toggleModal(visible) {
     this.setState({ modalVisible: visible });
   }

   render() {
     return (
       <View>
         <View style={styles.container}>
           <Modal animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { console.log("Modal has been closed.") } }>
            <View style={styles.modal}>
               <Text style={styles.text}>Modal is open!</Text>

               <TouchableHighlight onPress={() => {
                  this.toggleModal(!this.state.modalVisible)}}>

                  <Text style={styles.text}>Close Modal</Text>
               </TouchableHighlight>
            </View>
           </Modal>
         </View>

         <TouchableHighlight onPress={() => {this.toggleModal(true)}}>
            <Text style={styles.text}>{this.props.label}</Text>
         </TouchableHighlight>
       </View>
     );
   }
}

export default ModalWindow;

const styles = StyleSheet.create ({
   container: {
      alignItems: 'flex-start',
      backgroundColor: '#ede3f2'
   },
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f7021a',
      padding: 100
   },
   text: {
     backgroundColor: '#F5F7FD',
     borderBottomWidth: 1,
     borderBottomColor: '#FFF',
     padding: 20
   }
});
