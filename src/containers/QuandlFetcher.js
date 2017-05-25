import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchStocks
}
from "../actions/stocksAction";

class QuandlFetcher extends Component{
    
    componentDidMount() {
        this.props.fetchStocks(this.props.date);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.date !== this.props.date) {
            this.props.fetchStocks(newProps.date);
        }
    }
    
    render(){
        return(
            <div>
                {this.props.children}
            </div>
            );
    }
}

function mapStateToProps(state) {
    return {
        date: state.date,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStocks: date => {
            dispatch(fetchStocks(date));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuandlFetcher);
