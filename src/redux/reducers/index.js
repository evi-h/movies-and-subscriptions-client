import { combineReducers } from "redux";
import movies from "./moviesReducer";
import subscriptions from "./subscriptionsReducer";
import users from "./usersReducer";
import members from "./membersReducer";
import authentication from "./authenticationReducer";
const rootReducer = combineReducers({
  movies,
  subscriptions,
  users,
  members,
  authentication,
});

export default rootReducer;
