import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { ListItemIcon, List, ListItem, ListItemText } from "@material-ui/core";
import { Movie } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import AddMovie from "./SubscriptionAddMovie";

const SubscriptionCard = ({
  subscription,
  handleSave,
  movies,
  onDelete,
  update,
  deletePermission,
}) => {
  const history = useHistory();

  const handleRedirect = (id) => {
    history.push(`/member/${id}`);
  };

  const findMovieName = (id) => {
    let movie = movies.filter((movie) => movie._id == id)[0];
    let name = movie ? movie.Name : "";
    return name;
  };
  return (
    <>
      <Card className="m-3" style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title>{subscription.Name}</Card.Title>
          <Card.Title>{subscription.Email}</Card.Title>
          <Card.Title>{subscription.City}</Card.Title>
          <Card.Title>Movies Watched:</Card.Title>
          <AddMovie
            id={subscription._id}
            movies={movies}
            subscribe={handleSave}
          />
          {subscription.Movies && subscription.Movies.length > 0 && (
            <>
              <List
                className="m-3"
                dense
                style={{ backgroundColor: "#e3e3e3" }}
              >
                {subscription.Movies.map(({ MovieId, Date }, index) => (
                  <ListItem button key={index}>
                    <ListItemIcon>
                      <Movie />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${findMovieName(MovieId)} ${Date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {update && (
            <>
              <Button
                onClick={() => handleRedirect(subscription._id)}
                variant="primary"
              >
                Edit
              </Button>{" "}
            </>
          )}

          {deletePermission && (
            <Button variant="primary" onClick={() => onDelete(subscription)}>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions,
  };
}

export default connect(mapStateToProps)(SubscriptionCard);
