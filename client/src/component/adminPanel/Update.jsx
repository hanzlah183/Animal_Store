import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getAnimalById, updateAnimal } from "../../Redux/animal/animalAction";
import { Link, withRouter } from "react-router-dom";

const Update = ({
  match,
  updateAnimal,
  history,
  getAnimalById,
  animal: { loading, animal }
}) => {
  const [state, setstate] = useState({ name: "" });

  useEffect(() => {
    getAnimalById(match.params.id);
    setstate({
      name: loading || !animal.name ? "" : animal.name
    });
  }, [getAnimalById, match.params.id, loading, animal.name]);

  const onChange = e => setstate({ [e.target.name]: e.target.value });
  const { name } = state;
  const onSubmit = async e => {
    e.preventDefault();

    updateAnimal(match.params.id, name, history);
  };

  return (
    <Fragment>
      <h1 className="text-primary mt-4 text-center">Update Animal</h1>
      <form
        className="form-inline d-flex  justify-content-center md-form form-sm mt-0"
        onSubmit={e => onSubmit(e)}
      >
        <input
          className="form-control form-control-sm ml-3 w-50 text-justify"
          type="text"
          name="name"
          value={state.name}
          onChange={e => onChange(e)}
        />
        <input
          type="submit"
          className="btn btn-success form-control-sm ml-3 w-50 text-center mt-4"
          value="Update"
        />
      
      <Link
        to={"/admin"}
        className="btn btn-secondary  form-control-sm ml-3 w-50 text-center mt-2 "
      >
        Cancel
      </Link>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  animal: state.animalReducer
});
export default connect(mapStateToProps, { getAnimalById, updateAnimal })(
  withRouter(Update)
);
