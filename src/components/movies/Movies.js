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
import MovieTable from "./MovieTable";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Movies = ({
  movies,
  subscriptions,
  loadMovies,
  loadSubscriptions,
  deleteMovie,
  authentication,
  hasPermission,
}) => {
  const [filter, setFilter] = useState("");
  const [moviesPermission] = useState(
    hasPermission(authentication, "View Movies")
  );
  const [deletePermission] = useState(
    hasPermission(authentication, "Delete Movies")
  );
  const [updatePermission] = useState(
    hasPermission(authentication, "Update Movies")
  );

  useEffect(() => {
    if (movies.length === 0 && moviesPermission) loadMovies();

    if (movies.length === 0) loadSubscriptions();
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
      {authentication === null && <Redirect to="/login" />}
      <h2>Movies</h2>
      <MovieNav onChange={handleSearch} movies={moviesPermission} />

      {moviesPermission ? (
        <MovieTable
          movies={movies}
          deletePermission={deletePermission}
          update={updatePermission}
          subscriptions={subscriptions}
          filter={filter}
          onDelete={handleDelete}
        />
      ) : (
        <h1>Unauthorized To View Movies</h1>
      )}
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
  authentication: propTypes.object,
  hasPermission: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    movie: {},
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
