export function changeUnit(showInGrams, macroType, value, altSource) {
  // value is grams

  if(value === '---' || value === 0 || isNaN(value)) {
    return '---';
  }

  if(!showInGrams) {
    if(macroType === 'protein') {
      return (value/8).toFixed(1) + ' oz';
    } else if(macroType === 'carbs') {
      let carbs;
      let beforeDecimal;
      let afterDecimal;
      let cup;

      if(altSource === 'potatoes') {
        // 1 cup = 37g
        carbs = (Math.round((value/37) * 4) / 4).toFixed(2);
      } else if(altSource === 'sweetPotatoes') {
        // 1 cup = 27g
        carbs = (Math.round((value/27) * 4) / 4).toFixed(2);
      } else if (altSource === 'quinoa') {
        // 1 cup = 40g
        carbs = (Math.round((value/40) * 4) / 4).toFixed(2);
      } else if (altSource === 'pwo') {
        // 1 scoop = 22g
        if(value) {
          return value + 'g';
        } else {
          return '---';
        }
      } else if (altSource === 'banana') {
        // 1 banana = 27g
        // 1/4 banana = 7g
        if(value > 0 && value <= 7) {
          return '1/4 medium banana';
        } else if(value > 7 && value <= 14) {
          return '1/2 medium banana';
        } else if(value > 14 && value <= 21) {
          return '3/4 medium banana';
        } else if(value > 21 && value <= 28) {
          return '1 medium banana';
        } else if(value > 28 && value <= 35) {
          return '1 large banana';
        } else if(value > 35 && value <= 42) {
          return '1 1/4 medium banana';
        } else if(value > 42 && value <= 49) {
          return '1 1/2 medium banana';
        } else {
          return '---';
        }
      } else if (altSource === 'acornButternutSquash') {
        // 1 cup acorn squash = 15g
        // 1 cup butternut squash = 16g
        carbs = (Math.round((value/15) * 4) / 4).toFixed(2);
      } else if (altSource === 'blueberries') {
        // 1 cup blueberries = 21g
        carbs = (Math.round((value/21) * 4) / 4).toFixed(2);
      } else {
        // 1 cup rice = 45g
        // divided by 4 is to get it to the nearest quarter cup
        carbs = (Math.round((value/45) * 4) / 4).toFixed(2);
      }

      beforeDecimal = carbs.split('.')[0] === '0' ? '' : carbs.split('.')[0];
      afterDecimal = carbs.split('.')[1];
      cup = Number(beforeDecimal) <= 1 ? ' cup' : ' cups';

      if(afterDecimal === '50') {
        return beforeDecimal + ' 1/2 ' + cup;
      } else if(afterDecimal === '00') {
        return beforeDecimal + cup;
      } else if(afterDecimal === '75') {
        return beforeDecimal + ' 3/4 ' + cup;
      } else if(afterDecimal === '25') {
        return beforeDecimal + ' 1/4 ' + cup;
      }
    } else if(macroType === 'fat') {
      let fat;
      let fatBeforeDecimal;
      let fatAfterDecimal;
      let fatCup;

      if(isNaN(value)) {
        return '---';
      }

      if(altSource === 'oil') {
        // oils
        // 9 calories per gram of fat
        // 40 calories per tsp oil
        return (Math.round((value*9)/40)).toFixed(0) + ' tsp of olive or coconut oil';
      } else if(altSource === 'butter') {
        // oils
        // 9 calories per gram of fat
        // 40 calories per tsp oil
        return (Math.round((value*9)/40)).toFixed(0) + ' tsp of grass-fed butter';
      } else if(altSource === 'nutButter') {
        // nut butter
        // 9 calories per gram of fat
        // 33 calories per tsp almond butter
        return ((Math.round(value*9)/33)).toFixed(0) + ' tsp of nut butter';
      } else if(altSource === 'avocado') {
        // avocado
        // 9 calories per gram of fat
        // 234 calories in 1 cup avocado
        fat = ((Math.round(value*9)/234)).toFixed(2);

        fatBeforeDecimal = fat.split('.')[0] === '0' ? '' : fat.split('.')[0];
        fatAfterDecimal = Number(fat.split('.')[1]);
        fatAfterDecimal = fatAfterDecimal * 0.01;
        fatCup = Number(fatBeforeDecimal) <= 1 ? ' cup' : ' cups';

        if(fatAfterDecimal >= 0.125 && fatAfterDecimal <= 0.375) {
          return fatBeforeDecimal + ' 1/4 ' + fatCup + ' of avocado';
        } else if(fatAfterDecimal >= 0.375 && fatAfterDecimal <= 0.625) {
          return fatBeforeDecimal + ' 1/2 ' + fatCup + ' of avocado';
        } else if(fatAfterDecimal >= 0.625 && fatAfterDecimal <= 0.875) {
          return fatBeforeDecimal + ' 3/4 ' + fatCup + ' of avocado';
        } else if(fatAfterDecimal > 0.875) {
          if(fatBeforeDecimal !== '') {
            return (fatBeforeDecimal + 1) + fatCup + ' of avocado';
          }
          return '1 cup of avocado';
        } else if(fatAfterDecimal < 0.125) {
          if(fatBeforeDecimal !== '') {
            return fatBeforeDecimal + fatCup + ' of avocado';
          }
          return '---';
        }
      }
    }
  } else {
    if(macroType === 'protein') {
      value = Math.round(value);
    }
    return value + 'g';
  }
}

export function createFoodMenu(macro, currentMeal, phase, sources, selection, isBedtimeMeal, isPwoShake) {
  // this.set('selection', null);

  const currMeal = currentMeal + 1;

  if(macro === 'protein') {
    let proteinString = 'protein' + currMeal;
    const proteinAmount = sources[proteinString];

    if(phase === 3) {
      if(isPwoShake) {
        return [sources[proteinString + 'Grams'] + ' of whey protein'];
      } else {
        const arr = [
          proteinAmount + ' of chicken',
          proteinAmount + ' of turkey',
          proteinAmount + ' of lean beef',
          proteinAmount + ' of fish',
          proteinAmount + ' of lean pork',
          proteinAmount + ' of game meat'
        ];

        if(isBedtimeMeal) {
          arr.push(sources[proteinString + 'casein'] + ' of casein');
        }

        return arr;
      }
    } else {
      return sources;
    }
  } else if(macro === 'carbs') {
    let carbString = 'carbs' + currMeal;
    const carbAmount = sources[carbString];

    if(carbAmount === '---') {
      return ['---'];
    }

    if(isPwoShake) {
      return [
        sources[carbString + 'banana'],
        sources[carbString + 'pwo'] + ' of karbolyn',
        sources[carbString + 'pwo'] + ' of Gatorade',
        sources[carbString + 'pwo'] + ' of Glycofuse',
        sources[carbString + 'pwo'] + ' of Vitargo'
      ];
    } else {
      return [
        carbAmount + ' of rice',
        carbAmount + ' of rolled oats',
        sources[carbString + 'potatoes'] + ' of potatoes',
        sources[carbString + 'quinoa'] + ' of quinoa',
        sources[carbString + 'sweetPotatoes'] + ' of sweet potatoes',
        sources[carbString + 'acornButternutSquash'] + ' of acorn squash',
        sources[carbString + 'acornButternutSquash'] + ' of butternut squash'
      ];
    }
  } else if(macro === 'fats') {
    let fatString = 'fat' + currMeal;
    const fatAmount = sources[fatString];

    return [
      fatAmount,
      sources[fatString + 'butter'],
      sources[fatString + 'nutButter'],
      sources[fatString + 'avocado']
    ];
  } else if(macro === 'veggies') {
    let veggieString = 'veggies' + currMeal;
    const veggieAmount = sources[veggieString];
    const veggieMenu = ['Spinach', 'Broccoli', 'Lettuce', 'Onions', 'Asparagus', 'Kale',
      'Bell peppers', 'Cabbage', 'Cauliflower', 'Celery', 'Cucumbers', 'Mushrooms',
      'Yellow squash', 'Zucchini', 'Mixed veggies'];

    if(veggieAmount === '---') {
      return ['---'];
    }

    let arr = [];

    veggieMenu.forEach(v => {
      arr.push(veggieAmount + ' of ' + v.toLowerCase());
    });

    return arr;
  }
}

export function calculateTotals(age, gender, height, bodyfat, bodyweight, leanMass,
  templateType, trainingIntensity, customMacros,
  customRestDayProtein, customRestDayCarbs, customRestDayFat,
  customModerateDayProtein, customModerateDayCarbs, customModerateDayFat,
  customHeavyDayProtein, customHeavyDayCarbs, customHeavyDayFat) {

  let totals = {};

  // difference
  let difference;

  if(templateType === 1) { // deficit1
    difference = -250;
  } else if(templateType === 2) { // deficit2
    difference = -500;
  } else if(templateType === 3) { // deficit3
    difference = -750;
  } else if(templateType === 4) { // surplus1
    difference = 250;
  } else if(templateType === 5) { // surplus2
     difference = 500;
  } else if(templateType === 6) { // surplus3
    difference = 750;
  } else if(templateType === 0) { // base
    difference = 0;
  }

  // rest day protein
  if(gender === 'Male') {
    totals['restDayProtein'] = bodyfat < 15.1 ? bodyweight : leanMass;
  } else if(gender === 'Female') {
    totals['restDayProtein'] = bodyfat < 20.1 ? bodyweight : leanMass;
  }

  // rest day carbs
  if(leanMass) {
    // var restDayCarbs = Math.round(0.75 * leanMass);
    // this.set('client.restDayCarbs', restDayCarbs);
    // return restDayCarbs;
    totals['restDayCarbs'] = Math.round(0.75 * leanMass);
  }

  // rest day fat
  if(totals['restCaloriesFinal'] && totals['restDayProtein'] && totals['restDayCarbs']) {
    totals['restDayFat'] = Math.round((totals['restCaloriesFinal'] - ((totals['restDayProtein'] * 4) +
      (totals['restDayCarbs'] * 4))) / 9);
    // this.set('client.restDayFat', restDayFat);
    // return restDayFat;
  }

  // rest calories final
  let restCalories;

  if(age && bodyweight && height) {
    if(gender === 'Female') {
      restCalories = Math.round(1.2 * (655 + (4.35 * bodyweight) + (4.7 * height) -
        (4.7 * age)));
      // this.set('client.restCalories', restCalories);
    } else {
      restCalories = Math.round(1.2 * (66 + (6.23 * bodyweight) + (12.7 * height) -
        (6.8 * age)));
      // this.set('client.restCalories', restCalories);
    }
  }

  if(restCalories) {
    totals['restCaloriesFinal'] = restCalories + Number(difference);
    // this.set('client.restCaloriesFinal', restCaloriesFinal);
    // return restCaloriesFinal;
  }

  // custom rest day calories final
  const customRestDayCaloriesFinalProtein = customRestDayProtein ? customRestDayProtein : totals['restDayProtein'];
  const customRestDayCaloriesFinalCarbs = customRestDayCarbs ? customRestDayCarbs : totals['restDayCarbs'];
  const customRestDayCaloriesFinalFat = customRestDayFat ? customRestDayFat : totals['restDayFat'];

  totals['customRestDayCaloriesFinal'] = (Number(customRestDayCaloriesFinalProtein) * 4) + (Number(customRestDayCaloriesFinalCarbs) * 4) + (Number(customRestDayCaloriesFinalFat) * 9);

  // moderate day protein
  if(gender === 'Male') {
    totals['moderateDayProtein'] = bodyfat < 15.1 ? bodyweight : leanMass;
  } else if(gender === 'Female') {
    totals['moderateDayProtein'] = bodyfat < 20.1 ? bodyweight : leanMass;
  }

  // moderate day carbs
  if(bodyweight && leanMass) {
    totals['moderateDayCarbs'] = Math.round(1.25 * leanMass);
    // this.set('client.moderateDayCarbs', moderateDayCarbs);
  }

  // moderate calories final
  let moderateCalories;

  if(age && bodyweight && height) {
    if(gender === 'Female') {
      moderateCalories = Math.round(1.375 * (655 + (4.35 * bodyweight) + (4.7 * height) - (4.7 * age)));
      // this.set('client.moderateCaloriesFemale', moderateCalories);
    } else {
      moderateCalories = Math.round(1.375 * (66 + (6.23 * bodyweight) + (12.7 * height) - (6.8 * age)));
      // this.set('client.moderateCaloriesMale', moderateCalories);
    }
  }

  if(moderateCalories) {
    totals['moderateCaloriesFinal'] = moderateCalories + Number(difference);
    // this.set('client.moderateCaloriesFinal', moderateCaloriesFinal);
    // return moderateCaloriesFinal;
  }

  // moderate day fat
  if(totals['moderateCaloriesFinal'] && totals['moderateDayProtein'] && totals['moderateDayCarbs']) {
    totals['moderateDayFat'] = Math.round((totals['moderateCaloriesFinal'] - ((totals['moderateDayProtein'] * 4) +
      (totals['moderateDayCarbs'] * 4))) / 9);
    // this.set('client.moderateDayFat', moderateDayFat);
    // return moderateDayFat;
  }

  // custom moderate calories final
  const customModerateCaloriesFinalProtein = customModerateDayProtein ? customModerateDayProtein : totals['moderateDayProtein'];
  const customModerateCaloriesFinalCarbs = customModerateDayCarbs ? customModerateDayCarbs : totals['moderateDayCarbs'];
  const customModerateCaloriesFinalFat = customModerateDayFat ? customModerateDayFat : totals['moderateDayFat'];

  totals['customModerateCaloriesFinal'] = (Number(customModerateCaloriesFinalProtein) * 4) + (Number(customModerateCaloriesFinalCarbs) * 4) + (Number(customModerateCaloriesFinalFat) * 9);

  // heavy day protein
  if(gender === 'Male') {
    totals['heavyDayProtein'] = bodyfat < 15.1 ? bodyweight : leanMass;
  } else if(gender === 'Female') {
    totals['heavyDayProtein'] = bodyfat < 20.1 ? bodyweight : leanMass;
  }

  // heavy day carbs
  if(leanMass) {
    totals['heavyDayCarbs'] = Math.round(1.5 * leanMass);
  }

  // heavy calories final
  let heavyCalories;

  if(age && bodyweight && height) {
    if(gender === 'Female') {
      heavyCalories = Math.round(1.55 * (655 + (4.35 * bodyweight) + (4.7 * height) - (4.7 * age)));
      // this.set('client.heavyCalories', heavyCalories);
    } else {
      // fix
      // this.set('client.heavyCalories', Math.round(1.55 * (66 + (6.23 * bodyweight) + (12.7 * height) - (6.8 * age))));
      heavyCalories = Math.round(1.55 * (66 + (6.23 * bodyweight) + (12.7 * height) - (6.8 * age)));
    }
  }

  if(heavyCalories) {
    totals['heavyCaloriesFinal'] = heavyCalories + Number(difference);
    // this.set('client.heavyCaloriesFinal', heavyCaloriesFinal);
    // return heavyCaloriesFinal;
  }

  // heavy day fat
  if(totals['heavyCaloriesFinal'] && totals['heavyDayProtein'] && totals['heavyDayCarbs']) {
    totals['heavyDayFat'] = Math.round((totals['heavyCaloriesFinal'] - ((totals['heavyDayProtein'] * 4) +
      (totals['heavyDayCarbs'] * 4))) / 9);
    // this.set('client.heavyDayFat', heavyDayFat);
    // return heavyDayFat;
  }

  // custom heavy calories final
  const customHeavyCaloriesFinalProtein = customHeavyDayProtein ? customHeavyDayProtein : totals['heavyDayProtein'];
  const customHeavyCaloriesFinalCarbs = customHeavyDayCarbs ? customHeavyDayCarbs : totals['heavyDayCarbs'];
  const customHeavyCaloriesFinalFat = customHeavyDayFat ? customHeavyDayFat : totals['heavyDayFat'];

  totals['customHeavyCaloriesFinal'] = (Number(customHeavyCaloriesFinalProtein) * 4) + (Number(customHeavyCaloriesFinalCarbs) * 4) + (Number(customHeavyCaloriesFinalFat) * 9);

  if(trainingIntensity === 'rest') {
    totals['totalProtein'] = customMacros && customRestDayProtein ? customRestDayProtein : totals['restDayProtein'];
    totals['totalCarbs'] = customMacros && customRestDayCarbs ? customRestDayCarbs : totals['restDayCarbs'];
    totals['totalFat'] = customMacros && customRestDayFat ? customRestDayFat : totals['restDayFat'];
    totals['totalCalories'] = customMacros && totals['customRestCaloriesFinal'] ? totals['customRestCaloriesFinal'] : totals['restCaloriesFinal'];
  } else if(trainingIntensity === 'moderate') {
    totals['totalProtein'] = customMacros && customModerateDayProtein ? customModerateDayProtein : totals['moderateDayProtein'];
    totals['totalCarbs'] = customMacros && customModerateDayCarbs ? customModerateDayCarbs : totals['moderateDayCarbs'];
    totals['totalFat'] = customMacros && customModerateDayFat ? customModerateDayFat : totals['moderateDayFat'];
    totals['totalCalories'] = customMacros && totals['customModerateCaloriesFinal'] ? totals['customModerateCaloriesFinal'] : totals['moderateCaloriesFinal'];
  } else {
    totals['totalProtein'] = customMacros && customHeavyDayProtein ? customHeavyDayProtein : totals['heavyDayProtein'];
    totals['totalCarbs'] = customMacros && customHeavyDayCarbs ? customHeavyDayCarbs : totals['heavyDayCarbs'];
    totals['totalFat'] = customMacros && customHeavyDayFat ? customHeavyDayFat : totals['heavyDayFat'];
    totals['totalCalories'] = customMacros && totals['customHeavyCaloriesFinal'] ? totals['customHeavyCaloriesFinal'] : totals['heavyCaloriesFinal'];
  }

  // totals includes:
  // restDayProtein, restDayCarbs, restDayFat, restCaloriesFinal, customRestCaloriesFinal
  // moderateDayProtein, moderateDayCarbs, moderateDayFat, moderateCaloriesFinal, customModerateCaloriesFinal
  // heavyDayProtein, heavyDayCarbs, heavyDayFat, heavyCaloriesFinal, customHeavyCaloriesFinal
  // totalProtein, totalCarbs, totalFat, totalCalories

  return totals;
}