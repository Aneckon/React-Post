import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import ArticleFrom from '../../components/articleFrom';
import useFetch from '../../hooks/useFetch';
import { CurrentUserContexts } from '../../contexts/currentUser';

function EditArticle({ match }) {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [isfullSubmit, setIsfullSubmit] = useState(false);
  const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] =
    useFetch(apiUrl);
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContexts);
  const [initialValues, setInitialValues] = useState(null);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList.join(' '),
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Navigate replace to="/" />;
  }

  if (isfullSubmit) {
    return <Navigate replace to={`/articles/${updateArticleResponse.article.slug}`} />;
  }

  return (
    <div>
      <ArticleFrom
        onSubmit={handleSubmit}
        initialValues={initialValues}
        errors={(updateArticleError && updateArticleError.errors) || {}}
      />
    </div>
  );
}

export default EditArticle;
