import { combineReducers } from "redux";
import global, { GlobalState } from "./global";

export type RootState = {
  global: GlobalState;
};

export default combineReducers({
  global
});
