import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SubscriptionCard = ({ id, subscribe, movies, ...props }) => {
  const [subscription, setSubscription] = useState({ ...props.subscription });

  const [movie, setMovie] = useState({ MovieId: "", Date: "" });

  useEffect(() => {
    if (movie.MovieId !== "") subscribe(subscription);
  }, [subscription.Movies]);

  const onSubscribe = () => {
    setSubscription((prevSub) => ({
      ...prevSub,
      ["Movies"]: [...prevSub["Movies"], movie],
    }));
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setMovie((prevSub) => ({
      ...prevSub,
      [name]: value,
    }));
  };

  const onChangeMovies = (event) => {
    const { name, value } = event.target;
    setSubscription((prevSub) => ({
      ...prevSub,
      [name]: [...prevSub[name], value],
    }));

    console.log(subscription);
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        Subscribe To A New Movie
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form>
          <Select
            id="demo-simple-select-outlined"
            onChange={onChange}
            label="Movie"
            name="MovieId"
            style={{ width: 200 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {movies.map((movie) => (
              <MenuItem value={movie._id}>{movie.Name}</MenuItem>
            ))}
          </Select>
          <br />
          <TextField
            id="date"
            label="Date"
            name="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            className="m-2"
            onChange={onChange}
          />
          <br />
          <Button onClick={() => onSubscribe()} variant="primary">
            Subscribe
          </Button>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const getSubscriptionById = (subscriptions, id) => {
  return subscriptions.filter((sub) => sub._id === id)[0];
};

const getSubscriptionObject = (id) => {
  return {
    Movies: [],
    MemberId: id,
  };
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.id;

  const subscription =
    id && state.subscriptions.length > 0
      ? getSubscriptionById(state.subscriptions, id)
      : getSubscriptionObject(id);

  return {
    subscription,
    subscriptions: state.subscriptions,
  };
}

export default connect(mapStateToProps)(SubscriptionCard);
