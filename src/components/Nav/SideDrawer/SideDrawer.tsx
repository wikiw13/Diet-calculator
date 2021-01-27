import React, { FunctionComponent } from "react";
import classes from './SideDrawer.module.css';
import Backdrop from '../../Backdrop/Backdrop';
import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';

interface SideDrowerProps {
    show: boolean,
    sideDrawerClosed: () => void,
    isAuth: boolean;
    fetched: boolean;
    
}

const SideDrower: FunctionComponent<SideDrowerProps> = ({ show, isAuth, sideDrawerClosed, fetched, }) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    };

    return (
        <div>
            <Backdrop show={show} clicked={sideDrawerClosed}/>
            <div className={attachedClasses.join(' ')} onClick={sideDrawerClosed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuth={isAuth} fetched={fetched}/>
                </nav>
            </div>
        </div>
    );
};

export default SideDrower;
