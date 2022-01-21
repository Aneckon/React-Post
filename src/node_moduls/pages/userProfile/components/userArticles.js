import React, { useEffect } from 'react';
import { stringify } from 'query-string';

import useFetch from '../../../hooks/useFetch';
import { getPaginator, limit } from '../../../utilse';
import Loading from '../../../components/loading';
import ErrorMassages from '../../../components/errorMassages';
import Feed from '../../../components/feed';
import Pagination from '../../../components/pagination';

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? {
        limit,
        offset,
        favorited: username,
      }
    : {
        limit,
        offset,
        author: username,
      };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, url }) => {
  const isFavorites = location.pathname.includes('favorites');
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites, currentPage]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMassages />}
      {!isLoading && response && (
        <div>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UserArticles;
