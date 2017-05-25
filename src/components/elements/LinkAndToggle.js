import React from 'react';
import {
    withRouter
}
from 'react-router-dom';

const LinkAndToggle = ({ history, to, text, dataToggle, dataTarget, ariaControls, ariaExpanded, ariaLabel }) => {
    return (
        <button data-toggle={dataToggle} data-target={dataTarget} aria-controls={ariaControls} aria-expanded={ariaExpanded} aria-label={ariaLabel} type="button" onClick={() => {
            history.push(to);
        }}>{text}
        </button>
    );
};

export default withRouter(LinkAndToggle);


