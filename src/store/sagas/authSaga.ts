import { healthDataSelector } from "./../../selectors/factorSelector";
import { sendHealthData } from "./../actions/CalculatorActions";

import { put, call, delay, select } from "redux-saga/effects";
import axios from "axios";

import { RootState } from "../../index";
import * as actions from "../actions/index";
import { fetchHealthDataSaga, updateHealthDataSaga } from "./userDataSaga";
import { sendHealthDataSaga } from "./calculatorSaga";

export function* logoutSaga(action: any) {
  yield call([localStorage, "removeItem"], "token");
  yield call([localStorage, "removeItem"], "userId");
  yield call([localStorage, "removeItem"], "expirationDate");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action: any) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action: any) {
  const getMore = yield select(
    (state: RootState) => state.calculatorReducer.getMore
  );

  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXtW2ezooPuqPrlvzlYcogj8MLX3aj1nw ";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXtW2ezooPuqPrlvzlYcogj8MLX3aj1nw ";
  }
  try {
    yield delay(1000);
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
    yield call(fetchHealthDataSaga, {
      ...action,
      userId: response.data.localId,
      token: response.data.idToken,
    });

    const { fetched, key } = yield select(
      (state: RootState) => state.userDataReducer
    );
    const healthData = yield select(
      (state: RootState) => state.calculatorReducer.healthData
    );
    const { meals, macronutrients } = yield select(
      (state: RootState) => state.userDataReducer
    );
    const healthDataCalculations = yield select(healthDataSelector);

    if (getMore && !fetched) {
      const createdHealthData = createHealthData(
        healthData,
        healthDataCalculations,
        response.data.localId
      );
      yield call(sendHealthDataSaga, {
        // ...action,
        healthData: createdHealthData,
        userId: response.data.localId,
        token: response.data.idToken,
      });
      action.history.push("/assumptions");
    } else if (getMore && fetched) {
      const updatedData = createUpdatedHealthData(
        healthData,
        healthDataCalculations,
        response.data.localId,
        key,
        meals,
        macronutrients
      );

      yield call(updateHealthDataSaga, {
        updatedHealthData: updatedData,
        token: response.data.idToken,
        userId: response.data.localId,
        key: key,
      });
      action.history.push("/assumptions");
    } else if (fetched) {
      action.history.push("/assumptions");
    } else {
      action.history.push("/calculator");
    }
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action: any) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      yield localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
      yield call(fetchHealthDataSaga, {
        token: token,
        userId: userId,
      });
    }
  }
}

const createHealthData = (
  { weight, height, age, activity, gender, goal }: any,
  { BMI, BMR, TEE, totalCalories }: any,
  userId: string
) => ({
  userData: {
    data: {
      weight,
      height,
      age,
      activity,
      gender,
      goal,
    },
    calculations: {
      BMI,
      BMR,
      TEE,
      totalCalories,
    },
  },
  userId,
  dietData: {
    macronutrients: {
      protein: 0,
      fat: 0,
      carbs: 0,
    },
    meals: [""],
  },
});

const createUpdatedHealthData = (
  { weight, height, age, activity, gender, goal }: any,
  { BMI, BMR, TEE, totalCalories }: any,
  userId: string,
  key: string,
  meals: string[],
  macronutrients: object
) => ({
  [key]: {
    userData: {
      data: {
        weight,
        height,
        age,
        activity,
        gender,
        goal,
      },
      calculations: {
        BMI,
        BMR,
        TEE,
        totalCalories,
      },
    },
    userId,
    dietData: {
      macronutrients: {
        ...macronutrients,
      },
      meals: [...meals],
    },
  },
});
