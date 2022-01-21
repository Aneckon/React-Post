import classNames from 'classnames';
import React from 'react';
import useFetch from '../hooks/useFetch';

function AddToFavorites({ isFavorited, favoritesCount, slug }) {
  const apiUrl = `/articles/${slug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoritedCountAdd = response ? response.article.favoritesCount : favoritesCount;
  const favoritedCountDelete = response ? response.article.favorited : isFavorited;
  const btnClasses = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': favoritedCountDelete,
    'btn-outline-primary': !favoritedCountDelete,
  });
  const handleLike = (event) => {
    event.preventDefault();
    doFetch({
      method: favoritedCountDelete ? 'delete' : 'post',
    });
  };

  return (
    <button className={btnClasses} onClick={handleLike}>
      {favoritedCountAdd}
    </button>
  );
}

export default AddToFavorites;
