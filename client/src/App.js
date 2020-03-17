import React,{Fragment, useEffect} from "react";

import Main from "./mainPage/Main";
import Register from "./component/auth/Register";
import Login from "./component/auth/login";
import Admin from "./component/adminPanel/Admin";
import PrivateRoute from './component/privateRoutes/PrivateRoute'
import Navbar from './component/navbar/Navbar'
import Update from './component/adminPanel/Update'

import { Route, Switch } from "react-router-dom";

import { loadUser} from './Redux/Auth/auth.Actions'
import {setAuthToken} from './component/utils/setAuthToken'
import store from "./Redux/store";

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  return (
    <Fragment>
      <Navbar />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute  path="/admin" component={Admin} />
      <PrivateRoute  path="/update/:id" component={Update} />
    </Switch>
    </Fragment>
  );
};

export default App;
