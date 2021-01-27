import React, { FunctionComponent } from "react";
import { Button } from "rsuite";

import classes from "./CalculatorModal.module.css";
import Backdrop from "../../Backdrop/Backdrop";
import { CustomPopover } from "../../Popover/Popover";
import { NavLink } from "react-router-dom";

interface ModalProps {
  show: boolean;
  BMI: number;
  BMR: number;
  TEE: number;
  total: number;
  clicked: () => void;
  modalClosed: () => void;
  getMoreClicked: () => void;
  token: null | string;
  fetched: boolean
}

const Modal: FunctionComponent<ModalProps> = ({
  show,
  BMI,
  BMR,
  TEE,
  total,
  clicked,
  modalClosed,
  getMoreClicked,
  token,
  fetched
}) => {
  let weightScale;
  if (BMI < 18.5) {
    weightScale = (
      <div>
        <span className={classes.Warning}>You're underweigt</span>
        <CustomPopover
          content="Your body weight may be insufficient. You should contact a dietician."
          title="underweight"
        />
      </div>
    );
  } else if (BMI >= 18.5 && BMI < 25) {
    weightScale = (
      <div>
        <span className={classes.Normal}>You're weight is suitable</span>
        <CustomPopover
          content="Your body weight looks good. Keep going! :)"
          title="normal"
        />
      </div>
    );
  } else {
    weightScale = (
      <div>
        <span className={classes.Warning}>You're overweight </span>
        <CustomPopover
          content="Your body weight may be excessive. You should contact a dietician."
          title="overweight"
        />
      </div>
    );
  };

  let buttonName;
  if (token && fetched === false) {
    buttonName = 'Save data'
  } else if (token && fetched ) {
    buttonName = 'Update data'
  } else {
    buttonName = 'I want more!'
  }

  return (
    <div>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        <h2>Your results:</h2>
        <div className={classes.ResultField}>
          <label>BMI (Body Mass Index): </label>
          <p className={classes.Result}>{BMI}</p>
          {weightScale}
        </div>
        <div className={classes.ResultField}>
          <label>BMR (Basal Metabolic Rate): </label>
          <CustomPopover
            content="This is how many calories your body burns without any physical activity."
            title="bmr"
          />
          <p className={classes.Result}>{BMR} kcal</p>
        </div>
        <div className={classes.ResultField}>
          <label>TEE (Total Energy Expenditure): </label>
          <CustomPopover
            content="This is how many calories your body burns with your physical activity."
            title="tee"
          />
          <p className={classes.Result}>{TEE} kcal</p>
        </div>
        <div className={classes.ResultField}>
          <label>
            Recommended calories intake per day to achieve Your goal:{" "}
          </label>
          <CustomPopover
            content="This is how many calories you should eat to achieve your goal."
            title="goal"
          />
          <p className={classes.Result}>{total} kcal</p>
        </div>

        <Button className={classes.Button} onClick={getMoreClicked}>
          {/* {token ? 'Update data' : 'I want more!'} */}
          {buttonName}
          
        </Button>

        <Button className={classes.Button} onClick={clicked}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
