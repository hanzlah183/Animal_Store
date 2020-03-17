import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllAnimals, postAnimal } from "../../Redux/animal/animalAction";
import PaginationTest from "../paginationtest/PaginationTest";
import List from "./List";


const Admin = ({
  getAllAnimals,
  admin: { user },
  postAnimal,
  animal: { name, loading }
}) => {
  const [state, setState] = useState({ name: "" });
  const [render, setRender] = useState(false)
  
  useEffect(() => {
    getAllAnimals();
    setRender(false)
  }, [getAllAnimals, state.name, render]);

  const [search, setSearch] = useState({ words: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  

  const onChange = e => setState({ [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    postAnimal(state.name);
    setState({name : ""})
  };

  const handleChange = e => {
    setSearch({ words: e.target.value });
    setCurrentPage(1);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  let filtered = name.filter(item =>
    item.name.toLowerCase().includes(search.words.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const result = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Fragment>
      <h2 className="text-secondary mt-3 text-center">
        Welcome {user ? user.name : null}
      </h2>

      <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
        <input
          className="form-control form-control-sm ml-3 w-50 text-justify"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
      </form>

      <div className="container mt-0 justify-content-sm-center">
        <div className="row">
          {search.words.length > 0 ? (
            <h3 className="text-text-info mt-4 text-left">
              Search Result:{filtered.length}
            </h3>
          ) : (
            <h3 className="text-text-info mt-4 text-left">
              Total Result:{name.length}
            </h3>
          )}
         
          <form className="input-group mb-3" onSubmit={e => onSubmit(e)}>
            <input
              type="text"
              className="form-control "
              placeholder="Add animal"
              name="name"
              value={state.name}
              onChange={e => onChange(e)}
            />
            <div className="input-group-append">
              <input type="submit" className="btn btn-primary " value="Add" />
            </div>
          </form>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Animals</th>
              <th colSpan="2" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? null
              : result.map((item, i) => (
                  <List key={i} name={item.name} id={item._id} callBack={setRender} />
                ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-sm-center mt-2">
          <PaginationTest
            onPageChange={handlePageChange}
            currentPage={currentPage}
            itemsCount={filtered.length}
            pageSize={itemsPerPage}
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  admin: state.authReducer,
  animal: state.animalReducer
});

export default connect(mapStateToProps, {
  postAnimal,
  getAllAnimals
})(Admin);
