import * as actionTypes from "./actionTypes";

export const saveData = (data: any) => {
  return {
    type: actionTypes.SAVE_DATA,
    payload: {
      weight: data.weight,
      height: data.height,
      age: data.age,
      activity: data.activity,
      gender: data.gender,
      goal: data.goal,
    },
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  }
};

export const sendHealthDataStart = () => {
  return {
    type: actionTypes.SEND_HEALTH_DATA_START
  };
};

export const sendHealthDataSuccess = (id: string, healthData: object) => {
  return {
    type: actionTypes.SEND_HEALTH_DATA_SUCCESS,
    id,
    healthData
  };
};

export const sendHealthDataFail = (error: string) => {
  return {
    type: actionTypes.SEND_HEALTH_DATA_FAIL,
    error: error
  };
};

export const sendHealthData = (healthData: object, token: string | null) => {
  return {
    type: actionTypes.SEND_HEALTH_DATA,
    healthData,
    token
  }
};
export const getMoreFunctions = () => {
  return {
    type: actionTypes.GET_MORE,
   
  }
};

// export const updateHealthDataStart = () => {
//   return {
//     type: actionTypes.UPDATE_HEALTH_DATA_START,
//   };
// };

// export const updateHealthDataSuccess = (id: string, updatedData: object) => {
//   return {
//     type: actionTypes.UPDATE_HEALTH_DATA_SUCCESS,
//     id,
//     updatedData
//   };
// };

// export const updateHealthDataFail = (error: string) => {
//   return {
//     type: actionTypes.UPDATE_HEALTH_DATA_FAIL,
//     error: error
//   };
// };

// export const updateHealthData = (updatedHealthData: object, token: string | null, key: string) => {
//   return {
//     type: actionTypes.UPDATE_HEALTH_DATA,
//     updatedHealthData,
//     token,
//     key
//   }
// };