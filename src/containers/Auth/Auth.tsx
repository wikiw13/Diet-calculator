import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";

import classes from "./Auth.module.css";
import {
  changeMailHandler,
  changePasswordHandler,
  switchAuthModeHandler,
  auth,
} from "../../store/actions/AuthActions";
import { RootState } from "../../index";
import Spinner from "../../components/Spinner/Spinner";
import { healthDataSelector } from "../../selectors/factorSelector";
import { HealthInfo } from "../../selectors/factorSelector";
import { sendHealthData } from "../../store/actions/CalculatorActions";

interface AuthProps {}

interface Inputs {
  mail: string;
  password: string;
}

const Auth: FunctionComponent<AuthProps> = () => {
  
  const { loading, logout, isAuth, error, token, userId, isSignUp } = useSelector(
    (state: RootState) => state.authReducer
  );
  const getMore = useSelector(
    (state: RootState) => state.calculatorReducer.getMore
  );
  const { weight, height, age, activity, gender, goal } = useSelector(
    (state: RootState) => state.calculatorReducer.healthData
  );
  const { BMI, BMR, TEE, totalCalories } = useSelector<RootState, HealthInfo>(
    healthDataSelector
  );

  const { register, handleSubmit, errors, getValues } = useForm<Inputs>({
    mode: "onTouched",
  });

  const history = useHistory();

  const healthData = {
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
    userId,
  };

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(auth(data.mail, data.password, isSignUp, (userId: string, token: string) => {
      if (getMore) {
        dispatch(sendHealthData({...healthData, userId}, token));
          history.push("/assumptions");
    }}))
    // if (getMore) {
    //   dispatch(sendHealthData(healthData, token));
    //   history.push("/assumptions");
    // }
  };
  const onChangeMail = (mail: string) => dispatch(changeMailHandler(mail));
  const onChangePassword = (password: string) =>
    dispatch(changePasswordHandler(password));

  const onSwitchAuthMode = () => dispatch(switchAuthModeHandler());

  const form = (
    <form className={classes.FormDisplay} onSubmit={handleSubmit(onSubmit)}>
      <label>E-mail address:</label>
      <input
        name="mail"
        onChange={() => onChangeMail(getValues("mail"))}
        ref={register({
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        })}
      />
      {errors.mail && (
        <span>This field have to contain an e-mail address...</span>
      )}

      <label>Password:</label>
      <input
        name="password"
        onChange={() => onChangePassword(getValues("password"))}
        ref={register({ required: true, minLength: 6 })}
      />

      {errors.password && (
        <span>This field have to contain min. 6 characters...</span>
      )}

      <Button className={classes.Button} type="submit">
        Submit
      </Button>
    </form>
  );

  return (
    <div className={classes.Form}>
      <h2>{isSignUp ? "Signin" : "Signup"} form</h2>
      <div className={classes.Border}>
        <Button className={classes.Button} onClick={onSwitchAuthMode}>
          Go to the {isSignUp ? "signup" : "signin"} page
        </Button>
        <hr></hr>
        {logout && error === null && (
          <div>
            <p>You're not signin...</p>
            <p>Signin or signup below:</p>
          </div>
        )}
        {isAuth && error === null && <p>You're signin :)</p>}
        {error && <p>Signin / signup failed :( Try again...</p>}
        {loading ? <Spinner /> : form}
      </div>
    </div>
  );
};

export default Auth;
