import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  let pages = _.range(1, pagesCount + 1);

  const first = () => {
    return onPageChange(1);
  };

  const Last = () => {
    return onPageChange(pages.length);
  };
  const Next = () => {
    const index = currentPage + 1;
    if (index > pages.length) {
      return null;
    } else {
      onPageChange(index);
    }
  };
  const Previous = () => {
    const index = currentPage - 1;
    if (index < 1) {
      return null;
    } else {
      onPageChange(index);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <span className="page-item active btn btn-secondary ">
          Page {currentPage} /{pages.length}
        </span>

        <button className="page-item btn btn-light" onClick={first}>
          First
        </button>

        <button className="page-item btn btn-light" onClick={Previous}>
          Previous
        </button>

        {pages
          .filter((page, indx) => indx < 3)
          .map(page => (
            <li key={page}>
              {/* eslint-disable-next-line */}
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        
        <button className="page-item btn btn-light">
         ...
        </button>
        <button className="page-item btn btn-light" onClick={Next}>
          Next
        </button>

        <button className="page-item btn btn-light" onClick={Last}>
          Last
        </button>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
