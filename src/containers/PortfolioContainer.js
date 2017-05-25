import React, {
    Component
}
from "react";
import {
    connect
}
from "react-redux";
import Portfolio from "../components/Portfolio";
import { zeroRounding } from '../helpers/money_helper';


function mapStateToProps(state) {
    return {
        stocks: createPortfolioStocks(state.portfolio.stocks, state.stocks.data, state.transactions.data),
        date: state.date
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, null)(Portfolio);


function createPortfolioStocks(portfolio, stocks, transactions) {
    //get the keys in the portfolio
    let ownedStockSymbols = Object.keys(portfolio);
    let ownedStocksPriceData = stocks.filter((stock) => {
        return ownedStockSymbols.includes(stock.symbol);
    })
    return ownedStocksPriceData.map((ownedStock) => {
        let stockSymbol = ownedStock.symbol;
        let tempObj = {
            ...ownedStock
        };
        //then include the number of that stock owned
        tempObj.amount = portfolio[stockSymbol];
        tempObj.currentValue = (tempObj.amount * ownedStock.day_0);
        //then go through the transactions to determine cost basis
        //should expect costBasis.stocks to equal total amount of stock
        //and costBasis.cost to be the cost basis
        let costBasis = transactions.reduce((acc, transaction) => {
            if (transaction.symbol === stockSymbol) {
                if (transaction.type === 'buy') {
                    //amount refers to the amount of stock traded
                    acc.stocks += transaction.amount;
                    //price refers to the cost transaction price
                    acc.cost += transaction.price;
                    return acc;
                } else { //assume it is a sale
                    //percent as a decimal
                    let percentOfStocksSold = (transaction.amount / acc.stocks);
                    acc.stocks -= transaction.amount;
                    acc.cost = acc.cost * ( 1 - percentOfStocksSold );
                    return acc;
                }
            }
            return acc;
        }, { stocks: 0, cost: 0 });
        //pull relevant information out from calculation
        tempObj.costBasis = costBasis.cost;
        //profit/loss is currentValue - costBasis
        tempObj.pl = zeroRounding(tempObj.currentValue - tempObj.costBasis);
        return tempObj;
    });

}