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
      const response = yield axios.get("/health-data.json" + queryParams);
      let healthData = {};
      for (let key in response.data) {
        healthData = {
          ...response.data[key],
          key: key
        };
      };
      console.log(healthData)
      yield put(actions.fetchHealthDataSuccess(healthData));
    } catch (error) {
      yield put(actions.fetchHealthDataFail(error));
    }
  }