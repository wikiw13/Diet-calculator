import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import classes from "./Calculator.module.css";
import Modal from "../../components/Modal/Modal";
import {
  saveData,
  closeModal,
  sendHealthData,
  getMoreFunctions,
  updateHealthData
} from "../../store/actions/index";
import { RootState } from "../../index";
import { healthDataSelector } from "../../selectors/factorSelector";
import { HealthInfo } from "../../selectors/factorSelector";
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm";

interface CalculatorProps {}

const Calculator: FunctionComponent<CalculatorProps> = () => {
  const history = useHistory();

  const show = useSelector((state: RootState) => state.calculatorReducer.show);
  const { isAuth, userId, token } = useSelector(
    (state: RootState) => state.authReducer
  );
  const { key, macronutrients, meals, fetched } = useSelector(
    (state: RootState) => state.userDataReducer
  );
  const change = useSelector(
    (state: RootState) => state.assumptionsReducer.change
  );
  const { weight, height, age, activity, gender, goal } = useSelector(
    (state: RootState) => state.calculatorReducer.healthData
  );
  const { BMI, BMR, TEE, totalCalories } = useSelector<RootState, HealthInfo>(
    healthDataSelector
  );

  const getMoreHandler = () => {
    const healthData = {
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
    };

    const updatedHealthData = {
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
    };
    onGetMore(healthData, updatedHealthData, token, key);
    };

  const dispatch = useDispatch();

  const onSubmit = (data: object) => {
    dispatch(saveData(data));
  };

  const onModalClosed = () => {
    dispatch(closeModal());
  };

  const onGetMore = (
    healthData: object,
    updatedHealthData: object,
    token: string | null,
    key: string
  ) => {
    if (
      (isAuth && !change) ||
      (isAuth && change && healthData === null)
    ) {
      dispatch(sendHealthData(healthData, token));
      history.push("/assumptions");
    } else if (isAuth && change) {
      dispatch(updateHealthData(updatedHealthData, token, key));
      history.push("/assumptions");
    } else {
      dispatch(getMoreFunctions());
      history.push("/auth");
    }
  };

  return (
    <div className={classes.Calculator}>
      <h2>Enter Your details:</h2>
      <CalculatorForm onHandleSubmit={onSubmit} />
      <Modal
        show={show}
        BMI={BMI}
        BMR={BMR}
        TEE={TEE}
        total={totalCalories}
        clicked={onModalClosed}
        modalClosed={onModalClosed}
        getMoreClicked={getMoreHandler}
        token={token}
        fetched={fetched}
      />
    </div>
  );
};

export default Calculator;
