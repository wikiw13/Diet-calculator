import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface AssumptionsReducerState {
  healthData: {
    activity: string;
    goal: string;
    totalCalories: number;
  };
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: string[];
  loading: boolean;
  change: boolean;
}

const initialstate: AssumptionsReducerState = {
  healthData: {
    activity: "",
    goal: "",
    totalCalories: 0,
  },
  macronutrients: {
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  meals: [],
  loading: false,
  change: false,
};

const reducer = (
  state: AssumptionsReducerState = initialstate,
  action: any
): any => {
  switch (action.type) {
    case actionTypes.CHANGE_HEALTH_DATA:
      return updateObject(state, {
        change: true,
      });
    case actionTypes.CHANGE_CARBS:
      return {
        ...state,
        macronutrients: {
          ...state.macronutrients,
          carbs: action.carbsAmount,
        },
      };
    case actionTypes.CHANGE_PROTEIN:
      return {
        ...state,
        macronutrients: {
          ...state.macronutrients,
          protein: action.proteinAmount,
        },
      };
    case actionTypes.CHANGE_FAT:
      return {
        ...state,
        macronutrients: {
          ...state.macronutrients,
          fat: action.fatAmount,
        },
      };
    // case actionTypes.SAVE_ASSUMPTIONS_DATA:
    //     return {
    //       ...state,
    //       meals: action.selectedMeals};
    case actionTypes.CHANGE_MEALS:
      return {
        ...state,
        meals: action.selectedMeals,
      };
    case actionTypes.CLEAR_DATA:
      return {
        ...state,
        healthData: {},
        macronutrients: {},
        meals: [],
      };
    default:
      return state;
  }
};

export default reducer;
