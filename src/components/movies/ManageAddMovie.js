import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMovies,
  saveMovie,
  deleteMovie,
} from "../../redux/actions/moviesActions";
import { hasPermission } from "../../redux/actions/authenticationActions";

import { loadSubscriptions } from "../../redux/actions/subscriptionsActions";
import propTypes from "prop-types";
import MovieNav from "./MovieNav";
import AddMovie from "./AddMovie";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Movies = ({
  movies,
  loadMovies,
  saveMovie,
  history,
  authentication,
  hasPermission,
  ...props
}) => {
  const [movie, setMovie] = useState({ ...props.movie });
  const [createPermission, setCreatePermission] = useState(
    hasPermission(authentication, "Create Movies")
  );
  useEffect(() => {
    if (movies.length === 0) loadMovies();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveMovie(movie).then(() => {
      toast.success("Movie Saved");
      history.push("/movies");
    });
  };

  return (
    <>
      {authentication === null && <Redirect to="/login" />}

      <h2>Movies</h2>
      <MovieNav movies={false} />
      {createPermission ? (
        <AddMovie handleSave={handleSave} onChange={onChange} movie={movie} />
      ) : (
        <h1>Unauthorized To Create Movies</h1>
      )}
    </>
  );
};

Movies.propTypes = {
  movie: propTypes.object.isRequired,
  movies: propTypes.array.isRequired,
  loadMovies: propTypes.func.isRequired,
  saveMovie: propTypes.func.isRequired,
};

const getMovieBySlug = (searchMovie, slug) => {
  return searchMovie.filter((movie) => movie._id === slug)[0];
};

const getMovieObject = () => {
  return {
    Name: "",
    Genres: [],
    Image: "",
    Premiered: "",
  };
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  const movie =
    slug && state.movies.length > 0
      ? getMovieBySlug(state.movies, slug)
      : getMovieObject();

  return {
    movie,
    movies: state.movies,
    subscriptions: state.subscriptions,
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loadMovies,
  loadSubscriptions,
  saveMovie,
  deleteMovie,
  hasPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
