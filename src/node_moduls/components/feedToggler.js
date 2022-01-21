import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CurrentUserContexts } from '../contexts/currentUser';

function FeedToggler({ tagName }) {
  const [currentUserState] = useContext(CurrentUserContexts);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              Your feed
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`${tagName}`} className="nav-link active">
              # {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default FeedToggler;
