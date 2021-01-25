import React, { useState, FunctionComponent, ChangeEvent } from "react";
import { Checkbox } from "primereact/checkbox";
import { useSelector } from "react-redux";

import  "./MealsCheckbox.css";
import { RootState } from "../../index";

interface MealsCheckboxProps {
  onMealChange: (e: PrimeCheckboxProps) => void;
}

export interface PrimeCheckboxProps {
  originalEvent: Event;
  value: any;
  checked: boolean;
  target: {
    type: string;
    name: string;
    id: string;
    value: any;
    checked: boolean;
  };
}

const MealsCheckbox: FunctionComponent<MealsCheckboxProps> = ({
  onMealChange,
}) => {
  const { meals } = useSelector((state: RootState) => state.assumptionsReducer);

  return (
    <div>
      <div className="card">
        <h4>Choose your meals:</h4>
        <div className='selectMealsField'>
          <div className="p-field-checkbox">
            <Checkbox
              inputId="meal1"
              name="meal"
              value="Breakfast"
              onChange={onMealChange}
              checked={meals.includes("Breakfast")}
            />
            <label htmlFor="meal1">Breakfast</label>
          </div>
          <div className="p-field-checkbox">
            <Checkbox
              inputId="meal2"
              name="meal"
              value="Lunch"
              onChange={onMealChange}
              checked={meals.includes("Lunch")}
            />
            <label htmlFor="meal2">Lunch</label>
          </div>
          <div className="p-field-checkbox">
            <Checkbox
              inputId="meal3"
              name="meal"
              value="Dinner"
              onChange={onMealChange}
              checked={meals.includes("Dinner")}
            />
            <label htmlFor="meal3">Dinner</label>
          </div>
          <div className="p-field-checkbox">
            <Checkbox
              inputId="meal4"
              name="meal"
              value="Snack"
              onChange={onMealChange}
              checked={meals.includes("Snack")}
            />
            <label htmlFor="meal4">Snack</label>
          </div>
          <div className="p-field-checkbox">
            <Checkbox
              inputId="meal5"
              name="meal"
              value="Supper"
              onChange={onMealChange}
              checked={meals.includes("Supper")}
            />
            <label htmlFor="meal5">Supper</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsCheckbox;
