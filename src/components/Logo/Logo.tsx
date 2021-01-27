import React, { FunctionComponent } from "react";
import classes from "./Logo.module.css";
import logo from "../../assets/images/logo czarne.jpg";

interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  return (
    <div className={classes.Logo}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
