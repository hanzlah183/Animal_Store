import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {adminLogout} from '../../Redux/Auth/auth.Actions'

const Navbar = ({admin:{isAuthenticated, loading}, adminLogout}) => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark ">
      <Link to="/" className="navbar-brand">
        Animals
      </Link>

      <div className="navbar-nav">
        <Link to="/admin" className="nav-item nav-link ">
          Admin <span className="sr-only">(current)</span>
        </Link>
        {
          !loading && isAuthenticated ? <Link to="/login" onClick={adminLogout} className="nav-item nav-link  ">
            LogOut <span className="sr-only">(current)</span>
          </Link> : null
        }
        
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  admin : state.authReducer
})

export default connect(mapStateToProps, {adminLogout})(Navbar);
