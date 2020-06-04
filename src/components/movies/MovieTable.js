import React from "react";

import MovieCard from "./MovieCard";
import { Container, Row } from "react-bootstrap";

const MovieTable = ({
  movies,
  subscriptions,
  filter,
  onDelete,
  update,
  deletePermission,
}) => {
  return (
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
              onDelete={onDelete}
              update={update}
              deletePermission={deletePermission}
              subscriptions={subscriptions.filter((sub) => {
                return sub.Movies.find((m) => {
                  return m._id === movie._id;
                });
              })}
            />
          ))}
      </Row>
    </Container>
  );
};

export default MovieTable;
