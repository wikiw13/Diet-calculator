import React, { FunctionComponent, ReactNode } from "react";
import classes from "./NavItems.module.css";

import NavItem from './NavItem/NavItem';

interface NavItemsProps {
  isAuth: boolean,
  fetched: boolean
 
}

const NavItems: FunctionComponent<NavItemsProps> = ({ isAuth, fetched }) => {
  return (
    <ul className={classes.NavigationItems}>
        <NavItem link='/' exact>HOME</NavItem>
        <NavItem link='/calculator' exact={false}>CALCULATOR</NavItem>
        {fetched && <NavItem link='/assumptions' exact={false} >ASSUMPTIONS</NavItem>}
        {isAuth 
            ? <NavItem link='/logout' exact={false}>LOGOUT</NavItem> 
            : <NavItem link='/auth' exact={false}>LOG IN / REGISTER</NavItem>}
        
    </ul>
  );
};

export default NavItems;
