import currencyFormatter from 'currency-formatter';



export function usdFormat(money) {
    return currencyFormatter.format(money, { code: "USD" });
}

export function moneyColor(money) {
    console.log("money is", money);
    if (money < 0) {
        return {
            "color": "red"
        };
    }
    return {
        "color": "black"
    };
}

export function transactionColor(type) {
    if (type === 'buy') {
        return {
            "color": "red"
        };
    }
    return {
        "color": "black"
    };
}

export function zeroRounding(num) {
    if (num < 0 && num > -0.01) {
        return 0;
    }
}

