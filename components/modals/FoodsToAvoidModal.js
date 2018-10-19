import React from 'react';

// import ModalWrapper from '../ModalWrapper.jsx';

import Styles from '../../constants/Styles';

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

const FoodsToAvoidModal = props => {
  return (
    <View style={Styles.modalContent}>
      <Text style={Styles.modalH1}>Foods To Avoid</Text>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Gluten (includes beer)</Text>
        <Text style={Styles.paragraphText}>Gluten is problematic for most people, causing gut permeability and irritating the digestive tract. While most people are not celiac or gluten intolerant, major improvements in gut health are often made when removing gluten.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Dairy (cheese, milk, yogurt)</Text>
        <Text style={Styles.paragraphText}>Most dairy products cause an increase in mucus production and exacerbate or cause auto-immune conditions. Some plain, sugar free, fermented dairy, such as greek yogurt or skyr, is often tolerated well.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Sugar</Text>
        <Text style={Styles.paragraphText}>Sugar causes blood sugar spikes, resulting in insulin spikes driving insulin resistance and storage of sugar as fat.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Alcohol</Text>
        <Text style={Styles.paragraphText}>Alcohol irritates the gut and disrupts sleep. It can negatively affect hormone profiles and reduce testosterone levels.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Soy</Text>
        <Text style={Styles.paragraphText}>Soy has been shown to cause disruption to healthy hormone levels and increase estrogen production.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Legumes (beans, chickpeas, hummus)</Text>
        <Text style={Styles.paragraphText}>Unless soaked adequately in water beforehand, legumes have been linked to leaky gut and digestive system irritation.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Processed and packaged foods</Text>
        <Text style={Styles.paragraphText}>Processed and packaged foods more than likely contain chemicals and preservatives, as well as sugar, dairy, soy, and/or wheat.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Corn</Text>
        <Text style={Styles.paragraphText}>Corn, while gluten-free, can cause a similar reaction to gluten in the gut, exacerbating existing leaky gut or IBS conditions.</Text>
      </View>

      <View style={Styles.listItem}>
        <Text style={Styles.h3}>Eggs</Text>
        <Text style={Styles.paragraphText}>Eggs are by energy content a fat source, not a protein source, making them ill-suited as a source of lean protein. Additionally, egg whites are often poorly tolerated by most people's digestive systems, especially if they're already compromised by leaky gut or inflammation. Eggs should be eliminated initially, however may be re-introduced to test tolerance after healing your digestive tract.</Text>
      </View>
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

export default FoodsToAvoidModal;
