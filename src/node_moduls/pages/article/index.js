import React, { useEffect, useContext, useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import ErrorMassages from '../../components/errorMassages';
import Loading from '../../components/loading';
import TagList from '../../components/tagList';
import { CurrentUserContexts } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';

const Articles = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [
    { response: fetchArticleResponse, error: fetchArticleError, isLoading: fetchArticleIsLoading },
    doFetch,
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContexts);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (currentUserState.isLoggedIn === null || !fetchArticleResponse) {
      return false;
    }
    return currentUserState.currentUser.username === fetchArticleResponse.article.author.username;
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return () => {
        setIsSuccessfullDelete({});
      };
    }

    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    return <Navigate replace to="/" />;
  }

  if (!fetchArticleIsLoading && fetchArticleResponse && !fetchArticleResponse.article.title) {
    return <Navigate replace to="/" />;
  }
  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">{fetchArticleResponse.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <>
                  <NavLink
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}>
                    Edit
                  </NavLink>
                  <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle}>
                    delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMassages />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
