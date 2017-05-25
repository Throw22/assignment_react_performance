import React from "react";
import Select from './elements/Select';
import currencyFormatter from 'currency-formatter';
import serialize from 'form-serialize';


function usdFormat(num) {
    return currencyFormatter.format(num, {
        code: "USD"
    })
}

function symbolsOptions(symbols) {
    return symbols.map((symbol) => {
        return {
            value: symbol,
            text: symbol
        };
    });
}

const Trade = ({
    onTradeSubmit,
    symbol,
    symbols,
    onChangeTradeForm,
    cash,
    price,
    quantity,
    onChangeTradeQuantity,
    onChangeTradeType,
    type,
    stocksQuantity,
    validationObj
}) => {
    return (
        <div>
        <h2>Trade</h2>
        <div className="row">
    
            <div className="col-sm-8">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let formData = serialize(e.target, { hash: true });
                    console.log("formDdata", formData);
                    onTradeSubmit(formData);
                }}
                >
                    <div className="form-group">
                        <label>Symbol</label>
                        <Select options={symbolsOptions(symbols)} value={symbol} name="symbol" onChange={(e) => {
                            onChangeTradeForm(e.target.value);
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Buy/Sell</label>
                        <Select options={[{value: "buy", text: "Buy"}, {value: "sell", text: "Sell"}]} name="type" onChange={(e) => {
                            onChangeTradeType(e.target.value);
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input className="form-control" name="amount" type="number" value={quantity || ""} onChange={(e) => {
                            onChangeTradeQuantity(e.target.value);
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input className="form-control" type="date"/>
                    </div>
                    <p>Price: {price ? usdFormat(price) : "Loading..."}</p>
                    <p>Total: {usdFormat(price * quantity)}</p>
                    <input className="form-control" type="hidden" name="price" value={price * quantity}/>
                    <button disabled={!validationObj.isValid} className="btn btn-primary" type="submit">Place Order</button>
                </form>
            </div>
            <div className="col-sm-4">
                <p>Cash Available: {usdFormat(cash)}</p>
                <p>Stocks Available: {stocksQuantity}</p>
                <p>Order Status: {validationObj.message}</p>
            </div>
        </div>
    </div>
    );
};

export default Trade;
