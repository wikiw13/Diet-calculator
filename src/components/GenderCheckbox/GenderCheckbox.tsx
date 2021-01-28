import React, { FunctionComponent, ChangeEvent } from "react";

import classes from "./GenderCheckbox.module.css";

interface GenderCheckboxProps {
  onChange: (gender: string) => void;
}

const GenderCheckbox: FunctionComponent<GenderCheckboxProps> = ({
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classes.CheckboxField}>
      <label>Gender:</label>
      <div className={classes.Checkbox}>
        <label className={classes.CheckboxElement}>
          <input
            type="radio"
            name="gender"
            onChange={handleChange}
            value="female"
          />
          <span className={classes.checkmark}></span>
          <span className={classes.Label}>Female</span>
        </label>
        <label className={classes.CheckboxElement}>
          <input
            type="radio"
            name="gender"
            onChange={handleChange}
            value="male"
          />
          <span className={classes.checkmark}></span>
          <span className={classes.Label}>Male</span>
        </label>
        <label className={classes.CheckboxElement}>
          <input
            type="radio"
            name="gender"
            onChange={handleChange}
            value="other"
          />
          <span className={classes.checkmark}></span>
          <span className={classes.Label}>Other</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
