import { put, call, delay } from "redux-saga/effects";
import axios from "../../axios-instance";
import {fetchHealthDataSaga} from './userDataSaga';

import * as actions from "../actions/index";

export function* sendHealthDataSaga(action: any) {
  yield put(actions.sendHealthDataStart());
  try {
    yield delay(1000);
    const response = yield axios.post(
      "/health-data.json?auth=" + action.token,
      action.healthData
    );
    yield put(
      actions.sendHealthDataSuccess(response.data.name, action.healthData)
    );
    
    yield call(fetchHealthDataSaga, {token: action.token, userId: action.healthData.userId, key: action.key })
  } catch (error) {
    yield put(actions.sendHealthDataFail(error));
  }
}
