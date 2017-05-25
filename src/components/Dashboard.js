import React from 'react';
import Select from './elements/Select';
import { withRouter } from 'react-router-dom';

const Dashboard = ({ children, history, match, location }) => {
  let options = [
    { value: 'trade', text: 'Trade' },
    { value: 'transactions', text: 'Transactions' },
    { value: 'portfolio', text: 'Portfolio' }
  ];
  //get the pathname, assume leading slash
  //consider regex to match starting / until next / matching groups
  let currentLocation = location.pathname.slice(1);

  return (
    <div>
      <Select
        options={options}
        value={currentLocation}
        onChange={e => history.push(`/${e.target.value}`)}
      />
      {children}
    </div>
  );
};
export default withRouter(Dashboard);
