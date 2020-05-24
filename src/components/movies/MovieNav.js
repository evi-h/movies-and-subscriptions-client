import React from "react";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";

const MovieNav = ({ movies, onChange }) => {
  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };
  return (
    <>
      <Button
        onClick={() => handleRedirect("/movies")}
        variant="primary"
        size="lg"
      >
        Movies
      </Button>{" "}
      <Button
        onClick={() => handleRedirect("/movie")}
        variant="primary"
        size="lg"
      >
        Add Movie
      </Button>{" "}
      {movies && (
        <>
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            size="small"
            onChange={onChange}
          />
        </>
      )}
    </>
  );
};

export default MovieNav;
