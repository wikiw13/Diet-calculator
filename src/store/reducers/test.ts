import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface UserDataReducerState {
  data: {
    userData: {
      data: {
        weight: number;
        height: number;
        age: number;
        activity: string;
        gender: string;
        goal: string;
      };
      calculations: {
        BMI: number;
        BMR: number;
        TEE: number;
        totalCalories: number;
      };
    };
    dietData: {
      macronutrients: object;
      meals: string[];
    };
    userId: string
  };
  loading: boolean;
  key: string;
  fetched: boolean;
}

const initialstate: UserDataReducerState = {
  data: {
    userData: {
      data: {
        weight: 0,
        height: 0,
        age: 0,
        activity: '',
        gender: '',
        goal: '',
      },
      calculations: {
        BMI: 0,
        BMR: 0,
        TEE: 0,
        totalCalories: 0,
      },
    },
    dietData: {
      macronutrients: {},
      meals: [],
    },
    userId: '',
  },
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
        //???
        data: action.healthData,
        // userData: {
        //   activity: action.healthData.userData.data.activity,
        //   goal: action.healthData.userData.data.goal,
        //   totalCalories: action.healthData.userData.calculations.totalCalories,
        // },
        // macronutrients: { ...action.healthData.dietData.macronutrients },
        // meals: [...action.healthData.dietData.meals],
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
        // show: true,
      };
    case actionTypes.CLEAR_DATA:
      return updateObject(state, {
        data: {
          userData: {
            data: {
              weight: 0,
              height: 0,
              age: 0,
              activity: '',
              gender: '',
              goal: '',
            },
            calculations: {
              BMI: 0,
              BMR: 0,
              TEE: 0,
              totalCalories: 0,
            },
          },
          dietData: {
            macronutrients: {},
            meals: [],
          },
          userId: '',
        },
        loading: false,
        key: "",
        fetched: false,
      });
    default:
      return state;
  }
};

export default reducer;
