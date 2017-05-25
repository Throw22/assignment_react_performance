import {
    ADD_STOCKS,
    SUBTRACT_STOCKS
}
from '../actions/portfolioAction.js';


const INITIAL_STATE = {
    stocks: {},
    error: null,
    message: null
};

export function portfolioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_STOCKS:
            return {
                ...state,
                stocks: {
                    ...state.stocks,
                    [action.data.symbol]: action.data.amount + (state.stocks[action.data.symbol] || 0)
                },
                message: "Stocks added",
                error: null
            };
        case SUBTRACT_STOCKS:
            //get keys in the stocks
            let symbols = Object.keys(state.stocks);
            //check if symbol from action obj is included
            if (!symbols.includes(action.data.symbol)) {
                return {
                    ...state,
                    error: "You do not own any of those stocks",
                    message: null
                };
            }
            if (state.stocks[action.data.symbol] - action.data.amount < 0) {
                return {
                    ...state,
                    message: null,
                    error: "Not enough stock to sell"
                };
            }
            return {
                ...state,
                stocks: {
                    ...state.stocks,
                    [action.data.symbol]: (state.stocks[action.data.symbol] || 0) - action.data.amount
                },
                message: "Stocks subtracted",
                error: null
            };
        default:
            return state;
    }
}
