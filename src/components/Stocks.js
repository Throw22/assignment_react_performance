import React from 'react';
import { Component } from 'react';
import currencyFormatter from 'currency-formatter';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import LinkAndToggle from './elements/LinkAndToggle';

function makeStockRows(stocks, restOfProps) {
  let linkAndToggleType = !!restOfProps.linkAndToggleType;

  return stocks.map(stock => {
    return (
      <tr key={stock.symbol}>
        <td>{stock.symbol}</td>
        <td>
          {stock.day_0
            ? currencyFormatter.format(+stock.day_0, { code: 'USD' })
            : 'N/A'}
        </td>
        <td>
          {stock.day_1
            ? currencyFormatter.format(+stock.day_0 - +stock.day_1, {
                code: 'USD'
              })
            : 'N/A'}
        </td>
        <td>
          {stock.day_7
            ? currencyFormatter.format(+stock.day_0 - +stock.day_7, {
                code: 'USD'
              })
            : 'N/A'}
        </td>
        <td>
          {stock.day_30
            ? currencyFormatter.format(+stock.day_0 - +stock.day_30, {
                code: 'USD'
              })
            : 'N/A'}
        </td>
        <td>
          {!linkAndToggleType
            ? <NavLink to={`/trade?symbol=${stock.symbol}`}>trade</NavLink>
            : <LinkAndToggle
                {...restOfProps}
                to={`/trade?symbol=${stock.symbol}`}
                text="trade"
              />}
        </td>
      </tr>
    );
  });
}

function orderVisibleTickers(stocks, sort) {
  if (sort) {
    return stocks.sort(function(a, b) {
      if (a.symbol < b.symbol) {
        return -1;
      } else if (a.symbol > b.symbol) {
        return 1;
      }
      return 0;
    });
  } else {
    return stocks.sort(function(a, b) {
      if (b.symbol < a.symbol) {
        return -1;
      } else if (b.symbol > a.symbol) {
        return 1;
      }
      return 0;
    });
  }
}

class Stocks extends Component {
  render() {
    const {
      stocks,
      date,
      setTickerFilter,
      changeTickerOrder,
      sort,
      ...restOfProps
    } = this.props;

    orderVisibleTickers(stocks, sort);

    return (
      <nav className="">
        <h1>Stocks</h1>
        <p>Date: {date}</p>
        <p>Ticker Filter<input type="text" onChange={setTickerFilter} /></p>
        <div className="table-responsive stocks-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  Symbol
                  <button
                    className=""
                    type="button"
                    onClick={changeTickerOrder}
                  >
                    {sort
                      ? <i
                          className="fa fa-chevron-down"
                          aria-hidden="false"
                          aria-label="ticker ascending"
                        />
                      : <i
                          className="fa fa-chevron-up"
                          aria-hidden="false"
                          aria-label="ticker ascending"
                        />}
                  </button>
                </th>
                <th>
                  Price
                  <span
                    className="glyphicon glyphicon-search"
                    aria-hidden="true"
                  />
                </th>
                <th>1D</th>
                <th>7D</th>
                <th>30D</th>
                <th>Trade?</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length ? makeStockRows(stocks, restOfProps) : null}
            </tbody>
          </table>
        </div>
      </nav>
    );
  }
}
// const Stocks = ({ stocks, date, setTickerFilter, changeTickerOrder, sort, ...restOfProps }) => {
//   return (
//     <nav className="">
//       <h1>Stocks</h1>
//       <p>Date: {date}</p>
//       <p>Ticker Filter<input type="text" onChange={setTickerFilter}/></p>
//       <div className="table-responsive stocks-table">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Symbol<button className="" type="button" onClick={changeTickerOrder}>{sort ? <i className="fa fa-chevron-down" aria-hidden="false" aria-label="ticker ascending"></i> : <i className="fa fa-chevron-up" aria-hidden="false" aria-label="ticker ascending"></i>}</button></th>
//               <th>Price<span className="glyphicon glyphicon-search" aria-hidden="true"></span></th>
//               <th>1D</th>
//               <th>7D</th>
//               <th>30D</th>
//               <th>Trade?</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.length ? makeStockRows(stocks, restOfProps) : null}
//           </tbody>
//         </table>
//       </div>
//     </nav>
//   );
// };
Stocks.propTypes = {
  stocks: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  setTickerFilter: PropTypes.func.isRequired
};
export default Stocks;
