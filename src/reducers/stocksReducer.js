// stock = {
//     Day0Price: Number,
//     Day1Price: Number,
//     Day7Price: Number,
//     Day30Price: Number,
//     Symbol: ""
// }

// stocks = {
//     date: "",
//     stocks: [],
//     error: null,
//     isFetching: false
// };
import {
    FETCH_STOCKS_SUCCESS,
    FETCH_STOCKS_REQUEST,
    FETCH_STOCKS_FAILURE,
    SET_TICKER_FILTER,
    CHANGE_TICKER_ORDER
} from "../actions/stocksAction";

const initialState = {
    data: [],
    error: null,
    isFetching: false,
    filter: "",
    sort: true
};

export function stocksReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TICKER_ORDER:
            return {
                ...state,
                sort: !state.sort
            };
        case SET_TICKER_FILTER:
            return {
                ...state,
                filter: action.data
            };
        case FETCH_STOCKS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_STOCKS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case FETCH_STOCKS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data.stocks
            };
        default:
            return state;
    }
}
