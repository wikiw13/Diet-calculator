import * as actionTypes from "./actionTypes";

export const fetchHealthDataStart = () => {
  return {
    type: actionTypes.FETCH_HEALTH_DATA_START,
  };
};

export const fetchHealthDataSuccess = (healthData: object) => {
  return {
    type: actionTypes.FETCH_HEALTH_DATA_SUCCESS,
    healthData,
  };
};

export const fetchHealthDataFail = (error: string) => {
  return {
    type: actionTypes.FETCH_HEALTH_DATA_FAIL,
    error: error,
  };
};

export const fetchHealthData = (
  token: string | null,
  userId: string | null
) => {
  return {
    type: actionTypes.FETCH_HEALTH_DATA,
    token,
    userId,
  };
};

export const updateHealthDataStart = () => {
  return {
    type: actionTypes.UPDATE_HEALTH_DATA_START,
  };
};

export const updateHealthDataSuccess = (id: string, updatedData: object) => {
  return {
    type: actionTypes.UPDATE_HEALTH_DATA_SUCCESS,
    id,
    updatedData,
  };
};

export const updateHealthDataFail = (error: string) => {
  return {
    type: actionTypes.UPDATE_HEALTH_DATA_FAIL,
    error: error,
  };
};

export const updateHealthData = (
  updatedHealthData: object,
  token: string | null,
  key: string
) => {
  return {
    type: actionTypes.UPDATE_HEALTH_DATA,
    updatedHealthData,
    token,
    key,
  };
};
