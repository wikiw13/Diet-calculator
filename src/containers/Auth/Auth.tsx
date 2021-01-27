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
import LoadingModal from '../../components/Modal/LoadingModal/LoadingModal';

interface AuthProps {}

interface Inputs {
  mail: string;
  password: string;
}

const Auth: FunctionComponent<AuthProps> = () => {
  const { loading, logout, isAuth, error, isSignUp } = useSelector(
    (state: RootState) => state.authReducer
  );

  const { key, showLoadingModal } = useSelector((state: RootState) => state.userDataReducer);
  const loadingUserData = useSelector((state: RootState) => state.userDataReducer.loading);

  const { register, handleSubmit, errors, getValues } = useForm<Inputs>({
    mode: "onTouched",
  });

  const history = useHistory();


  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(
      auth(
        data.mail,
        data.password,
        isSignUp,
        history,
        key
      )
    );
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
      <LoadingModal show={showLoadingModal} loading={loadingUserData}/>
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
