import React, { FunctionComponent } from "react";

import classes from "./Backdrop.module.css";

interface BackdropProps {
  show: boolean;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ show }) =>
  show ? <div className={classes.Backdrop} /> : null;

export default Backdrop;
