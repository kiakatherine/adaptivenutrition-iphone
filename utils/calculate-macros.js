export function calcProtein(trainingIntensity, mealsBeforeWorkout, totalProtein, proteinDelta) {
  let protein = [];

  if(trainingIntensity === 0) {
    protein[0] = Math.round(totalProtein * 0.25);
    protein[1] = Math.round(totalProtein * 0.25);
    protein[2] = Math.round(totalProtein * 0.25);
    protein[3] = Math.round(totalProtein * 0.25);
    protein[4] = '---';
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      protein[0] = proteinDelta;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
      protein[5] = proteinDelta;
    } else if(mealsBeforeWorkout === 1) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = proteinDelta;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
      protein[5] = proteinDelta;
    } else if(mealsBeforeWorkout === 2) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = proteinDelta;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
      protein[5] = proteinDelta;
    } else if(mealsBeforeWorkout === 3) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = proteinDelta;
      protein[4] = (totalProtein - proteinDelta) * 0.25;
      protein[5] = proteinDelta;
    } else if(mealsBeforeWorkout === 4) {
      protein[0] = (totalProtein - proteinDelta) * 0.25;
      protein[1] = (totalProtein - proteinDelta) * 0.25;
      protein[2] = (totalProtein - proteinDelta) * 0.25;
      protein[3] = (totalProtein - proteinDelta) * 0.25;
      protein[4] = proteinDelta;
      protein[5] = proteinDelta;
    }
  }

  return protein;
}

export function calcCarbs(trainingIntensity, mealsBeforeWorkout, totalCarbs) {
  let carbs = [];

  if(trainingIntensity === 0) {
    carbs[0] = Math.round(totalCarbs * 0.25);
    carbs[1] = Math.round(totalCarbs * 0.25);
    carbs[2] = Math.round(totalCarbs * 0.25);
    carbs[3] = Math.round(totalCarbs * 0.25);
    carbs[4] = '---';
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      carbs[0] = Math.round(totalCarbs * 0.2);
      carbs[1] = Math.round(totalCarbs * 0.3);
      carbs[2] = Math.round(totalCarbs * 0.2);
      carbs[3] = Math.round(totalCarbs * 0.1);
      carbs[4] = Math.round(totalCarbs * 0.1);
      carbs[5] = Math.round(totalCarbs * 0.1);
    } else if(mealsBeforeWorkout === 1) {
      carbs[0] = Math.round(totalCarbs * 0.15);
      carbs[1] = Math.round(totalCarbs * 0.15);
      carbs[2] = Math.round(totalCarbs * 0.3);
      carbs[3] = Math.round(totalCarbs * 0.2);
      carbs[4] = Math.round(totalCarbs * 0.1);
      carbs[5] = Math.round(totalCarbs * 0.1);
    } else if(mealsBeforeWorkout === 2) {
      carbs[0] = Math.round(totalCarbs * 0.1);
      carbs[1] = Math.round(totalCarbs * 0.15);
      carbs[2] = Math.round(totalCarbs * 0.15);
      carbs[3] = Math.round(totalCarbs * 0.3);
      carbs[4] = Math.round(totalCarbs * 0.2);
      carbs[5] = Math.round(totalCarbs * 0.1);
    } else if(mealsBeforeWorkout === 3) {
      carbs[0] = Math.round(totalCarbs * 0.1);
      carbs[1] = Math.round(totalCarbs * 0.1);
      carbs[2] = Math.round(totalCarbs * 0.15);
      carbs[3] = Math.round(totalCarbs * 0.15);
      carbs[4] = Math.round(totalCarbs * 0.3);
      carbs[5] = Math.round(totalCarbs * 0.2);
    } else if(mealsBeforeWorkout === 4) {
      carbs[0] = Math.round(totalCarbs * 0.1);
      carbs[1] = Math.round(totalCarbs * 0.1);
      carbs[2] = Math.round(totalCarbs * 0.15);
      carbs[3] = Math.round(totalCarbs * 0.2);
      carbs[4] = Math.round(totalCarbs * 0.15);
      carbs[5] = Math.round(totalCarbs * 0.3);
    }
  }

  return carbs;
}

export function calcFat(trainingIntensity, mealsBeforeWorkout, totalFat) {
  let fat = [];

  if(trainingIntensity === 0) {
    fat[0] = Math.round(totalFat * 0.3);
    fat[1] = Math.round(totalFat * 0.2);
    fat[2] = Math.round(totalFat * 0.2);
    fat[3] = Math.round(totalFat * 0.3);
    fat[4] = '---';
  } else if(trainingIntensity === 1 || trainingIntensity === 2) {
    if(mealsBeforeWorkout === 0) {
      fat[0] = '---';
      fat[1] = '---';
      fat[2] = Math.round(totalFat * 0.1);
      fat[3] = Math.round(totalFat * 0.3);
      fat[4] = Math.round(totalFat * 0.3);
      fat[5] = Math.round(totalFat * 0.3);
    } else if(mealsBeforeWorkout === 1) {
      fat[0] = Math.round(totalFat * 0.1);
      fat[1] = '---';
      fat[2] = '---';
      fat[3] = Math.round(totalFat * 0.3);
      fat[4] = Math.round(totalFat * 0.3);
      fat[5] = Math.round(totalFat * 0.3);
    } else if(mealsBeforeWorkout === 2) {
      fat[0] = Math.round(totalFat * 0.3);
      fat[1] = Math.round(totalFat * 0.1);
      fat[2] = '---';
      fat[3] = '---';
      fat[4] = Math.round(totalFat * 0.3);
      fat[5] = Math.round(totalFat * 0.3);
    } else if(mealsBeforeWorkout === 3) {
      fat[0] = Math.round(totalFat * 0.3);
      fat[1] = Math.round(totalFat * 0.3);
      fat[2] = Math.round(totalFat * 0.1);
      fat[3] = '---';
      fat[4] = '---';
      fat[5] = Math.round(totalFat * 0.3);
    } else if(mealsBeforeWorkout === 4) {
      fat[0] = Math.round(totalFat * 0.3);
      fat[1] = Math.round(totalFat * 0.3);
      fat[2] = Math.round(totalFat * 0.3);
      fat[3] = Math.round(totalFat * 0.1);
      fat[4] = '---';
      fat[5] = '---';
    }
  }

  return fat;
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
