import React from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const MenuRow = (props) => {
  return (
    <TouchableHighlight
      style={styles.touchableHighlight}>
        <Text>{props.name}</Text>
      </TouchableHighlight>
  );
}

const styles = StyleSheet.create ({
   touchableHighlight: {
     backgroundColor: '#F5F7FD',
     borderBottomWidth: 1,
     borderBottomColor: '#FFF',
     padding: 20
   }
});

export default MenuRow;
