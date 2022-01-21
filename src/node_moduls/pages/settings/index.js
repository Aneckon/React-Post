import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import BackendErrorMessages from '../../components/backendErrorMessages';
import { CurrentUserContexts } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';
import useLocalStorag from '../../hooks/useLocalStorag';

function Settings() {
  const apiUrl = '/user';
  const [{ response, error }, doFetch] = useFetch(apiUrl);

  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [currentUserState, dispatch] = useContext(CurrentUserContexts);
  const [, setToken] = useLocalStorag('token');
  const [isLogout, setIsLogout] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          email,
          password,
        },
      },
    });
  };

  const Logout = (event) => {
    event.preventDefault();
    setToken('');
    dispatch({ type: 'LOGOUT' });
    setIsLogout(true);
  };

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }

    setImage(currentUserState.currentUser.image);
    setUsername(currentUserState.currentUser.username);
    setEmail(currentUserState.currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);

  if (isLogout) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Img"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="UserName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button type="submit" className="btn btn-lg pull-xs-right btn-primary">
                    UpDate settings
                  </button>
                </fieldset>
              </fieldset>
            </form>
            <hr />
            <button
              onClick={Logout}
              type="submit"
              className="btn btn-lg pull-xs-left btn-outline-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
