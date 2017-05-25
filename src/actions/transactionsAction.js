export const ADD_TRANSACTION = "ADD_TRANSACTION";

export function addTransaction(data) {
    return {
        type: ADD_TRANSACTION,
        data
    };
}

import { addCash, subtractCash } from '../actions/cashAction';
import { addStocks, subtractStocks } from '../actions/portfolioAction';

export function submitTransaction(data){
    return (dispatch) => {
        //assume it is a valid transaction
        dispatch(addTransaction(data));
        //check if it was type buy or sell
        if (data.type === 'buy') {
            //remove cash
            dispatch(subtractCash(data.price));
            //add stock
            dispatch(addStocks({amount:data.amount, symbol:data.symbol}));
        } else { //assume it is a sell transaction
            //add cash
            dispatch(addCash(data.price));
            //remove stock
            dispatch(subtractStocks({amount:data.amount, symbol:data.symbol}));
        }
        
        
    };
}