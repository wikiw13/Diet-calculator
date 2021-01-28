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
import LoadingModal from "../../components/Modal/LoadingModal/LoadingModal";

interface AuthProps {}

interface Inputs {
  mail: string;
  password: string;
}

const Auth: FunctionComponent<AuthProps> = () => {
  const { loading, isAuth, error, isSignUp } = useSelector(
    (state: RootState) => state.authReducer
  );

  const { key, showLoadingModal } = useSelector(
    (state: RootState) => state.userDataReducer
  );
  const loadingUserData = useSelector(
    (state: RootState) => state.userDataReducer.loading
  );

  const { register, handleSubmit, errors, getValues } = useForm<Inputs>({
    mode: "onTouched",
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    dispatch(auth(data.mail, data.password, isSignUp, history, key));
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
      type='password'
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
      <LoadingModal show={showLoadingModal} loading={loadingUserData} />
      <h2>{isSignUp ? "Login" : "Register"} form</h2>
      <div className={classes.Border}>
        {isAuth && error === null && <p>You're logged in :)</p>}
        {error && isSignUp && (
          <p className={classes.Warning}>
            Login failed :( Please try again or go to the register page.
          </p>
        )}
        {error && !isSignUp && (
          <p className={classes.Warning}>
            Register failed :( Please try again or go to the login page.
          </p>
        )}
        {loading ? <Spinner /> : form}
        <hr></hr>
        <p className={classes.Info}>
          {isSignUp ? `You don't have an account? Register here:` : 'If you want to login click:'}
        </p>
        <Button className={classes.Button} onClick={onSwitchAuthMode}>
          Switch to {isSignUp ? "register" : "login"}
        </Button>
        
      </div>
    </div>
  );
};

export default Auth;
