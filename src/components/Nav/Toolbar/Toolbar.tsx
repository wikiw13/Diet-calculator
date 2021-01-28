import React, { FunctionComponent } from "react";

import classes from "./Toolbar.module.css";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavItems from "../NavItems/NavItems";

interface ToolbarProps {
  drawerToggleClicked: () => void;
  isAuth: boolean;
  fetched: boolean;
}

const Toolbar: FunctionComponent<ToolbarProps> = ({
  drawerToggleClicked,
  isAuth,
  fetched,
}) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.Logo}></div>
      <nav className={classes.DesktopOnly}>
        <NavItems isAuth={isAuth} fetched={fetched} />
      </nav>
    </header>
  );
};

export default Toolbar;
