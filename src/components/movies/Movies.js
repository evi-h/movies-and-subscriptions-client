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
import MovieTable from "./MovieTable";
import { toast } from "react-toastify";

const Movies = ({
  movies,
  subscriptions,
  loadMovies,
  loadSubscriptions,
  deleteMovie,
}) => {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadMovies();
    loadSubscriptions();
  }, [movies]);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (movie) => {
    toast.success("Movie Deleted");
    setFilter("");
    deleteMovie(movie);
  };

  return (
    <>
      <h2>Movies</h2>
      <MovieNav onChange={handleSearch} movies={true} />

      <MovieTable
        movies={movies}
        subscriptions={subscriptions}
        filter={filter}
        onDelete={handleDelete}
      />
    </>
  );
};

Movies.propTypes = {
  movie: propTypes.object.isRequired,
  movies: propTypes.array.isRequired,
  subscriptions: propTypes.array.isRequired,
  loadMovies: propTypes.func.isRequired,
  saveMovie: propTypes.func.isRequired,
  deleteMovie: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    movie: {},
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
