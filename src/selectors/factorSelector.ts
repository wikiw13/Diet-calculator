import { RootState } from "..";
import { calculateBMR, calculateTEE, calculateBMI, calculateTotalCalories } from "../shared/utility";

export interface HealthInfo {
  BMI: number;
  BMR: number;
  TEE: number;
  totalCalories: number;
}

export const healthDataSelector = ({calculatorReducer: {healthData: {weight, height, age, gender, activity, goal}}}: RootState) => {
    const BMR = calculateBMR(weight, height, age, gender);
    const TEE = calculateTEE(BMR, activity)
    return {
        BMI: calculateBMI(weight, height),
        BMR,
        TEE,
        totalCalories: calculateTotalCalories(TEE, goal)
    }
  
};
