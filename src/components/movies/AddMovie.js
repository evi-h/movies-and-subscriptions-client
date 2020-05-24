import React from "react";
import { Button } from "react-bootstrap";
import {
  TextField,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

const AddMovie = ({ movie, onChange, handleSave }) => {
  const genres = [
    "Comedy",
    "Drama",
    "Action",
    "horror",
    "Thriller",
    "Romance",
    "Romantic Comedy",
  ];

  function GetFormattedDate(date) {
    var Time = new Date(date);
    var month = Time.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    var day = Time.getDate();
    day = day > 9 ? day : `0${day}`;
    var year = Time.getFullYear();
    return `${year}-${month}-${day}`;
  }
  return (
    <form className="m-3" onSubmit={handleSave}>
      <TextField
        label="Name"
        name="Name"
        value={movie.Name}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <InputLabel id="mutiple-checkbox">Genres</InputLabel>
      <Select
        labelId="mutiple-checkbox"
        id="mutiple-checkbox"
        name="Genres"
        multiple
        value={movie.Genres}
        onChange={onChange}
        input={<Input />}
        renderValue={(selected) => selected.join(", ")}
        className="m-2"
        style={{ width: 250 }}
      >
        {genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            <Checkbox checked={movie.Genres.indexOf(genre) > -1} />
            <ListItemText primary={genre} />
          </MenuItem>
        ))}
      </Select>
      <br />
      <TextField
        label="Image"
        name="Image"
        value={movie.Image}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <TextField
        id="date"
        label="Premiered"
        name="Premiered"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className="m-2"
        onChange={onChange}
        value={GetFormattedDate(movie.Premiered)}
      />
      <br />
      <Button type="submit" className="btn btn-primar m-2" size="lg">
        Save
      </Button>
    </form>
  );
};

export default AddMovie;
