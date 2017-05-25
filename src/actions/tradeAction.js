export const CHANGE_TRADE_QUANTITY = "CHANGE_TRADE_QUANTITY";
export const CHANGE_TRADE_TYPE = "CHANGE_TRADE_TYPE";

export function changeTradeQuantity(data){
    return {
        type: CHANGE_TRADE_QUANTITY,
        data
    };
}

export function changeTradeType(data){
    return {
        type: CHANGE_TRADE_TYPE,
        data
    };
}