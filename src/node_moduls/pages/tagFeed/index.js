import { stringify } from 'query-string';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorMassages from '../../components/errorMassages';
import Feed from '../../components/feed';
import FeedToggler from '../../components/feedToggler';
import Loading from '../../components/loading';
import Pagination from '../../components/pagination';
import PopularTags from '../../components/popularTags';
import useFetch from '../../hooks/useFetch';
import { getPaginator, limit } from '../../utilse';

const TagFeed = ({ match }) => {
  const location = useLocation();
  const tagName = match.params.slug;
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const url = location.pathname;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMassages />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagFeed;
