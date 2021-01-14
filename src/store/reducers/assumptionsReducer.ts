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
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snack: boolean;
    supper: boolean;
  };
  loading: boolean;
  change: boolean
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
  meals: {
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
    supper: false,
  },
  loading: false,
  change: false
};

const reducer = (
  state: AssumptionsReducerState = initialstate,
  action: any
): any => {
  switch (action.type) {
    case actionTypes.FETCH_HEALTH_DATA_START:
      return updateObject(state, {
        loading: true,
      });
    case actionTypes.FETCH_HEALTH_DATA_SUCCESS:
      return {
        ...state,
        healthData: {
          activity: action.healthData.userData.activity,
          goal: action.healthData.userData.goal,
          totalCalories: action.healthData.calculations.totalCalories,
        },
        loading: false
      };
    case actionTypes.FETCH_HEALTH_DATA_FAIL:
      return updateObject(state, {
        loading: false,
      });
    case actionTypes.CHANGE_HEALTH_DATA:
        return updateObject(state, {
            change: true,
          });
    default:
      return state;
  }
};

export default reducer;
