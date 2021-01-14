import React, { FunctionComponent, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";

import classes from "./Assumptions.module.css";
import { DoughnutChart } from "../../components/DoughnutChart/DoughnutChart";
// import {
//   changeMailHandler,
//   changePasswordHandler,
//   switchAuthModeHandler,
//   auth,
// } from "../../store/actions/AuthActions";
import { RootState } from "../../index";
import { healthDataSelector } from "../../selectors/factorSelector";
import { HealthInfo } from "../../selectors/factorSelector";
import basicTable from "../../components/Table/Table";
import { fetchHealthData, changeHealthData } from "../../store/actions";

interface AssumptionsProps {}

const Assumptions: FunctionComponent<AssumptionsProps> = () => {
  const {
    loading,
    logout,
    isAuth,
    error,
    token,
    userId,
    isSignUp,
  } = useSelector((state: RootState) => state.authReducer);
  //   const getMore = useSelector(
  //     (state: RootState) => state.calculatorReducer.getMore
  //   );
  const { activity, goal, totalCalories } = useSelector(
    (state: RootState) => state.assumptionsReducer.healthData
  );

  const history = useHistory();

  const dispatch = useDispatch();
  const onFetchHealthData = useCallback(
    (token: string | null, userId: string | null) =>
      dispatch(fetchHealthData(token, userId)),
    [dispatch]
  );
  const onChangeHandler = () => {
    dispatch(changeHealthData());
    history.push('/calculator')
  };

  useEffect(() => {
    onFetchHealthData(token, userId);
  }, [token, userId, onFetchHealthData]);

  return (
    <div className={classes.Assumptions}>
      <h3>Your assumptions</h3>
      <hr />
      {basicTable({ activity, goal, totalCalories })}
      <Button onClick={onChangeHandler}>Change</Button>

      {DoughnutChart()}
    </div>
  );
};

export default Assumptions;
