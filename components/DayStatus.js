import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from 'react-native-vector-icons';

import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import moment from 'moment';

import ModalWindow from '../components/ModalWindow';

class DayStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mealNumber: 1,
      showPopupModal: false
    };

    this.completeMeal = this.completeMeal.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showPopup(mealNumber) {
    this.setState({ showPopupModal: true, mealNumber: mealNumber });
  }

  closeModal() {
    this.setState({ showPopupModal: false });
  }

  completeMeal(completion) {
    // TO DO: show success message before closing
    alert(completion);
    this.setState({ showPopupModal: false });
  }

  render() {
     const day = this.props.day;
     const phase = this.props.phase;

     return (
       <View style={styles.dayStatusWrapper}>

        {phase !== 2 && <View>
          <View style={styles.dayStatusMeals}>
            <Text style={styles.dayStatusDate}>{moment(day.fullDate).format('ddd M/D/YY')}</Text>

            <TouchableHighlight style={[
              styles.dayStatusMeal,
              day.meal1 === 1 ? styles.dayStatusMealGood :
              day.meal1 === 2 ? styles.dayStatusMealBad : '']}
              onPress={() => { this.showPopup(1) }}><Text></Text>
            </TouchableHighlight>
            <TouchableHighlight style={[
              styles.dayStatusMeal,
              day.meal2 === 1 ? styles.dayStatusMealGood :
              day.meal2 === 2 ? styles.dayStatusMealBad : '']}
              onPress={() => { this.showPopup(2) }}><Text></Text>
            </TouchableHighlight>
            <TouchableHighlight style={[
              styles.dayStatusMeal,
              day.meal3 === 1 ? styles.dayStatusMealGood :
              day.meal3 === 2 ? styles.dayStatusMealBad : '']}
              onPress={() => { this.showPopup(3) }}><Text></Text>
            </TouchableHighlight>
            <TouchableHighlight style={[
              styles.dayStatusMeal,
              day.meal4 === 1 ? styles.dayStatusMealGood :
              day.meal4 === 2 ? styles.dayStatusMealBad : '']}
              onPress={() => { this.showPopup(4) }}><Text></Text>
            </TouchableHighlight>
            {phase === 3 &&
              <TouchableHighlight style={[
                styles.dayStatusMeal,
                day.meal5 === 1 ? styles.dayStatusMealGood :
                day.meal5 === 2 ? styles.dayStatusMealBad : '']}
                onPress={this.showPopup}><Text></Text>
              </TouchableHighlight>}
            {phase === 3 &&
              <TouchableHighlight style={[
                styles.dayStatusMeal,
                day.meal6 === 1 ? styles.dayStatusMealGood :
                day.meal6 === 2 ? styles.dayStatusMealBad : '']}
                onPress={this.showPopup}><Text></Text>
              </TouchableHighlight>}
          </View>
        </View>}

        {phase === 2 && <View>
          <View style={styles.dayStatusMeals}>
            <Text style={styles.dayStatusDate}>{moment(day.fullDate).format('ddd M/D/YY')}</Text>

            <View style={[
              styles.dayStatusMeal,
              day.meal1measurementsCompleted === 1 ? styles.dayStatusMealGood :
              day.meal1measurementsCompleted === 2 ? styles.dayStatusMealBad : '']}>
            </View>

            <View style={[
              styles.dayStatusMeal,
              day.meal2measurementsCompleted === 1 ? styles.dayStatusMealGood :
              day.meal2measurementsCompleted === 2 ? styles.dayStatusMealBad : '']}>
            </View>

            <View style={[
              styles.dayStatusMeal,
              day.meal3measurementsCompleted === 1 ? styles.dayStatusMealGood :
              day.meal3measurementsCompleted === 2 ? styles.dayStatusMealBad : '']}>
            </View>

            <View style={[
              styles.dayStatusMeal,
              day.meal4measurementsCompleted === 1 ? styles.dayStatusMealGood :
              day.meal4measurementsCompleted === 2 ? styles.dayStatusMealBad : '']}>
            </View>
          </View>
        </View>}

        {this.state.showPopupModal &&
          <ModalWindow
            currentModal="MEAL_COMPLETION"
            date={moment(day.fullDate).format('dddd MMM D')}
            mealNumber={this.state.mealNumber}
            completeMeal={this.completeMeal}
            closeModal={this.closeModal} />}
       </View>
     );
   }
}

export default DayStatus;

DayStatus.propTypes = { };

const styles = StyleSheet.create ({
  dayStatusMeals: {
    display: 'flex',
    flexDirection: 'row',
  },
  dayStatusMeal: {
    flex: 1,
    height: 20,
    backgroundColor: Colors.lightGray
  },
  dayStatusMealGood: {
    backgroundColor: Colors.paleGreen
  },
  dayStatusMealBad: {
    backgroundColor: Colors.paleRed
  },
  dayStatusDate: {
    width: 100
  }
});
