import React, {
  FunctionComponent,
  
} from "react";
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
  changeHealthData,
  changeCarbs,
  changeFat,
  changeProtein,
  changeMeals,
  updateHealthData,
} from "../../store/actions";
import MacronutrientsInputs from "../../components/MacronutrientsInputs/MacronutrientsInputs";
import LoadingModal from '../../components/Modal/LoadingModal/LoadingModal';
import { PrimeCheckboxProps } from "../../components/MealsCheckbox/MealsCheckbox";

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
}) => {
  const { activity, goal, weight, height, gender, age } = useSelector(
    (state: RootState) => state.calculatorReducer.healthData
  );
  const { BMI, BMR, TEE } = useSelector<RootState, HealthInfo>(
    healthDataSelector
  );
  const { protein, carbs, fat } = useSelector(
    (state: RootState) => state.userDataReducer.macronutrients
  );
  const { key, meals, showLoadingModal, loading } = useSelector((state: RootState) => state.userDataReducer);
  const { totalCalories } = useSelector((state: RootState) => state.userDataReducer.userData);
  const fetchedActivity = useSelector((state: RootState) => state.userDataReducer.userData.activity);
  const fetchedGoal = useSelector((state: RootState) => state.userDataReducer.userData.goal);
  const { userId, token } = useSelector(
    (state: RootState) => state.authReducer
  );

  const proteinNumber = Number(protein);
  const carbsNumber = Number(carbs);
  const fatNumber = Number(fat);

  const macronutrients = [carbsNumber, proteinNumber, fatNumber];
  const macronutrientsSummary = carbsNumber + proteinNumber + fatNumber;

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
          'carbs': carbsNumber,
          'protein': proteinNumber,
          'fat': fatNumber
        },
        meals: [...meals],
      },
    },
  };

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
  const onSaveAssumptionsData = () => {
    dispatch(updateHealthData(updatedHealthData, token, key));
  };

  const onMealChangeHandler = (e: PrimeCheckboxProps) => {
    const selectedMeals = [...meals];
    if (e.checked) selectedMeals.push(e.value);
    else selectedMeals.splice(selectedMeals.indexOf(e.value), 1);
    dispatch(changeMeals(selectedMeals));
  };

  return (
    <div className={classes.Assumptions}>
      <LoadingModal show={showLoadingModal} loading={loading}/>
      <h3>Your assumptions</h3>
      <hr />
      {basicTable({ fetchedActivity, fetchedGoal, totalCalories })}
      <Button onClick={onChangeHandler}>Change</Button>
      <hr />
      <div className={classes.Macronutrients}>
        {DoughnutChart(macronutrients)}
        <div className={classes.MacronutrientsInputs}>
        <MacronutrientsInputs
          carbsChange={(carbsAmount) => onChangeCarbs(carbsAmount)}
          proteinChange={(proteinAmount) => onChangeProtein(proteinAmount)}
          fatChange={(fatAmount) => onChangeFat(fatAmount)}
          carbsValue={carbs}
          proteinValue={protein}
          fatValue={fat}
        />
        </div>
        
      </div>
      {macronutrientsSummary !== 100 && <p>Summary must be equal to 100%!</p>}
      <hr />
      <MealsCheckbox onMealChange={onMealChangeHandler} />
      {macronutrientsSummary === 100 && (
        <Button onClick={onSaveAssumptionsData}>Save</Button>
      )}
    </div>
  );
};

export default Assumptions;
