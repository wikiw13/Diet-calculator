import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import classes from "./Calculator.module.css";
import Modal from "../../components/Modal/Modal";
import GenderCheckbox from "../../components/GenderCheckbox/GenderCheckbox";
import { sendData, closeModal } from "../../store/actions/CalculatorActions";
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
  const {
    register,
    handleSubmit,
    errors,

    control,
  } = useForm<Inputs>({
    mode: "onTouched",
  });

  const show = useSelector((state: RootState) => state.calculatorReducer.show);
  const { BMI, BMR, TEE, totalCalories } = useSelector<RootState, HealthInfo>(
    healthDataSelector
  );

  const dispatch = useDispatch();

  const onSubmit = (data: object) => {
    dispatch(sendData(data));
  };

  const onModalClosed = () => {
    dispatch(closeModal())
  }

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
          <GenderCheckbox onChange={(v: any) => onChange(v)} checked={value} />
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
      <Modal show={show} BMI={BMI} BMR={BMR} TEE={TEE} total={totalCalories} clicked={onModalClosed} modalClosed={onModalClosed} />
    </div>
  );
};

export default Calculator;
