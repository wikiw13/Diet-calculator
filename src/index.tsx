import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import logger from "redux-logger";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga';
import 'fontsource-roboto';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import calculatorReducer, {
  CalculatorReducerState,
} from "./store/reducers/calculatorReducer";
import authReducer, {AuthReducerState} from './store/reducers/authReducer';
import assumptionsReducer, {AssumptionsReducerState} from './store/reducers/assumptionsReducer';
import 'rsuite/dist/styles/rsuite-default.css';
import {watchAuth, watchCalculator, watchAssumptions} from './store/sagas/index';

export interface RootState {
  calculatorReducer: CalculatorReducerState;
  authReducer: AuthReducerState;
  assumptionsReducer: AssumptionsReducerState
}

const rootReducer = combineReducers<RootState>({
  calculatorReducer, authReducer, assumptionsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCalculator)
sagaMiddleware.run(watchAssumptions)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
