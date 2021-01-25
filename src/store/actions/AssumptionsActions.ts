import * as actionTypes from "./actionTypes";


export const changeHealthData = () => {
  return {
    type: actionTypes.CHANGE_HEALTH_DATA,
  }
}
export const changeCarbs = (carbsAmount: string) => {
  return {
    type: actionTypes.CHANGE_CARBS,
    carbsAmount
  }
}
export const changeProtein = (proteinAmount: string) => {
  return {
    type: actionTypes.CHANGE_PROTEIN,
    proteinAmount
  }
}
export const changeFat = (fatAmount: string) => {
  return {
    type: actionTypes.CHANGE_FAT,
    fatAmount
  }
}
export const saveAssumptionsData = (selectedMeals: Array<string>) => {
  return {
    type: actionTypes.SAVE_ASSUMPTIONS_DATA,
    selectedMeals
  }
}
export const changeMeals = (selectedMeals: Array<string>) => {
  return {
    type: actionTypes.CHANGE_MEALS,
    selectedMeals
  }
}

 