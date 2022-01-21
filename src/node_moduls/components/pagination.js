import React from 'react';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { range } from '../utilse';

const PaginationItem = ({ pages, currentPage, url }) => {
  const liClasses = classNames({
    'page-item': true,
    active: currentPage === pages,
  });
  return (
    <li className={liClasses}>
      <NavLink className="page-link" to={`${url}?page=${pages}`}>
        {pages}
      </NavLink>
    </li>
  );
};

function Pagination({ total, limit, url, currentPage }) {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <PaginationItem pages={page} currentPage={currentPage} url={url} key={page} />
      ))}
    </div>
  );
}

export default Pagination;
