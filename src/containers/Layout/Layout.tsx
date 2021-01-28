import React, { FunctionComponent, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../index";
import { closeSideDrawer, showSideDrawerFunction } from "../../store/actions/index";
import Toolbar from '../../components/Nav/Toolbar/Toolbar';
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);
  const showSideDrawer = useSelector((state: RootState) => state.userDataReducer.showSideDrawer);
  const fetched = useSelector(
    (state: RootState) => state.userDataReducer.fetched
  );
  

  const dispatch = useDispatch();
  
  const onSideDrawerClosed = () => {
    dispatch(closeSideDrawer());
  };

  const sideDrawerToggleHandler = () => {
    dispatch(showSideDrawerFunction())
 };

  return (
    <div className={classes.Content}>
      <Toolbar
        isAuth={isAuth}
        drawerToggleClicked={sideDrawerToggleHandler}
        fetched={fetched}
      />
      <SideDrawer
        isAuth={isAuth}
        sideDrawerClosed={onSideDrawerClosed}
        show={showSideDrawer}
        fetched={fetched}
      />
      {/* <Nav logout={logoutUser} isAuth={isAuth} fetched={fetched} /> */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
