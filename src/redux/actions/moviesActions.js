import * as types from "./actionsTypes";
import * as moviesApi from "../../api/moviesApi";

export function loadMoviesSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}

export function updateMovieSuccess(movie) {
  return { type: types.UPDATE_MOVIE_SUCCESS, movie };
}

export function createMovieSuccess(movie) {
  return { type: types.CREATE_MOVIE_SUCCESS, movie };
}
export function deleteMovieOptimistic(movie) {
  return { type: types.DELETE_MOVIE_OPTIMISTIC, movie };
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

export function saveMovie(movie) {
  return function (dispatch, getState) {
    return moviesApi
      .saveMovie(movie)
      .then((savedMovie) => {
        movie._id
          ? dispatch(updateMovieSuccess(savedMovie))
          : dispatch(createMovieSuccess(savedMovie));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteMovie(movie) {
  return function (dispatch) {
    dispatch(deleteMovieOptimistic(movie));
    return moviesApi.deleteMovie(movie._id);
  };
}
