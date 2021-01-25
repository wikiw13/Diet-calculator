import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface UserDataReducerState {
  userData: {
    activity: string;
    goal: string;
    totalCalories: number;
  };
  macronutrients: object;
  meals: string[];
  loading: boolean;
  key: string;
  fetched: boolean;
}

const initialstate: UserDataReducerState = {
  userData: {
    activity: "",
    goal: "",
    totalCalories: 0,
  },
  macronutrients: {},
  meals: [],
  loading: false,
  key: "",
  fetched: false,
};

const reducer = (
  state: UserDataReducerState = initialstate,
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
        userData: {
          activity: action.healthData.userData.data.activity,
          goal: action.healthData.userData.data.goal,
          totalCalories:
            action.healthData.userData.calculations.totalCalories,
        },
        macronutrients: { ...action.healthData.dietData.macronutrients },
        meals: [...action.healthData.dietData.meals],
        loading: false,
        key: action.healthData.key,
        fetched: true,
      };
    case actionTypes.FETCH_HEALTH_DATA_FAIL:
      return updateObject(state, {
        loading: false,
      });
    case actionTypes.UPDATE_HEALTH_DATA:
      return {
        ...state,
        show: true,
      };
    case actionTypes.CLEAR_DATA:
      return updateObject(state, {
        userData: {
          activity: "",
          goal: "",
          totalCalories: 0,
        },
        macronutrients: {},
        meals: [],
        loading: false,
        key: "",
        fetched: false,
      });

    default:
      return state;
  }
};

export default reducer;
