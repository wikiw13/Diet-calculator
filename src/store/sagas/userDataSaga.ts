import { put, call, delay } from "redux-saga/effects";
import axios from "../../axios-instance";

import * as actions from "../actions/index";

export function* fetchHealthDataSaga(action: any) {
  yield put(actions.fetchHealthDataStart());
    const queryParams =
      "?auth=" +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';
    try {
      yield delay(1000);
      const response = yield axios.get("/health-data.json" + queryParams);
      let healthData = {};
      for (let key in response.data) {
        healthData = {
          ...response.data[key],
          key: key
        };
      };
      yield put(actions.fetchHealthDataSuccess(healthData));
    } catch (error) {
      yield put(actions.fetchHealthDataFail(error));
    }
  };

  export function* updateHealthDataSaga(action: any) {
    
    yield put(actions.updateHealthDataStart());
    try {
      const response = yield axios.patch(
        "/health-data.json?auth=" + action.token,
        action.updatedHealthData
      );
      action.userId = action.updatedHealthData[action.key].userId;
      yield put(
        actions.updateHealthDataSuccess(response.data.name, action.updatedHealthData)
      );
      yield call(fetchHealthDataSaga, action)
    } catch (error) {
      yield put(actions.updateHealthDataFail(error));
    }
  };

  