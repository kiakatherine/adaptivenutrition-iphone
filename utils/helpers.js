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
