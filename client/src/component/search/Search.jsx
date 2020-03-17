import React, { useState } from "react";
import List from "../list-item/ListItem";

import PaginationTest from '../paginationtest/PaginationTest'


const Search = ({ iterated, loading }) => {
  const [state, setState] = useState({ search: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleChange = e => {
    setState({ search: e.target.value });
    setCurrentPage(1);
  };

  let filtered = iterated.filter(item =>
    item.toLowerCase().includes(state.search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const result = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4 justify-content-sm-center">
      <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <input
          className="form-control form-control-sm ml-3 w-75 text-justify"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
      </form>
      <br />
      {state.search.length > 0 ? (
        <h3 className="text-text-info mt-4 text-right">
          Search Result:{filtered.length}
        </h3>
      ) : (
        <h3 className="text-text-info mt-4 text-left">
          Total Result:{iterated.length}
        </h3>
      )}

      {loading ? <h3>Loading...</h3> : <List result={result} />}
      <div className="d-flex justify-content-sm-center">
        <PaginationTest
          onPageChange={handlePageChange}
          currentPage={currentPage}
          itemsCount={filtered.length}
          pageSize={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default Search;
