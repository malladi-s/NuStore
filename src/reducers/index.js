import { combineReducers } from "redux";
import AuthenticationReducer from "../reducers/authentication";
import ErrorReducer from "../reducers/error";

const reducers = {
  authentication: AuthenticationReducer,
  error: ErrorReducer
};

export default combineReducers(reducers);
