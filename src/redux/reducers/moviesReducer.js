import * as types from "../actions/actionsTypes";
export default function moviesReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_MOVIE:
      return [...state, ...action.movie];
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;
    default:
      return state;
  }
}
