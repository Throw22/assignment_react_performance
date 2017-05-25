import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./Navbar";
import StocksContainer from "../containers/StocksContainer";
import Dashboard from "./Dashboard";
import TransactionsContainer from "../containers/TransactionsContainer";
import TradeContainer from "../containers/TradeContainer";
import PortfolioContainer from "../containers/PortfolioContainer";
import DateSliderContainer from "../containers/DateSliderContainer";
import QuandlFetcher from '../containers/QuandlFetcher';
import PerfComponent from './PerfComponent';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container-fluid">
            <div className="row">
                <aside className="col-lg-5 hidden-md-down bg-faded sidebar">
                    <StocksContainer />
                </aside>
              <main className="col-12 col-lg-7 offset-lg-5 pt-3">
                <DateSliderContainer />
                <Dashboard>
                  <Switch>
                    <Route path="/transactions" component={TransactionsContainer} />
                    <Route path="/portfolio" component={PortfolioContainer} />
                    <Route exact path="/trade" component={TradeContainer} />
                    <Redirect exact from="/" to="/trade" />
                    <Route render={() => <h1>Page Not Found</h1>} />
                  </Switch>
                </Dashboard>
                <PerfComponent />

              </main>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
