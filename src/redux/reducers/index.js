import { combineReducers } from "redux";
import movies from "./moviesReducer";
import subscriptions from "./subscriptionsReducer";
import users from "./usersReducer";
const rootReducer = combineReducers({
  movies,
  subscriptions,
  users,
});

export default rootReducer;
