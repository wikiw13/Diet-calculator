import React, { FunctionComponent, ReactNode } from "react";
import Nav from '../components/Nav/Nav';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router';

import { RootState } from "../index";
import { logout } from "../store/actions/AuthActions";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.authReducer.isAuth);
  
  const dispatch = useDispatch();
  const history = useHistory();


  const logoutUser = () => {
    dispatch(logout());
    history.push('/auth');
  };
  return (
    <div>
      <Nav logout={logoutUser} isAuth={isAuth}/>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
