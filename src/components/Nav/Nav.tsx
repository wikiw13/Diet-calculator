import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";


interface NavProps {
  isAuth: boolean;
  logout: () => void;
  fetched: boolean;
}

const Nav: FunctionComponent<NavProps> = ({ isAuth, logout, fetched }) => {
  return (
    <header className={classes.Nav}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/calculator">Calculator</NavLink>
          </li>
          {isAuth && fetched ? (
            <li>
              <NavLink to="/assumptions">Assumptions</NavLink>
            </li>
          ) : null}
          <li>
            {isAuth ? (
              <button onClick={logout} className={classes.Button}>
                <NavLink to="/logout">Logout</NavLink>
              </button>
            ) : (
              <NavLink to="/auth">Auth</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
