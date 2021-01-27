import React, { FunctionComponent } from "react";
import classes from "./DrawerToggle.module.css";

interface DrawerToggleProps {
    clicked: () => void
}

const DrawerToggle: FunctionComponent<DrawerToggleProps> = ({ clicked }) => {
  return (
    <div onClick={clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  );
};

export default DrawerToggle;
