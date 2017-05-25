import React from "react";
import PropTypes from 'prop-types';
import {
    NavLink
}
from 'react-router-dom';
//Money Formatter
import { usdFormat, moneyColor } from '../helpers/money_helper';


function makeStockRows(stocks) {
    return stocks.map(stock => {
        return (
            <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.amount}</td>
                <td>{usdFormat(stock.costBasis)}</td>
                <td>{usdFormat(stock.currentValue)}</td>
                <td><span style={moneyColor(stock.pl)}>{usdFormat(stock.pl)}</span></td>
                <td><span style={moneyColor(+stock.day_0)}>{stock.day_0 ? usdFormat(+stock.day_0) : "N/A"}</span></td>
                <td><span style={moneyColor(+stock.day_1)}>{stock.day_1 ? usdFormat(+stock.day_0 - +stock.day_1) : "N/A"}</span></td>
                <td><span style={moneyColor(+stock.day_7)}>{stock.day_7 ? usdFormat(+stock.day_0 - +stock.day_7) : "N/A"}</span></td>
                <td><span style={moneyColor(+stock.day_30)}>{stock.day_30 ? usdFormat(+stock.day_0 - +stock.day_30) : "N/A"}</span> </td>
                <td><NavLink to={`/trade?symbol=${stock.symbol}`}>trade</NavLink></td>
            </tr>
        );
    });
}

const Portfolio = ({
    stocks,
    date
}) => {
    return (
       <div> 
          <h2>Portfolio</h2>
          <p>Date: {date}</p>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Cost Basis</th>
                  <th>Current Value</th>
                  <th>Profit/Loss</th>
                  <th>Current Price</th>
                  <th>1Day</th>
                  <th>7Day</th>
                  <th>30Day</th>
                  <th>Trade?</th>
                </tr>
              </thead>
              <tbody>
                {stocks.length ? makeStockRows(stocks) : null}
              </tbody>
            </table>
          </div>
        </div>
    );
};
Portfolio.propTypes = {
    stocks: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
};
export default Portfolio;
