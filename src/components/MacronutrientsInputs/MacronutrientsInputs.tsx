import React, { useState } from "react";
import { InputText } from "primereact/inputtext";


const MacronutrientsInputs = () => {
  
  return (
    <div>
      <div className="card">
        <div className="p-col-12 p-md-4">
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">$</span>
            <InputText placeholder="Price" />
            <span className="p-inputgroup-addon">.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacronutrientsInputs;