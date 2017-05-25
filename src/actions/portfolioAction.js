export const ADD_STOCKS = "ADD_STOCKS";
export const SUBTRACT_STOCKS = "SUBTRACT_STOCKS";

export function addStocks(data) {
    return {
        type: ADD_STOCKS,
        data
    };
}

export function subtractStocks(data){
    return {
        type: SUBTRACT_STOCKS,
        data
    };
}