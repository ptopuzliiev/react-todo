import React from 'react';
import { getPagesArray } from '../../../utils/pages';

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);
  return (
    <div className="pagination">
      {pagesArray.map((p) => (
        <button
          onClick={() => changePage(p)}
          className={
            page === p ? 'pagination__btn is-current' : 'pagination__btn'
          }
          key={p}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
