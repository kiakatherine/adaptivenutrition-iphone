export function calcProtein(trainingIntensity, mealsBeforeWorkout, totalProtein, proteinDelta) {
  let protein = [];

  if(trainingIntensity === 0) {
    protein[0] = Math.round(totalProtein * 0.25);
    protein[1] = Math.round(totalProtein * 0.25);
    protein[2] = Math.round(totalProtein * 0.25);
    protein[3] = Math.round(totalProtein * 0.25);
    protein[4] = proteinDelta;
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      protein[0] = proteinDelta;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
    } else if(mealsBeforeWorkout === 1) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = proteinDelta;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
    } else if(mealsBeforeWorkout === 2) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = proteinDelta;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
    } else if(mealsBeforeWorkout === 3) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = proteinDelta;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
    } else if(mealsBeforeWorkout === 4) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = proteinDelta;
    }
  }

  return protein;
}

export function calcCarbs(trainingIntensity, mealsBeforeWorkout, totalCarbs, carbDelta) {
  let carbs = [];

  if(trainingIntensity === 0) {
    carbs[0] = Math.round(totalCarbs * 0.25);
    carbs[1] = Math.round(totalCarbs * 0.25);
    carbs[2] = Math.round(totalCarbs * 0.25);
    carbs[3] = Math.round(totalCarbs * 0.25);
    carbs[4] = '---';
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      carbs[0] = carbDelta;
      carbs[1] = Math.round((totalCarbs - carbDelta) * 0.4);
      carbs[2] = Math.round((totalCarbs - carbDelta) * 0.3);
      carbs[3] = Math.round((totalCarbs - carbDelta) * 0.15);
      carbs[4] = Math.round((totalCarbs - carbDelta) * 0.15);
    } else if(mealsBeforeWorkout === 1) {
      carbs[0] = Math.round((totalCarbs - carbDelta) * 0.3);
      carbs[1] = carbDelta;
      carbs[2] = Math.round((totalCarbs - carbDelta) * 0.4);
      carbs[3] = Math.round((totalCarbs - carbDelta) * 0.2);
      carbs[4] = Math.round((totalCarbs - carbDelta) * 0.1);
    } else if(mealsBeforeWorkout === 2) {
      carbs[0] = Math.round((totalCarbs - carbDelta) * 0.15);
      carbs[1] = Math.round((totalCarbs - carbDelta) * 0.3);
      carbs[2] = carbDelta;
      carbs[3] = Math.round((totalCarbs - carbDelta) * 0.15);
      carbs[4] = Math.round((totalCarbs - carbDelta) * 0.3);
    } else if(mealsBeforeWorkout === 3) {
      carbs[0] = Math.round((totalCarbs - carbDelta) * 0.15);
      carbs[1] = Math.round((totalCarbs - carbDelta) * 0.15);
      carbs[2] = Math.round((totalCarbs - carbDelta) * 0.3);
      carbs[3] = carbDelta;
      carbs[4] = Math.round((totalCarbs - carbDelta) * 0.4);
    } else if(mealsBeforeWorkout === 4) {
      carbs[0] = Math.round((totalCarbs - carbDelta) * 0.4);
      carbs[1] = Math.round((totalCarbs - carbDelta) * 0.4);
      carbs[2] = Math.round((totalCarbs - carbDelta) * 0.2);
      carbs[3] = carbDelta;
      carbs[4] = Math.round((totalCarbs - carbDelta) * 0.4);
    }
  }

  return carbs;
}

export function calcFat(trainingIntensity, mealsBeforeWorkout, totalFat) {
  let fats = [];

  if(trainingIntensity === 0) {
    fats[0] = Math.round(totalFat * 0.25);
    fats[1] = Math.round(totalFat * 0.25);
    fats[2] = Math.round(totalFat * 0.25);
    fats[3] = Math.round(totalFat * 0.25);
    fats[4] = '---';
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      fats[0] = '---';
      fats[1] = '---';
      fats[2] = Math.round(totalFat * 0.2);
      fats[3] = Math.round(totalFat * 0.4);
      fats[4] = Math.round(totalFat * 0.4);
    } else if(mealsBeforeWorkout === 1) {
      fats[0] = Math.round(totalFat * 0.2);
      fats[1] = '---';
      fats[2] = '---';
      fats[3] = Math.round(totalFat * 0.4);
      fats[4] = Math.round(totalFat * 0.4);
    } else if(mealsBeforeWorkout === 2) {
      fats[0] = Math.round(totalFat * 0.4);
      fats[1] = Math.round(totalFat * 0.2);
      fats[2] = '---';
      fats[3] = '---';
      fats[4] = Math.round(totalFat * 0.4);
    } else if(mealsBeforeWorkout === 3) {
      fats[0] = Math.round(totalFat * 0.4);
      fats[1] = Math.round(totalFat * 0.4);
      fats[2] = Math.round(totalFat * 0.2);
      fats[3] = '---';
      fats[4] = '---';
    } else if(mealsBeforeWorkout === 4) {
      fats[0] = Math.round(totalFat * 0.4);
      fats[1] = Math.round(totalFat * 0.3);
      fats[2] = Math.round(totalFat * 0.15);
      fats[3] = Math.round(totalFat * 0.15);
      fats[4] = '---';
    }
  }

  return fats;
}

export function calcVeggies(trainingIntensity, mealsBeforeWorkout) {
  let veggies = [];

  if(trainingIntensity === 0) {
    veggies[0] = '1+ cups';
    veggies[1] = '1+ cups';
    veggies[2] = '1+ cups';
    veggies[3] = '1+ cups';
    veggies[4] = '---';
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      veggies[0] = '---';
      veggies[1] = '1+ cups';
      veggies[2] = '1+ cups';
      veggies[3] = '1+ cups';
      veggies[4] = '1+ cups';
      veggies[5] = '---';
    } else if(mealsBeforeWorkout === 1) {
      veggies[0] = '1+ cups';
      veggies[1] = '---';
      veggies[2] = '1+ cups';
      veggies[3] = '1+ cups';
      veggies[4] = '1+ cups';
      veggies[5] = '---';
    } else if(mealsBeforeWorkout === 2) {
      veggies[0] = '1+ cups';
      veggies[1] = '1+ cups';
      veggies[2] = '---';
      veggies[3] = '1+ cups';
      veggies[4] = '1+ cups';
      veggies[5] = '---';
    } else if(mealsBeforeWorkout === 3) {
      veggies[0] = '1+ cups';
      veggies[1] = '1+ cups';
      veggies[2] = '1+ cups';
      veggies[3] = '---';
      veggies[4] = '1+ cups';
      veggies[5] = '---';
    } else if(mealsBeforeWorkout === 4) {
      veggies[0] = '1+ cups';
      veggies[1] = '1+ cups';
      veggies[2] = '1+ cups';
      veggies[3] = '1+ cups';
      veggies[4] = '---';
      veggies[5] = '---';
    }
  }

  return veggies;
}

export function calculateTotals(age, gender, height, bodyfat, bodyweight, leanMass,
  weight1, weight2, templateType, trainingIntensity, customMacros,
  customRestDayProtein, customRestDayCarbs, customRestDayFat,
  customModerateDayProtein, customModerateDayCarbs, customModerateDayFat,
  customHeavyDayProtein, customHeavyDayCarbs, customHeavyDayFat, templates, macroRatios) {

  let totals = {};
  const bmr = calculateBmr(gender, age, height, bodyweight);
  const difference = calculateDifference(gender, age, height, weight2, bmr, bodyweight, templateType, templates.templates);

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
    totals['restCaloriesFinal'] = restCalories + difference;
    // this.set('client.restCaloriesFinal', restCaloriesFinal);
    // return restCaloriesFinal;
  }

  // rest day protein
  // rest day carbs
  // rest day fat
  if(totals['restCaloriesFinal']) {
    totals['restDayProtein'] = Math.round(calculateProteinPercentage(gender, bodyfat, macroRatios) * totals['restCaloriesFinal'] / 4);
    totals['restDayCarbs'] = Math.round(calculateCarbPercentage(gender, bodyfat, macroRatios) * totals['restCaloriesFinal'] / 4);
    totals['restDayFat'] = Math.round(calculateFatPercentage(gender, bodyfat, macroRatios) * totals['restCaloriesFinal'] / 9);
    // this.set('client.restDayFat', restDayFat);
    // return restDayFat;
  }

  // custom rest day calories final
  const customRestDayCaloriesFinalProtein = customRestDayProtein ? customRestDayProtein : totals['restDayProtein'];
  const customRestDayCaloriesFinalCarbs = customRestDayCarbs ? customRestDayCarbs : totals['restDayCarbs'];
  const customRestDayCaloriesFinalFat = customRestDayFat ? customRestDayFat : totals['restDayFat'];

  totals['customRestDayCaloriesFinal'] = (Number(customRestDayCaloriesFinalProtein) * 4) + (Number(customRestDayCaloriesFinalCarbs) * 4) + (Number(customRestDayCaloriesFinalFat) * 9);

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
    totals['moderateCaloriesFinal'] = moderateCalories + difference;
    // this.set('client.moderateCaloriesFinal', moderateCaloriesFinal);
    // return moderateCaloriesFinal;
  }

  // moderate day protein
  // moderate day carbs
  // moderate day fat
  if(totals['moderateCaloriesFinal']) {
    totals['moderateDayProtein'] = Math.round(calculateProteinPercentage(gender, bodyfat, macroRatios) * totals['moderateCaloriesFinal'] / 4);
    totals['moderateDayCarbs'] = Math.round(calculateCarbPercentage(gender, bodyfat, macroRatios) * totals['moderateCaloriesFinal'] / 4);
    totals['moderateDayFat'] = Math.round(calculateFatPercentage(gender, bodyfat, macroRatios) * totals['moderateCaloriesFinal'] / 9);
    // this.set('client.moderateDayFat', moderateDayFat);
    // return moderateDayFat;
  }

  // custom moderate calories final
  const customModerateCaloriesFinalProtein = customModerateDayProtein ? customModerateDayProtein : totals['moderateDayProtein'];
  const customModerateCaloriesFinalCarbs = customModerateDayCarbs ? customModerateDayCarbs : totals['moderateDayCarbs'];
  const customModerateCaloriesFinalFat = customModerateDayFat ? customModerateDayFat : totals['moderateDayFat'];

  totals['customModerateCaloriesFinal'] = (Number(customModerateCaloriesFinalProtein) * 4) + (Number(customModerateCaloriesFinalCarbs) * 4) + (Number(customModerateCaloriesFinalFat) * 9);

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
    totals['heavyCaloriesFinal'] = heavyCalories + difference;
    // this.set('client.heavyCaloriesFinal', heavyCaloriesFinal);
    // return heavyCaloriesFinal;
  }

  // heavy day protein
  // heavy day carbs
  // heavy day fat
  if(totals['heavyCaloriesFinal']) {
    totals['heavyDayProtein'] = Math.round(calculateProteinPercentage(gender, bodyfat, macroRatios) * totals['heavyCaloriesFinal'] / 4);
    totals['heavyDayCarbs'] = Math.round(calculateCarbPercentage(gender, bodyfat, macroRatios) * totals['heavyCaloriesFinal'] / 4);
    totals['heavyDayFat'] = Math.round(calculateFatPercentage(gender, bodyfat, macroRatios) * totals['heavyCaloriesFinal'] / 9);
    // this.set('client.moderateDayFat', moderateDayFat);
    // return moderateDayFat;
  }

  // custom heavy calories final
  const customHeavyCaloriesFinalProtein = customHeavyDayProtein ? customHeavyDayProtein : totals['heavyDayProtein'];
  const customHeavyCaloriesFinalCarbs = customHeavyDayCarbs ? customHeavyDayCarbs : totals['heavyDayCarbs'];
  const customHeavyCaloriesFinalFat = customHeavyDayFat ? customHeavyDayFat : totals['heavyDayFat'];

  totals['customHeavyCaloriesFinal'] = (Number(customHeavyCaloriesFinalProtein) * 4) + (Number(customHeavyCaloriesFinalCarbs) * 4) + (Number(customHeavyCaloriesFinalFat) * 9);

  if(trainingIntensity === 0) {
    totals['totalProtein'] = customMacros && customRestDayProtein ? customRestDayProtein : totals['restDayProtein'];
    totals['totalCarbs'] = customMacros && customRestDayCarbs ? customRestDayCarbs : totals['restDayCarbs'];
    totals['totalFat'] = customMacros && customRestDayFat ? customRestDayFat : totals['restDayFat'];
    totals['totalCalories'] = customMacros && totals['customRestCaloriesFinal'] ? totals['customRestCaloriesFinal'] : totals['restCaloriesFinal'];
  } else if(trainingIntensity === 1) {
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

function calculateBmr(gender, age, height, bodyweight) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - G14
  if(gender === 'Female') {
    return Math.round(655 + (4.35 * bodyweight) + (4.7 * height) - (4.7 * age));
  } else if(gender === 'Male') {
    return Math.round(66 + (6.23 * bodyweight) + (12.7 * height) - (6.8 * age));
  }
}

function calculateBmrProxyNewBmr(gender, age, height, weight2) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - G8
  if(gender && height && age && weight2) {
    if(gender === 'Female') {
      return Math.round(655 + (4.35 * weight2) + (4.7 * height) - (4.7 * age));
    } else if(gender === 'Male') {
      return Math.round(66 + (6.23 * weight2) + (12.7 * height) - (6.8 * age));
    }
  } else {
    if(!weight2) {
      alert('missing weight2');
    } else {
      alert('missing variable to calculate bmrProxyNewBmr');
    }
  }
}

function calculateBmrProxyMetabolicTest(bmr) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - D8
  return bmr;
}

function calculateBmrProxyLeaningOut(bmr, bodyweight) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - C8
  return bmr - ((0.0075 * bodyweight) / 7) * 3500;
}

function calculateBmrProxyBuildingMass(bmr, bodyweight) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - B8
  return bmr + ((0.007 * bodyweight / 7)) * 2500;
}

function calculateBmrProxyRevDiet1(bmrProxyNewBmr, bmrProxyLeaningOut) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - E8
  if(bmrProxyNewBmr && bmrProxyLeaningOut) {
    return (bmrProxyNewBmr - bmrProxyLeaningOut) * 0.33 + bmrProxyLeaningOut;
  } else {
    console.log('missing information for calculateBmrProxyRevDiet1');
  }
}

function calculateBmrProxyRevDiet2(bmrProxyNewBmr, bmrProxyLeaningOut) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - F8
  if(bmrProxyNewBmr && bmrProxyLeaningOut) {
    return (bmrProxyNewBmr - bmrProxyLeaningOut) * 0.66 + bmrProxyLeaningOut;
  } else {
    console.log('missing information for calculateBmrProxyRevDiet2');
  }
}

function calculateDifference(gender, age, height, weight2, bmr, bodyweight, templateType, templates) {
  const bmrProxyNewBmr = calculateBmrProxyNewBmr(gender, age, height, weight2);
  const bmrProxyLeaningOut = calculateBmrProxyLeaningOut(bmr, bodyweight);
  const bmrProxyRevDiet1 = calculateBmrProxyRevDiet1(bmrProxyNewBmr, bmrProxyLeaningOut);
  const bmrProxyRevDiet2 = calculateBmrProxyRevDiet2(bmrProxyNewBmr, bmrProxyLeaningOut);

  if(templateType === templates[0]) {
    // refer to Adaptive Nutrition Meal Planning Development Google Sheet - D9
    return calculateBmrProxyMetabolicTest(bmr) - bmr;
  } else if(templateType === templates[1]) {
    // refer to Adaptive Nutrition Meal Planning Development Google Sheet - B9
    return calculateBmrProxyBuildingMass(bmr, bodyweight) - bmr;
  } else if(templateType === templates[2]) {
    // refer to Adaptive Nutrition Meal Planning Development Google Sheet - C9
    return bmrProxyLeaningOut - bmr;
  } else if(templateType === templates[3]) {
    // refer to Adaptive Nutrition Meal Planning Development Google Sheet - E9
    return bmrProxyRevDiet1 - bmr;
  } else if(templateType === templates[4]) {
    // refer to Adaptive Nutrition Meal Planning Development Google Sheet - F9
    return bmrProxyRevDiet2 - bmr;
  } else if(templateType === templates[5]) {
    // refer to Adaptive Nutrition Meal Planning Development Google Sheet - G9
    return bmrProxyNewBmr - bmr;
  }
}

function calculateProteinPercentage(gender, bodyfat, macroRatios) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - C16
  if(gender === 'Male') {
    if(bodyfat >= 25) {
      return macroRatios.maleRatios.maleProtein1;
    } else if(bodyfat > 15) {
      return maleProtein2;
    } else {
      return maleProtein3;
    }
  } else if(gender === 'Female') {
    if(bodyfat >= 35) {
      return macroRatios.femaleRatios.femaleProtein1;
    } else if(bodyfat > 22) {
      return macroRatios.femaleRatios.femaleProtein2;
    } else {
      return macroRatios.femaleRatios.femaleProtein3;
    }
  }
}

function calculateCarbPercentage(gender, bodyfat, macroRatios) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - D16
  if(gender === 'Male') {
    if(bodyfat >= 25) {
      return macroRatios.maleRatios.maleCarb1;
    } else if(bodyfat > 15) {
      return macroRatios.maleRatios.maleCarb2;
    } else {
      return macroRatios.maleRatios.maleCarb3;
    }
  } else if(gender === 'Female') {
    if(bodyfat >= 35) {
      return macroRatios.femaleRatios.femaleCarb1;
    } else if(bodyfat > 22) {
      return macroRatios.femaleRatios.femaleCarb2;
    } else {
      return macroRatios.femaleRatios.femaleCarb3;
    }
  }
}

function calculateFatPercentage(gender, bodyfat, macroRatios) {
  // refer to Adaptive Nutrition Meal Planning Development Google Sheet - E16
  if(gender === 'Male') {
    if(bodyfat >= 25) {
      return macroRatios.maleRatios.maleFat1;
    } else if(bodyfat > 15) {
      return macroRatios.maleRatios.maleFat2;
    } else {
      return macroRatios.maleRatios.maleFat3;
    }
  } else if(gender === 'Female') {
    if(bodyfat >= 35) {
      return macroRatios.femaleRatios.femaleFat1;
    } else if(bodyfat > 22) {
      return macroRatios.femaleRatios.femaleFat2;
    } else {
      return macroRatios.femaleRatios.femaleFat3;
    }
  }
}
