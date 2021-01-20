import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";

import classes from "./Calculator.module.css";
import Modal from "../../components/Modal/Modal";
import GenderCheckbox from "../../components/GenderCheckbox/GenderCheckbox";
import {
  saveData,
  closeModal,
  sendHealthData,
  getMoreFunctions,
  updateHealthData,
} from "../../store/actions/CalculatorActions";
import { RootState } from "../../index";
import { healthDataSelector } from "../../selectors/factorSelector";
import { HealthInfo } from "../../selectors/factorSelector";

interface CalculatorProps {}

interface Inputs {
  weight: number;
  height: number;
  age: number;
  gender: string;
  goal: string;
  activity: string;
}

const Calculator: FunctionComponent<CalculatorProps> = () => {
  const { register, handleSubmit, errors, control } = useForm<Inputs>({
    mode: "onTouched",
  });

  const history = useHistory();

  const show = useSelector((state: RootState) => state.calculatorReducer.show);
  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);
  const userId = useSelector((state: RootState) => state.authReducer.userId);
  const token = useSelector((state: RootState) => state.authReducer.token);
  const key = useSelector((state: RootState) => state.userDataReducer.key);
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
      userId,
    };
    console.log(healthData);
    const updatedHealthData = {
      [key]: {
        userData: {
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
        userId,
      },
    };
    onGetMore(healthData, updatedHealthData, token);
  };

  const dispatch = useDispatch();

  const onSubmit = (data: object) => {
    dispatch(saveData(data));
  };

  const onModalClosed = () => {
    dispatch(closeModal());
  };

  const onGetMore = (healthData: object, updatedHealthData: object, token: string | null) => {
    if ((isAuth && change === false) || (isAuth && change === true && healthData === null)) {
      dispatch(sendHealthData(healthData, token));
      history.push("/assumptions");
    } else if (isAuth && change) {
      dispatch(updateHealthData(updatedHealthData, token));
      history.push("/assumptions");
    } else {
      dispatch(getMoreFunctions());
      history.push("/auth");
    }
  };

  const form = (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.FormDisplay}>
      <div className={classes.InputField}>
        <label>Weight (kg):</label>
        <input
          name="weight"
          ref={register({
            required: true,
            pattern: /^[0-9]*$/,
            valueAsNumber: true,
          })}
        />
      </div>
      {errors.weight && (
        <span className={classes.Error}>
          Enter Your weight in kg (numbers only!)...
        </span>
      )}

      <div className={classes.InputField}>
        <label>Height (cm):</label>
        <input
          name="height"
          ref={register({
            required: true,
            pattern: /^[0-9]*$/,
            valueAsNumber: true,
          })}
        />
      </div>
      {errors.height && (
        <span className={classes.Error}>
          Enter Your height in cm (numbers only!)...
        </span>
      )}
      <div className={classes.InputField}>
        <label>Age (years):</label>
        <input
          name="age"
          ref={register({
            required: true,
            pattern: /^[0-9]*$/,
            valueAsNumber: true,
          })}
        />
      </div>
      {errors.age && (
        <span className={classes.Error}>
          Enter Your age in years (numbers only!)...
        </span>
      )}

      <Controller
        control={control}
        name="gender"
        rules={{ required: true }}
        render={({ onChange, value }) => (
          <GenderCheckbox onChange={(v: any) => onChange(v)} />
        )}
      />

      {errors.gender && (
        <span className={classes.Error}>This field is required...</span>
      )}

      <div className={classes.SelectField}>
        <label>Select activity:</label>
        <select name="activity" ref={register}>
          <option value="normal">
            Normal - standing work / 2-3 workouts during week
          </option>
          <option value="low">
            Low - sedentary lifestyle with low physical activity
          </option>

          <option value="high">
            High - physical work / 4-5 workouts during week
          </option>
        </select>
      </div>

      <div className={classes.SelectField}>
        <label>What's Your goal?:</label>
        <select name="goal" ref={register}>
          <option value="health">Healthy eating / weight maintenance</option>
          <option value="loose">Loose weight</option>
          <option value="gain">Gain weight / muscle mass</option>
        </select>
      </div>

      <button type="submit" className={classes.Button}>
        Calculate
      </button>
    </form>
  );

  return (
    <div className={classes.Calculator}>
      <h2>Enter Your details:</h2>
      {form}
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
      />
    </div>
  );
};

export default Calculator;
