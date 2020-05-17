import { combineReducers } from "redux";
import movies from "./moviesReducer";
import subscriptions from "./subscriptionsReducer";
const rootReducer = combineReducers({
  movies,
  subscriptions,
});

export default rootReducer;
