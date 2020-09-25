import React from 'react';
import { Link } from 'react-router-dom';

const MainNav = (props) => {

  // create default links from those provided in state
  let linkList = props.links.map(link => {
    return <li key={link}><Link to={`/${link}`} onClick={() => props.changeLoading()}>{link.charAt(0).toUpperCase() + link.substring(1)}</Link></li>
  });

  return (
    <nav className="main-nav">
      <ul>
        {linkList}
      </ul>
    </nav>
  );
};

export default MainNav;