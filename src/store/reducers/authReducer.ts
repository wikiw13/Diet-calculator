import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

export interface AuthReducerState {
  isSignUp: boolean;
  mail: string;
  password: string;
  token: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
  authRedirectPath: string;
  isAuth: boolean;
  logout: boolean;
}

const initialstate: AuthReducerState = {
  mail: "",
  password: "",
  isSignUp: true,
  isAuth: false,
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  logout: false,
};

const reducer = (state: AuthReducerState = initialstate, action: any): any => {
  switch (action.type) {
    case actionTypes.CHANGE_MAIL:
      return updateObject(state, {
        mail: action.payload.mail,
      });
    case actionTypes.CHANGE_PASSWORD:
      return updateObject(state, {
        password: action.payload.password,
      });
    case actionTypes.SWITCH_AUTH_MODE:
      return updateObject(state, { isSignUp: !state.isSignUp, error: null });
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        isAuth: true,
        logout: false,
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.AUTH_INITIATE_LOGOUT:
      return updateObject(state, {
        loading: true,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        loading: false,
        token: null,
        userId: null,
        isAuth: false,
        logout: true,
        password:'',
        mail:''
      });
    default:
      return state;
  }
};

export default reducer;
