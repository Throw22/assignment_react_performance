import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trade from '../components/Trade';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
//-----Import trade actions
import { changeTradeQuantity, changeTradeType } from '../actions/tradeAction';
import { submitTransaction } from '../actions/transactionsAction';

class TradeContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <Trade {...this.props} />;
  }
}

function mapStateToProps(state, ownProps) {
  let symbols = getSymbols(state.stocks.data);
  let symbol =
    qs.parse(ignoreQuestionMark(ownProps.location.search)).symbol || symbols[0];
  let cash = state.cash.amount;
  let price = state.stocks.data.length
    ? state.stocks.data.find(stock => {
        return stock.symbol === symbol;
      })['day_0']
    : 0;
  let stocksQuantity = state.portfolio.stocks[symbol] || 0;
  let type = state.trade.type;
  let quantity = state.trade.quantity;
  let validationObj = buildValidationObj(
    price,
    quantity,
    cash,
    type,
    stocksQuantity
  );
  return {
    symbol,
    symbols,
    cash,
    price,
    stocksQuantity,
    type,
    quantity,
    validationObj
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeTradeForm: symbol => {
      ownProps.history.push(`/trade?symbol=${symbol}`);
    },
    onChangeTradeQuantity: value => {
      dispatch(changeTradeQuantity(+value));
    },
    onChangeTradeType: type => {
      dispatch(changeTradeType(type));
    },
    onTradeSubmit: formData => {
      //add transaction to the list
      //add current time to the transaction
      formData.amount = +formData.amount;
      formData.price = +formData.price;
      formData.time = Date.now();
      dispatch(submitTransaction(formData));
      //modify cash

      //modify portfolio
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TradeContainer)
);

function getSymbols(stocks) {
  return stocks.map(stock => {
    return stock.symbol;
  });
}

function ignoreQuestionMark(qs) {
  if (qs[0] === '?') {
    return qs.slice(1);
  }
  return qs;
}

function buildValidationObj(price, quantity, cash, type, stocksQuantity) {
  //If order is not valid, find out why
  if (price * quantity > cash && type === 'buy') {
    return {
      isValid: false,
      message: <span className="text-danger">You don't have enough money</span>
    };
  } else if (quantity > stocksQuantity && type === 'sell') {
    return {
      isValid: false,
      message: (
        <span className="text-danger">You don't have enough of that stock</span>
      )
    };
  }
  return {
    isValid: true,
    message: <span className="text-success">Order is valid</span>
  };
}
