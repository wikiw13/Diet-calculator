import React, { FunctionComponent } from "react";

import classes from "./Backdrop.module.css";

interface BackdropProps {
  show: boolean;
  clicked: () => void;
}

const Backdrop: FunctionComponent<BackdropProps> = ({ show, clicked }) =>
  show ? <div className={classes.Backdrop} onClick={clicked} /> : null;

export default Backdrop;
