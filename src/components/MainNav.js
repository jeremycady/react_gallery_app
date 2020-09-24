import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const MainNav = (props) => (
  <nav className="main-nav">
    <ul>
      <li><Link to="/cats">Cats</Link></li>
      <li><Link to="/dogs">Dogs</Link></li>
      <li><Link to="/computers">Computers</Link></li>
    </ul>
  </nav>
);

export default withRouter(MainNav);