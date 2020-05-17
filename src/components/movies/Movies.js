import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as moviesActions from "../../redux/actions/moviesActions";
import { loadSubscriptions } from "../../redux/actions/subscriptionsActions";
import propTypes from "prop-types";
import MovieNav from "./MovieNav";
import MovieCard from "./MovieCard";
import { Container, Row } from "react-bootstrap";

const Movies = ({ movies, subscriptions, loadMovies, loadSubscriptions }) => {
  const [isMovie, setIsMovie] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    loadMovies();
    loadSubscriptions();
  }, []);

  const moviePage = (page) => {
    setIsMovie(page === "movie");
  };

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Movies</h2>
      <MovieNav
        onChange={handleSearch}
        moviePage={moviePage}
        movies={isMovie}
      />
      <Container>
        <Row className="justify-content-md-center">
          {movies
            .filter((movie) => {
              if (filter.length > 0) {
                return movie.Name.toLowerCase().match(filter);
              } else {
                return true;
              }
            })
            .map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                subscriptions={subscriptions.filter((sub) => {
                  return sub.Movies.find((m) => {
                    return m._id === movie._id;
                  });
                })}
              />
            ))}
        </Row>
      </Container>
    </div>
  );
};

Movies.propTypes = {
  movies: propTypes.array.isRequired,
  subscriptions: propTypes.array.isRequired,
  loadMovies: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    movies: state.movies,
    subscriptions: state.subscriptions,
  };
}

const mapDispatchToProps = {
  loadMovies: moviesActions.loadMovies,
  loadSubscriptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
