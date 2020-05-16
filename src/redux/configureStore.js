import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose; //support for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImutableStateInvariant()))
  );
}
