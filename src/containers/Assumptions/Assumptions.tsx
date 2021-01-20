import React, { FunctionComponent, useCallback, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "rsuite";
import { useHistory } from "react-router-dom";

import classes from "./Assumptions.module.css";
import { DoughnutChart } from "../../components/DoughnutChart/DoughnutChart";
import MealsCheckbox from "../../components/MealsCheckbox/MealsCheckbox";
import { RootState } from "../../index";
import { healthDataSelector } from "../../selectors/factorSelector";
import { HealthInfo } from "../../selectors/factorSelector";
import basicTable from "../../components/Table/Table";
import {
  fetchHealthData,
  changeHealthData,
  changeCarbs,
  changeFat,
  changeProtein,
  saveAssumptionsData,
  changeMeals
} from "../../store/actions";
import MacronutrientsInputs from "../../components/MacronutrientsInputs/MacronutrientsInputs";


import {PrimeCheckboxProps} from '../../components/MealsCheckbox/MealsCheckbox';

interface AssumptionsProps {
  carbsValue: string;
  proteinValue: string;
  fatValue: string;
  selectedMeals: Array<string>;
}

const Assumptions: FunctionComponent<AssumptionsProps> = ({
  carbsValue,
  proteinValue,
  fatValue,
  selectedMeals,
}) => {
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
    (state: RootState) => state.userDataReducer.healthData
  );
  const { protein, carbs, fat } = useSelector(
    (state: RootState) => state.assumptionsReducer.macronutrients
  );
  const { meals } = useSelector((state: RootState) => state.assumptionsReducer);

  const proteinNumber = Number(protein);
  const carbsNumber = Number(carbs);
  const fatNumber = Number(fat);

  const macronutrients = [carbsNumber, proteinNumber, fatNumber];
  const macronutrientsSummary = carbsNumber + proteinNumber + fatNumber;
  console.log(macronutrientsSummary);

  const history = useHistory();

  const dispatch = useDispatch();

  const onChangeHandler = () => {
    dispatch(changeHealthData());
    history.push("/calculator");
  };
  const onChangeCarbs = (carbsAmount: string) =>
    dispatch(changeCarbs(carbsAmount));
  const onChangeProtein = (proteinAmount: string) =>
    dispatch(changeProtein(proteinAmount));
  const onChangeFat = (fatAmount: string) => dispatch(changeFat(fatAmount));
  const onSaveHandler = (selectedMeals: Array<string>) => {
    dispatch(saveAssumptionsData(selectedMeals));
  };

  const onMealChangeHandler = (e: PrimeCheckboxProps) => {
    const selectedMeals = [...meals];
    if (e.checked) selectedMeals.push(e.value);
    else selectedMeals.splice(selectedMeals.indexOf(e.value), 1);
    dispatch(changeMeals(selectedMeals));
    console.log(selectedMeals);
  };

  return (
    <div className={classes.Assumptions}>
      <h3>Your assumptions</h3>
      <hr />
      {basicTable({ activity, goal, totalCalories })}
      <Button onClick={onChangeHandler}>Change</Button>
      <hr />
      <div className={classes.Macronutrients}>
        {DoughnutChart(macronutrients)}
        <MacronutrientsInputs
          carbsChange={(carbsAmount) => onChangeCarbs(carbsAmount)}
          proteinChange={(proteinAmount) => onChangeProtein(proteinAmount)}
          fatChange={(fatAmount) => onChangeFat(fatAmount)}
          carbsValue={carbsValue}
          proteinValue={proteinValue}
          fatValue={fatValue}
        />
      </div>
      {macronutrientsSummary !== 100 && <p>Summary must be equal to 100%!</p>}
      <hr />
      <MealsCheckbox onMealChange={onMealChangeHandler} />
      {macronutrientsSummary === 100 && (
        <Button onClick={() => onSaveHandler(selectedMeals)}>Save</Button>
      )}
    </div>
  );
};

export default Assumptions;
