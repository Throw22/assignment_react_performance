import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transactions from '../components/Transactions';

function mapStateToProps(state) {
    return {
        transactions: state.transactions.data
    };
}


const TransactionsContainer = connect(mapStateToProps)(Transactions);

export default TransactionsContainer;