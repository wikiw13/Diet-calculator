import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import logger from "redux-logger";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga';

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import calculatorReducer, {
  CalculatorReducerState,
} from "./store/reducers/calculatorReducer";
import authReducer, {AuthReducerState} from './store/reducers/authReducer';
import 'rsuite/dist/styles/rsuite-default.css';
import {watchAuth} from './sagas/index';

export interface RootState {
  calculatorReducer: CalculatorReducerState;
  authReducer: AuthReducerState
}

const rootReducer = combineReducers<RootState>({
  calculatorReducer, authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(watchAuth);

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
