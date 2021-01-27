import React, { FunctionComponent, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, clearData } from "../../../store/actions/index";

interface LogoutProps {}

const Logout: FunctionComponent<LogoutProps> = ({}) => {
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearData());
  };

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Redirect to="/" />;
};

export default Logout;
