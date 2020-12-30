import * as actionTypes from "./actionTypes";

export const sendData = (data: any) => {
  return {
    type: actionTypes.SEND_DATA,
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
}