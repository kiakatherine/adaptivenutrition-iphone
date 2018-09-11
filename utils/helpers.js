import moment from 'moment';

Date.prototype.subtractDays = function(date, days) {
  date.setDate(date.getDate() - days);
  return date;
};

export function formatBodyweightLogDate(d) {
  // const date = d ? new Date(d) : null;
  return d ? moment(d,"DD-MM-YY").format('M-D') : '-';
}

function hasVal(val) {
  return val !== null;
}

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
    } else if(macroType === 'fats') {
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

  // return 'sources' if not phase 3

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

    if(phase === 3) {
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
    } else {
      return sources;
    }
  } else if(macro === 'fats') {
    let fatString = 'fats' + currMeal;
    const fatAmount = sources[fatString];

    if(phase === 3) {
      return [
        fatAmount,
        sources[fatString + 'butter'],
        sources[fatString + 'nutButter'],
        sources[fatString + 'avocado']
      ];
    } else {
      return sources;
    }
  } else if(macro === 'veggies') {
    let veggieString = 'veggies' + currMeal;
    const veggieAmount = sources[veggieString];
    const veggieMenu = ['Spinach', 'Broccoli', 'Lettuce', 'Onions', 'Asparagus', 'Kale',
      'Bell peppers', 'Cabbage', 'Cauliflower', 'Celery', 'Cucumbers', 'Mushrooms',
      'Yellow squash', 'Zucchini', 'Mixed veggies'];

    if(phase === 3) {
      if(veggieAmount === '---') {
        return ['---'];
      }

      let arr = [];

      veggieMenu.forEach(v => {
        arr.push(veggieAmount + ' of ' + v.toLowerCase());
      });

      return arr;
    } else {
      return sources;
    }
  }
}

export function convertTrainingIntensity(string) {
  if(string.indexOf('rest') > -1) {
    return 0;
  } else if(string.indexOf('moderate') > -1) {
    return 1;
  } else {
    return 2;
  }
}

export function convertTrainingIntensityToString(num) {
  if(num === 0) {
    return 'Rest or low-intensity exercise';
  } else if(num === 1) {
    return '< 90 min of high-intensity exercise';
  } else {
    return '> 90 min of high-intensity exercise';
  }
}

export function convertTrainingTime(string) {
  if(string.indexOf('waking') > -1) {
    return 0;
  } else if(string.indexOf('One') > -1) {
    return 1;
  } else if(string.indexOf('Two') > -1) {
    return 2;
  } else if(string.indexOf('Three') > -1) {
    return 3;
  } else if(string.indexOf('Four') > -1) {
    return 1;
  } else {
    return 5;
  }
}

export function convertTrainingTimeToString(num) {
  if(num === 0) {
    return 'firstThing';
  } else if(num === 1) {
    return 'One';
  } else if(num === 2) {
    return 'Two';
  } else if(num === 3) {
    return 'Three';
  } else if(num === 4) {
    return 'Four';
  }
}

export function convertToTime(integer) {
  let hour;
  let minute;
  let label;

  hour = Number(integer.toString().split('.')[0]);
  minute = integer.toString().split('.')[1];
  label = integer < 11 ? ' am' : ' pm' ;

  if(hour > 12) {
    switch(hour) {
      case 13:
        hour = "1";
        break;
      case 14:
        hour = "2";
        break;
      case 15:
        hour = "3";
        break;
      case 16:
        hour = "4";
        break;
      case 17:
        hour = "5";
        break;
      case 18:
        hour = "6";
        break;
      case 19:
        hour = "7";
        break;
      case 20:
        hour = "8";
        break;
      case 21:
        hour = "9";
        break;
      case 22:
        hour = "10";
        break;
      case 23:
        hour = "11";
        break;
      case 24:
        hour = "12";
        break;
    }
  }

  if(minute === "5") {
    minute = ":30";
  } else if(minute === undefined) {
    minute = ":00";
  }

  if(minute) {
    return hour + minute + label;
  }

  return hour + label;
}

export function cleanTimeLabel(params) {
  let startTime = params.split('-')[0];
  let endTime = params.split('-')[1];
  let range;

  if(startTime.indexOf('am') > -1 && endTime.indexOf('am') > -1) {
    range = startTime.replace('am', '') + '- ' + endTime;
    return range.indexOf('NaN') > -1 ? null : range;
  } else if(startTime.indexOf('pm') > -1 && endTime.indexOf('pm') > -1) {
    range = startTime.replace('pm', '') + '- ' + endTime;
    return range.indexOf('NaN') > -1 ? null : range;
  } else {
    return params.indexOf('NaN') > -1 ? null : params;
  }
  return params.indexOf('NaN') > -1 ? null : params;
}

export function setMealTimes(wakeTime, phase, trainingIntensity, mealsBeforeWorkout) {
  const wakeTimeInteger = Number(wakeTime.split(':')[0]);
  const wakeTimeMinutesInteger = Number(wakeTime.split(':')[1]) === 30 ? true : false;
  const trainingDuration = trainingIntensity;
  const trainingAfter = mealsBeforeWorkout;

  let breakfastTimeLower;
  let breakfastTimeUpper;
  let earlyLunchTimeLower;
  let earlyLunchTimeUpper;
  let lateLunchTimeLower;
  let lateLunchTimeUpper;
  let dinnerTimeLower;
  let dinnerTimeUpper;

  if(phase === 3) {
    // meal 1
    if(trainingAfter === 0) {
      if(trainingDuration === 1) {
        breakfastTimeLower = wakeTimeInteger + 2 + (wakeTimeMinutesInteger ? 0.5 : 0);
      } else {
        breakfastTimeLower = wakeTimeInteger + 3 + (wakeTimeMinutesInteger ? 0.5 : 0);
      }
    } else {
      breakfastTimeLower = wakeTimeInteger + (wakeTimeMinutesInteger ? 0.5 : 0);
    }

    breakfastTimeUpper = breakfastTimeLower + 1;

    // meal 2
    if(trainingAfter === 1) {
      if(trainingDuration === 1) {
        earlyLunchTimeLower = ((breakfastTimeUpper - breakfastTimeLower)/2) + breakfastTimeLower + 4;
      } else {
        earlyLunchTimeLower = ((breakfastTimeUpper - breakfastTimeLower)/2) + breakfastTimeLower + 5;
      }
    } else {
      earlyLunchTimeLower = ((breakfastTimeUpper - breakfastTimeLower)/2) + breakfastTimeLower + 3;
    }

    earlyLunchTimeUpper = earlyLunchTimeLower + 2;

    // meal 3
    if(trainingAfter === 2) {
      if(trainingDuration === 1) {
        lateLunchTimeLower = ((earlyLunchTimeUpper - earlyLunchTimeLower)/2) + earlyLunchTimeLower + 4;
      } else {
        lateLunchTimeLower = ((earlyLunchTimeUpper - earlyLunchTimeLower)/2) + earlyLunchTimeLower + 5;
      }
    } else {
      lateLunchTimeLower = ((earlyLunchTimeUpper - earlyLunchTimeLower)/2) + earlyLunchTimeLower + 3;
    }

    lateLunchTimeUpper = lateLunchTimeLower + 2;

    // meal 4
    if(trainingAfter === 3) {
      if(trainingDuration === 1) {
        dinnerTimeLower = ((lateLunchTimeUpper - lateLunchTimeLower)/2) + lateLunchTimeLower + 4;
      } else {
        dinnerTimeLower = ((lateLunchTimeUpper - lateLunchTimeLower)/2) + lateLunchTimeLower + 5;
      }
    } else {
      dinnerTimeLower = ((lateLunchTimeUpper - lateLunchTimeLower)/2) + lateLunchTimeLower + 3;
    }

    dinnerTimeUpper = dinnerTimeLower + 2;
  } else {
    // meal 1
    breakfastTimeLower = wakeTimeInteger + (wakeTimeMinutesInteger ? 0.5 : 0);
    breakfastTimeUpper = breakfastTimeLower + 1;

    // meal 2
    earlyLunchTimeLower = ((breakfastTimeUpper - breakfastTimeLower)/2) + breakfastTimeLower + 3;
    earlyLunchTimeUpper = earlyLunchTimeLower + 2;

    // meal 3
    lateLunchTimeLower = ((earlyLunchTimeUpper - earlyLunchTimeLower)/2) + earlyLunchTimeLower + 3;
    lateLunchTimeUpper = lateLunchTimeLower + 2;

    // meal 4
    dinnerTimeLower = ((lateLunchTimeUpper - lateLunchTimeLower)/2) + lateLunchTimeLower + 3;
    dinnerTimeUpper = dinnerTimeLower + 2;
  }

  return {
    breakfastTime: cleanTimeLabel(convertToTime(breakfastTimeLower) + '-' + convertToTime(breakfastTimeUpper)),
    earlyLunchTime: cleanTimeLabel(convertToTime(earlyLunchTimeLower) + '-' + convertToTime(earlyLunchTimeUpper)),
    lateLunchTime: cleanTimeLabel(convertToTime(lateLunchTimeLower) + '-' + convertToTime(lateLunchTimeUpper)),
    dinnerTime: cleanTimeLabel(convertToTime(dinnerTimeLower) + '-' + convertToTime(dinnerTimeUpper))
  };
}

export function convertTemplateToNumber(template, templates) {
  return template === templates[0] ? 0 :
    template === templates[1] ? 1 :
    template === templates[2] ? 2 :
    template === templates[3] ? 3 :
    template === templates[4] ? 4 :
    template === templates[5] ? 5 : null;
}
