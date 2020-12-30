import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../store/actions/actionTypes";
import { logoutSaga, authUserSaga, checkAuthTimeoutSaga, authCheckStateSaga } from "./authSaga";


export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    
  ]);
};

