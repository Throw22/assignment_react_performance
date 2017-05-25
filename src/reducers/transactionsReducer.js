import { ADD_TRANSACTION } from '../actions/transactionsAction';

const INITIAL_STATE = {
    data: [],
    error: null,
    message: null
};


export function transactionsReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case ADD_TRANSACTION:
            if (!action.data.amount) {
                return {
                    ...state,
                    message: null,
                    error: "Could not add transaction"
                };
            }
            
            return {
                ...state,
                error: null,
                message: "Transaction added successfully",
                data: [
                ...state.data,
                action.data
                ]
            };
        default:
            return state;
    }
}