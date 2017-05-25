import React from "react";
import PropTypes from 'prop-types';
import { usdFormat, transactionColor } from '../helpers/money_helper';
import moment from 'moment'

function createTransactionRows(transactions) {
    return transactions.map((transaction) => {
        return (
             <tr key={transaction.time}>
              <td>{moment(transaction.time).format("YYYY-MM-DD")}</td>
              <td>{transaction.symbol}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td><span style={transactionColor(transaction.type)}>{usdFormat(transaction.price)}</span></td>
            </tr>   
        );
    });
}


const Transactions = ({transactions}) => {
  return (
    <div>
      <h2>Transactions</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {createTransactionRows(transactions)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
Transactions.propTypes = {
    transactions: PropTypes.array.isRequired
};


export default Transactions;
