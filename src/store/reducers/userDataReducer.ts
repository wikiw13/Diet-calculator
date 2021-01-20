import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface UserDataReducerState {
  healthData: {
    activity: string;
    goal: string;
    totalCalories: number;
  };
  loading: boolean;
  key: string;
  fetched: boolean
}

const initialstate: UserDataReducerState = {
  healthData: {
    activity: "",
    goal: "",
    totalCalories: 0,
  },
  loading: false,
  key: '',
  fetched: false
};

const reducer = (
  state: UserDataReducerState = initialstate,
  action: any
): any => {
  console.log(action)
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
        loading: false,
        key: action.healthData.key,
        fetched: true
      };
    case actionTypes.FETCH_HEALTH_DATA_FAIL:
      return updateObject(state, {
        loading: false,
      });

    default:
      return state;
  }
};

export default reducer;
