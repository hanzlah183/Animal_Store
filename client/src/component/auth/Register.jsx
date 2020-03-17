import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAdmin } from "../../Redux/Auth/auth.Actions";

const Register = ({ setAdmin, Authorized }) => {
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = state;

  const onChange = e => setstate({ ...state, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      window.alert("Password dont Match");
    } else {
      setAdmin({ name, email, password });
      setstate({ name: "", email: "", password: "", password2: "" });
    }
  };

  if (Authorized.isAuthenticated) {
    return <Redirect to="/admin" />;
  }
  return (
    <Fragment>
      <h3 className="text-secondary mt-4 text-center">
        Note: Admin will register at once only{" "}
      </h3>
      <h1 className="text-primary text-center">Admin Sign Up</h1>
      <form
        className="form-inline d-flex justify-content-center md-form form-sm mt-0"
        onSubmit={e => onSubmit(e)}
      >
        <input
          required={true}
          className="form-control form-control-sm ml-3 w-50 text-justify"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => onChange(e)}
        />

        <input
          required={true}
          className="form-control form-control-sm ml-3 w-50 text-justify"
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={e => onChange(e)}
        />

        <input
          required={true}
          className="form-control form-control-sm ml-3 w-50 text-justify"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />

        <input
          required={true}
          className="form-control form-control-sm ml-3 w-50 text-justify"
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={e => onChange(e)}
        />
        <input
          type="submit"
          className="btn btn-primary form-control-sm ml-3 w-50 text-center mt-4"
          value="Register"
        />
      </form>
      <br />
      <p className="text-secondary text-center">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  Authorized: state.authReducer
});

export default connect(mapStateToProps, { setAdmin })(Register);
