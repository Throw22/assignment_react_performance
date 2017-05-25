import { ADD_CASH, SUBTRACT_CASH } from '../actions/cashAction.js';

const INITIAL_STATE = {
    amount: 100000,
    error: null,
    message: null
};

export function cashReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_CASH:
            return {
                ...state,
                message: "Cash added",
                error: null,
                amount: state.amount + action.data
            };
        case SUBTRACT_CASH:
            if (state.amount - action.data < 0) {
                return {
                    ...state,
                    message: null,
                    error: "Not enough money in account"
                };
            }
            return {
                ...state,
                message: "Cash subtracted",
                error: null,
                amount: state.amount - action.data
            };
        default:
            return state;
    }
}