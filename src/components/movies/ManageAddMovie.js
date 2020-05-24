import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMovies,
  saveMovie,
  deleteMovie,
} from "../../redux/actions/moviesActions";
import { loadSubscriptions } from "../../redux/actions/subscriptionsActions";
import propTypes from "prop-types";
import MovieNav from "./MovieNav";
import AddMovie from "./AddMovie";
import { toast } from "react-toastify";

const Movies = ({ movies, loadMovies, saveMovie, history, ...props }) => {
  const [movie, setMovie] = useState({ ...props.movie });
  useEffect(() => {
    if (movies.length === 0) loadMovies();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
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
      <h2>Movies</h2>
      <MovieNav movies={false} />
      <AddMovie handleSave={handleSave} onChange={onChange} movie={movie} />
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
  };
}

const mapDispatchToProps = {
  loadMovies,
  loadSubscriptions,
  saveMovie,
  deleteMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
