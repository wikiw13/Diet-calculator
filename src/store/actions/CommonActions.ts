import * as actionTypes from "./actionTypes";

export const clearData = () => {
  return {
    type: actionTypes.CLEAR_DATA,
  };
};

export const showSideDrawerFunction = () => {
  return {
    type: actionTypes.SHOW_SIDE_DRAWER,
  };
};

export const closeSideDrawer = () => {
  return {
    type: actionTypes.CLOSE_SIDE_DRAWER,
  };
};

export const closeSaveDataModal = () => {
  return {
    type: actionTypes.CLOSE_SAVE_DATA_MODAL,
  };
};
