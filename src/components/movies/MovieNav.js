import React from "react";
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

const MovieNav = ({ movies, moviePage, onChange }) => {
  return (
    <>
      <Button onClick={() => moviePage("movie")} variant="primary" size="lg">
        Movies
      </Button>{" "}
      <Button onClick={() => moviePage("addMovie")} variant="primary" size="lg">
        AddMovie
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
