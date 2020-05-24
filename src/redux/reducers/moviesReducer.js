import * as types from "../actions/actionsTypes";
export default function moviesReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_MOVIE_SUCCESS:
      return [...state, ...action.movie];
    case types.UPDATE_MOVIE_SUCCESS:
      return state.map((movie) =>
        movie._id === action.movie._id ? action.movie : movie
      );
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;
    case types.DELETE_MOVIE_OPTIMISTIC:
      return state.filter((movie) => movie._id !== action.movie._id);
    default:
      return state;
  }
}
