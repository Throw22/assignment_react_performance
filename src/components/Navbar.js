import React from 'react';
import StocksContainer from '../containers/StocksContainer';

class Navbar extends React.Component{
    shouldComponentUpdate(){
        return false;
    }
    
    render(){
        return (
            <nav className="navbar navbar-toggleable-lg navbar-inverse fixed-top bg-inverse">
                <button className="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Rideligard Stocks</a>
                <div className="collapse hidden-lg-up" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <aside className="sidebar bg-inverse position-relative">
                            <StocksContainer linkAndToggleType={true} dataToggle="collapse" dataTarget="#navbarNav" ariaControls="navbarNav" ariaExpanded="false" ariaLabel="Toggle navigation"/>
                        </aside>
                      </li>
                    </ul>
                </div>
            </nav>
        );
    }
    
}

export default Navbar;
            
            
            