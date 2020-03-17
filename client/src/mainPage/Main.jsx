import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Search from "../component/search/Search";

import { connect } from "react-redux";

import { getAllAnimals } from "../Redux/animal/animalAction";

const Main = ({ getAllAnimals, animal: { name, loading } }) => {
  useEffect(() => {
    getAllAnimals();
  }, [getAllAnimals]);

  const iterated = name.map(items => items.name);

  return (
    <Fragment >
      <h1 className="text-secondary mt-4 text-center">Search Animals</h1>
      <Search iterated={iterated} loading={loading} />
    </Fragment>
  );
};

Main.propTypes = {
  getAllAnimals: PropTypes.func.isRequired,
  animal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  animal: state.animalReducer
});

export default connect(mapStateToProps, { getAllAnimals })(Main);
