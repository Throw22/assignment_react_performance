import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
//--------------------
//Reducers
//--------------------
import { dateReducer as date } from "./reducers/dateReducer";
import { stocksReducer as stocks } from "./reducers/stocksReducer";
import { cashReducer as cash } from './reducers/cashReducer';
import { portfolioReducer as portfolio } from './reducers/portfolioReducer';
import { tradeReducer as trade } from './reducers/tradeReducer';
import { transactionsReducer as transactions } from './reducers/transactionsReducer';
//----------------------
import thunk from "redux-thunk";

let stockAppReducer = combineReducers({ date, stocks, cash, portfolio, trade, transactions });

let store = createStore(stockAppReducer, applyMiddleware(thunk));
let unsubscribe = store.subscribe(() => {
  console.log("state", store.getState());
});

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);
