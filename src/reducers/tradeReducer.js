import {
    CHANGE_TRADE_QUANTITY,
    CHANGE_TRADE_TYPE
} from '../actions/tradeAction';

const INITIAL_STATE = {
    quantity: 0,
    type: 'buy'
};

export function tradeReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case CHANGE_TRADE_QUANTITY:
            if (action.data < 0) {
                return {
                    ...state,
                    message: "Cannot submit a trade for a negative amount"
                };
            }
            return {
                ...state,
                quantity: action.data
            };
        case CHANGE_TRADE_TYPE:
            return {
                ...state,
                type: action.data
            };
        default:
            return state;
    }
}