import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginAdmin } from "../../Redux/Auth/auth.Actions";

const Login = ({ loginAdmin, Authorized }) => {
  const [state, setstate] = useState({
    email: "",
    password: ""
  });
  const { email, password } = state;

  const onChange = e => setstate({ ...state, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginAdmin(email, password);
    setstate({ email: "", password: "" });
  };

  if (Authorized.isAuthenticated) {
    return <Redirect to="/admin" />;
  }

  return (
    <Fragment>
      <h1 className="text-primary mt-4 text-center">Admin Sign In</h1>

      <form
        className="form-inline d-flex justify-content-center md-form form-sm mt-0"
        onSubmit={e => onSubmit(e)}
      >
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
          type="submit"
          className="btn btn-primary  form-control-sm ml-3 w-50 text-center mt-4"
          value="Login"
        />
      </form>
      <br />
      <p className="text-secondary text-center">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  Authorized: state.authReducer
});

export default connect(mapStateToProps, { loginAdmin })(Login);
