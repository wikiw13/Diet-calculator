import * as actionTypes from "../actions/actionTypes";

export interface CalculatorReducerState {
  weight: number;
  height: number;
  age: number;
  activity: string;
  gender: string;
  goal: string;
  show: boolean;
}

const initialstate: CalculatorReducerState = {
  weight: 0,
  height: 0,
  age: 0,
  activity: "",
  gender: "",
  goal: "",
  show: false
};



const reducer = (state: CalculatorReducerState = initialstate, action: any): any => {
  switch (action.type) {
    case actionTypes.SEND_DATA:
      return {
        ...state, 
        weight: action.payload.weight,
        height: action.payload.height,
        age: action.payload.age,
        activity: action.payload.activity,
        gender: action.payload.gender,
        goal: action.payload.goal,
        show: true
      };
      case actionTypes.CLOSE_MODAL:
        return {
          ...state,
          show: false
        }
    default:
      return state;
  }
};

export default reducer;
