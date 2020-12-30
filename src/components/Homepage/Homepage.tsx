import React, { FunctionComponent } from "react";
import classes from "./Homepage.module.css";
import logo from "../../assets/images/logo.png";
import {Button} from 'rsuite';
import {NavLink} from 'react-router-dom'

interface HomepageProps {}

const Homepage: FunctionComponent<HomepageProps> = () => {
  return (
    <div className={classes.Home}>
      <img src={logo} alt="logo" />
      <div className={classes.Goals}>
        <h2>Are you here, because...</h2>
        <hr />
        <div className={classes.GoalElements}>
          <div className={classes.GoalElement}>
            <i className="fas fa-carrot"></i>
            <p>...you want to eat healthier?</p>
          </div>
          <div className={classes.GoalElement}>
          <i className="fas fa-weight"></i>
            <p>...you want to loose weight?</p>
          </div>
          <div className={classes.GoalElement}>
          <i className="fas fa-dumbbell"></i>
            <p>...you want to gain muscle weight?</p>
          </div>
        </div>
      </div>
      <Button><NavLink to='/calculator' className={classes.NavLink}>Let's go!</NavLink></Button>
    </div>
  );
};

export default Homepage;
