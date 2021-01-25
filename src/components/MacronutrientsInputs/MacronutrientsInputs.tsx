import React, { FunctionComponent, ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";
import "./MacronutrientsInputs.css";

interface InputProps {
  carbsChange: (carbsAmount: string) => void;
  proteinChange: (carbsAmount: string) => void;
  fatChange: (carbsAmount: string) => void;
  carbsValue: number;
  proteinValue: number;
  fatValue: number
}

const MacronutrientsInputs: FunctionComponent<InputProps> = ({
  carbsChange,
  proteinChange,
  fatChange,
  carbsValue,
  proteinValue,
  fatValue
}) => {
  const handleCarbsChange = (event: ChangeEvent<HTMLInputElement>) =>
    carbsChange(event.target.value);
  const handleProteinChange = (event: ChangeEvent<HTMLInputElement>) =>
    proteinChange(event.target.value);
  const handleFatChange = (event: ChangeEvent<HTMLInputElement>) =>
    fatChange(event.target.value);

  return (
    <div>
      <div className="card">
        <div className="p-grid p-fluid">
          <div className="p-col-12 p-md-4">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon carbs"></span>
              <InputText placeholder="Carbs" onChange={handleCarbsChange} value={carbsValue} />
              <span className="p-inputgroup-addon addonText">%</span>
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon protein"></span>
              <InputText placeholder="Protein" onChange={handleProteinChange} value={proteinValue} />
              <span className="p-inputgroup-addon addonText">%</span>
            </div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon fat"></span>
              <InputText placeholder="Fat" onChange={handleFatChange} value={fatValue} />
              <span className="p-inputgroup-addon addonText">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacronutrientsInputs;
