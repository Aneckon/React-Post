import { useEffect, useContext } from 'react';

import { CurrentUserContexts } from '../contexts/currentUser';
import useFetch from '../hooks/useFetch';
import useLocalStorag from '../hooks/useLocalStorag';

const CurrentUserChecker = ({ children }) => {
  const [, dispatch] = useContext(CurrentUserContexts);
  const [{ response }, doFetch] = useFetch('/user');
  const [token] = useLocalStorag('token');

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED' });
      return;
    }

    doFetch();
    dispatch({ type: 'LOADING' });
  }, [doFetch, dispatch, token]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch]);
  return children;
};

export default CurrentUserChecker;
