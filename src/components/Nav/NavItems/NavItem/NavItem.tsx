import React, { FunctionComponent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavItem.module.css";

interface NavItemProps {
  link: string,
  exact: boolean,
  children: ReactNode
}

const NavItem: FunctionComponent<NavItemProps> = ({ link, exact, children }) => {
  return (
    <li className={classes.NavigationItem}>
        <NavLink 
            to={link} 
            exact={exact}
            activeClassName={classes.active}>{children}</NavLink>
    </li>
  );
};

export default NavItem;
