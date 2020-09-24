import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const MainNav = (props) => {

  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/cats" onClick={() => props.changeLoading()}>Cats</Link></li>
        <li><Link to="/dogs" onClick={() => props.changeLoading()}>Dogs</Link></li>
        <li><Link to="/computers" onClick={() => props.changeLoading()}>Computers</Link></li>
      </ul>
    </nav>
  );
};

export default withRouter(MainNav);