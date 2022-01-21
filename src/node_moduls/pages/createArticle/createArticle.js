import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import ArticleFrom from '../../components/articleFrom';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContexts } from '../../contexts/currentUser';

function CreateArticle() {
  const apiUrl = '/articles';
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [isfullSubmit, setIsfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContexts);
  const onSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === null) {
    return null;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Navigate replace to="/" />;
  }

  if (isfullSubmit) {
    return <Navigate replace to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleFrom
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default CreateArticle;
