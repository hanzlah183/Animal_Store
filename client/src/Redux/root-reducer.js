import { combineReducers } from "redux";
import { animalReducer } from "./animal/animalReducer";
import { authReducer } from "./Auth/auth.Reducer";

export default combineReducers({ animalReducer, authReducer });
