export const ADD_CASH = "ADD_CASH";
export const SUBTRACT_CASH = "SUBTRACT_CASH";

export function addCash(data) {
    return {
        type: ADD_CASH,
        data
    };
}

export function subtractCash(data) {
    return {
        type: SUBTRACT_CASH,
        data
    };
}