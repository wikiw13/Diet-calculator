import * as actionTypes from "./actionTypes";

export const changeMailHandler = (mail: string) => {
  return {
    type: actionTypes.CHANGE_MAIL,
    payload: {
      mail,
    },
  };
};

export const changePasswordHandler = (password: string) => {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    payload: {
      password,
    },
  };
};

export const switchAuthModeHandler = () => {
  return {
    type: actionTypes.SWITCH_AUTH_MODE,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token: string | null, userId: string | null) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = (error: string | null) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};
