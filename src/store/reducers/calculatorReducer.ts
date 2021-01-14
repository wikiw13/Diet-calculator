import * as actionTypes from "../actions/actionTypes";

export interface CalculatorReducerState {
  show: boolean;
  getMore: boolean;
  healthData: {
    weight: number;
    height: number;
    age: number;
    activity: string;
    gender: string;
    goal: string;
  };
}

const initialstate: CalculatorReducerState = {
  show: false,
  getMore: false,
  healthData: {
    weight: 0,
    height: 0,
    age: 0,
    activity: "",
    gender: "",
    goal: "",
  },
};

const reducer = (
  state: CalculatorReducerState = initialstate,
  action: any
): any => {
  switch (action.type) {
    case actionTypes.SAVE_DATA:
      return {
        ...state,
        healthData: {
          weight: action.payload.weight,
          height: action.payload.height,
          age: action.payload.age,
          activity: action.payload.activity,
          gender: action.payload.gender,
          goal: action.payload.goal,
        },
        show: true,
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        show: false,
      };
    case actionTypes.GET_MORE:
      return {
        ...state,
        getMore: true,
      };
      case actionTypes.UPDATE_HEALTH_DATA:
        return {
          ...state,
          show: true
        }
    default:
      return state;
  }
};

export default reducer;
