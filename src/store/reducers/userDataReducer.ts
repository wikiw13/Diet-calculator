import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface UserDataReducerState {
  userData: {
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
  key: string;
  fetched: boolean;
  change: boolean;
  showSideDrawer: boolean;
  showSaveDataModal: boolean;
  showLoadingModal: boolean
}

const initialstate: UserDataReducerState = {
  userData: {
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
  key: "",
  fetched: false,
  change: false,
  showSideDrawer: false,
  showSaveDataModal: false,
  showLoadingModal: false
};

const reducer = (
  state: UserDataReducerState = initialstate,
  action: any
): any => {
  
  switch (action.type) {
    case actionTypes.FETCH_HEALTH_DATA_START:
      return updateObject(state, {
        loading: true,
        showLoadingModal: true
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
        showLoadingModal: false
      };
    case actionTypes.FETCH_HEALTH_DATA_FAIL:
      return updateObject(state, {
        loading: false,
        showLoadingModal: false
      });
    case actionTypes.UPDATE_HEALTH_DATA_SUCCESS:
        return {
          ...state,
          showSaveDataModal: true,
          loading: false,
          showLoadingModal: false
        };
    case actionTypes.UPDATE_HEALTH_DATA_START:
        return {
          ...state,
          loading: true,
          showLoadingModal: true
        };
        case actionTypes.SEND_HEALTH_DATA_START:
          return {
            ...state,
            loading: true,
            showLoadingModal: true
          };
        case actionTypes.SEND_HEALTH_DATA_SUCCESS:
          return {
            ...state,
            showSaveDataModal: true,
            showLoadingModal: false
          };
    case actionTypes.CLOSE_SAVE_DATA_MODAL:
        return {
          ...state,
          showSaveDataModal: false,
        };
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
      case actionTypes.CHANGE_MEALS:
        return {
          ...state,
          meals: action.selectedMeals,
        };
    case actionTypes.SHOW_SIDE_DRAWER:
      return {
        ...state,
        showSideDrawer: !state.showSideDrawer,
      };
    case actionTypes.CLOSE_SIDE_DRAWER:
      return {
        ...state,
        showSideDrawer: false,
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
