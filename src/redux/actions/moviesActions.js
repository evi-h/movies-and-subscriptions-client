import * as types from "./actionsTypes";
import * as moviesApi from "../../api/moviesApi";

export function createMovie(movie) {
  return { type: types.CREATE_MOVIE, movie };
}

export function loadMoviesSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}

export function loadMovies() {
  return function (dispatch) {
    return moviesApi
      .getAllMovies()
      .then((movies) => {
        dispatch(loadMoviesSuccess(movies));
      })
      .catch((error) => {
        throw error;
      });
  };
}
