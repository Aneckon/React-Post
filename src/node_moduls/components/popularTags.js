import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ErrorMassages from './errorMassages';
import Loading from './loading';

function PopularTags() {
  const [{ response, isLoading, error }, doFetch] = useFetch('/tags');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMassages />;
  }

  return (
    <div className="sidebar">
      <p>PopularTags</p>
      <div className="tag-list">
        {response.tags.map((tag) => (
          <NavLink to={`/tags/${tag}`} key={tag} className="tag-default tag-pill">
            {tag}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default PopularTags;
