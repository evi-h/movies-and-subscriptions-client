import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as moviesActions from "../../redux/actions/moviesActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";

const Movies = ({ movies, loadMovies }) => {
  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      {console.log(movies)}
      <h2>Movies</h2>
      {movies.map((movie, index) => (
        <h3 key={index}>{movie.Name}</h3>
      ))}
    </div>
  );
};

Movies.propTypes = {
  movies: propTypes.array.isRequired,
  loadMovies: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

const mapDispatchToProps = {
  loadMovies: moviesActions.loadMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
