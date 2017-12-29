import React from 'react';

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

const BiometricSettingsModal = (props) => {
  return (
    <View>
      <Text style={{ color: '#FFF' }}>Biometric Settings</Text>
    </View>
    // <ModalWrapper
    //   {...props}
    //   title="Sign in"
    //   width={400}
    //   showOk={false}
    // >
    //   <p>Choose your flavor</p>
    //   <button onClick={() => signIn('facebook')}>Facebook</button>
    //   <button onClick={() => signIn('google')}>Google</button>
    //   <button onClick={() => signIn('twitter')}>Twitter</button>
    // </ModalWrapper>
  );
};

export default BiometricSettingsModal;
