import React from 'react';

import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

import { FontAwesome } from 'react-native-vector-icons';

import {
  Button,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class SuccessChecklistModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFoodList: true,
      showLifestyleList: false,
      showFoodsToEliminateList: false
    }
  }

  render() {
    return (
      <View style={Styles.modalContent}>
        <Text style={Styles.modalH1}>Success Checklist</Text>

        <Text style={Styles.paragraphText}>{"These are the items we run through with our private coaching clients any time they stop seeing progress."}</Text>
        <Text style={Styles.paragraphText}>{"By pinpointing one of the issues below, you'll be back on track and making progress towards your goals in no time."}</Text>

        <View style={[Styles.tabButtons, styles.tabButtons]}>
          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showFoodList ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showFoodList: true, showLifestyleList: false, showFoodsToEliminateList: false })}>
            <Text style={this.state.showFoodList ? Styles.tabButtonTextActive : Styles.tabButtonText}>FOOD</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showLifestyleList ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showFoodList: false, showLifestyleList: true, showFoodsToEliminateList: false })}>
            <Text style={this.state.showLifestyleList ? Styles.tabButtonTextActive : Styles.tabButtonText}>LIFESTYLE</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={Colors.gray}
            style={[Styles.tabButton, this.state.showFoodsToEliminateList ? Styles.tabButtonActive : Styles.tabButton]}
            onPress={() => this.setState({ showFoodList: false, showLifestyleList: false, showFoodsToEliminateList: true })}>
            <Text style={this.state.showFoodsToEliminateList ? Styles.tabButtonTextActive : Styles.tabButtonText}>AVOID</Text>
          </TouchableHighlight>
        </View>

        {this.state.showFoodList && <View>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"If there's an item you cannot confidently check off, you know you've found a possible culprit!"}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm only eating foods listed in the app."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm eating my meals according to the timing in the app."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm eating my portion sizes according exactly to the amounts listed in the app."}</Text>
          <Text style={Styles.paragraphText}>{"Note: If cooking with fats, add after cooking instead to be more exact. Eating an excessive amount of veggies can also cause water retention and increase bodyweight. After be mindful that after a while of using the meal plan, it's easy to get lax with the portion sizes and unwittingly eat off plan."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm not drinking alcohol or drinks with calories."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm not eating snacks or extra food outside of the meals in the app."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm not trying to compensate for hunger by making my portions larger."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm not eating soy, gluten, corn, dairy, or eggs."}</Text>
          <Text style={Styles.paragraphText}>{"Note: If you are eating any packaged foods or sauces, make sure the ingredients do not contain any of these foods."}</Text>
        </View>}[

        {this.state.showLifestyleList && <View>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I'm sleeping at least 8 hours a night."}</Text>
          <Text style={Styles.paragraphText}>{"Too little sleep can trigger spikes in cortisol, increase appetite, slow metabolism, and slow growth hormone production which helps control weight."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I don't feel super stressed out."}</Text>
          <Text style={Styles.paragraphText}>{"Cortisol spikes can cause inflammation and increase appetite."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I have had my blood work recently reviewed by my nutrition coach and have no known issues."}</Text>
          <Text style={Styles.paragraphText}>{"Some medical conditions may affect weight."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"I know that my medications do not interfere with my weight."}</Text>
          <Text style={Styles.paragraphText}>{"Example: We once had a client whose oral acne medication dramatically reduced her testosterone levels, making it hard for her to both lose weight and build lean muscle. We prompted a conversation between her and her doctor, and she switched to a medication that she did much better on. Make sure that your medications aren't getting in the way of your goals."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"My bowel movements are regular."}</Text>
          <Text style={Styles.paragraphText}>{"Being 'backed up' can cause your weight to be artificially higher. Make sure you're going at least once a day by drinking enough water (50-75% of your weight in ounces of water), eating a cup of vegetables at each meal, and ensuring your gut is healthy, using probiotic supplements if needed."}</Text>
          <Text style={[Styles.paragraphText, styles.green]}>
            <FontAwesome
              style={styles.checkmark}
              name={'check'}
              size={24} /> {"For females: I'm not currently on my period."}</Text>
          <Text style={Styles.paragraphText}>{"Most women gain a few pounds while on their period. This is completely normal and weight will not accurately reflect progress during this time."}</Text>
        </View>}

        {this.state.showFoodsToEliminateList && <View>
          <Text style={Styles.paragraphText}>{"If none of the food or lifestyle items are an issue, we recommend trying cutting out these foods one at a time, as some people have a sensitivity:"}</Text>
          <Text style={[Styles.paragraphText, styles.red]}>
            <FontAwesome
              style={styles.remove}
              name={'remove'}
              size={24} /> {"Nuts and nut butter"}</Text>
          <Text style={[Styles.paragraphText]}>{"Lectins in some nuts and seeds can irritate the gut lining, causing inflammation."}</Text>
          <Text style={[Styles.paragraphText, styles.red]}>
            <FontAwesome
              style={styles.remove}
              name={'remove'}
              size={24} /> {"White potato skins"}</Text>
          <Text style={Styles.paragraphText}>{"The saponins in these can cause gut permeability."}</Text>
          <Text style={[Styles.paragraphText, styles.red]}>
            <FontAwesome
              style={styles.remove}
              name={'remove'}
              size={24} /> {"Brown rice"}</Text>
          <Text style={Styles.paragraphText}>{"The bran that remains intact around grains of brown rice can be irritating to the gut."}</Text>
          <Text style={[Styles.paragraphText, styles.red]}>
            <FontAwesome
              style={styles.remove}
              name={'remove'}
              size={24} /> {"Avocado"}</Text>
          <Text style={Styles.paragraphText}>{"If you're allergic to latex, you might experience cross-reactivity when eating avocados."}</Text>
        </View>}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  tabButtons: {
    marginBottom: 20
  },
  checkmark: {
    color: Colors.primaryColor
  },
  remove: {
    color: Colors.paleRed
  },
  green: {
    color: Colors.primaryColor
  },
  red: {
    color: Colors.paleRed
  }
});

export default SuccessChecklistModal;
