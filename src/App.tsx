import React, { useCallback, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "./store/actions/index";
import "./App.css";
import Layout from "./containers/Layout/Layout";
import Calculator from "./containers/Calculator/Calculator";
import Auth from "./containers/Auth/Auth";
import Assumptions from "./containers/Assumptions/Assumptions";
import Homepage from "./components/Homepage/Homepage";
import Logout from "./containers/Auth/Logout/Logout";

function App() {
  const dispatch = useDispatch();

  const onTryAutoSignup = useCallback(
    () => dispatch(actions.authCheckState()),
    [dispatch]
  );

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/calculator" component={Calculator} />
      <Route path="/auth" component={Auth} />
      <Route path="/assumptions" component={Assumptions} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={Homepage} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
