import axios from "axios";
import { authTypes } from "./auth.Type";
import { setAuthToken } from "../../component/utils/setAuthToken";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/me");

    dispatch({
      type: authTypes.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: authTypes.AUTH_ERROR
    });
  }
};

export const setAdmin = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);
    dispatch({
      type: authTypes.REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: authTypes.REGISTER_FAIL,
      payload: error.ErrorResponse
    });
    window.alert(error.response.data.error);
  }
};

export const loginAdmin = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: authTypes.LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: authTypes.LOGIN_FAIL,
      payload: { error: "something wrong" }
    });
    window.alert(error.response.data.error);
  }
};

export const adminLogout = () => dispatch => {
  dispatch({
    type: authTypes.LOGOUT_SUCCESS
  });
};
