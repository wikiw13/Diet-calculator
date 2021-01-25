import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { logoutSaga, authUserSaga, checkAuthTimeoutSaga, authCheckStateSaga} from "./authSaga";
import {sendHealthDataSaga, } from './calculatorSaga';
import {fetchHealthDataSaga, updateHealthDataSaga} from './userDataSaga';



export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    
  ]);
};

export function* watchCalculator() {
  yield all([
    takeEvery(actionTypes.SEND_HEALTH_DATA, sendHealthDataSaga),
    
    
  ]);
};
export function* watchUserData() {
  yield all([
    takeEvery(actionTypes.FETCH_HEALTH_DATA, fetchHealthDataSaga),
    takeEvery(actionTypes.UPDATE_HEALTH_DATA, updateHealthDataSaga),
  ]);
};



