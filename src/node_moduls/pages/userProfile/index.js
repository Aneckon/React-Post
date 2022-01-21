import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import UserArticles from './components/userArticles';

const UserProfile = ({ match }) => {
  const location = useLocation();
  const slug = match.params.slug;
  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={response.profile.image} alt="" className="user-img" />
              <h4>{response.profile.username}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink to={`/profiles/${response.profile.username}`} className="nav-link">
                    My posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${response.profile.username}/favorites`}
                    className="nav-link">
                    My favorites
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              location={location}
              username={response.profile.username}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
