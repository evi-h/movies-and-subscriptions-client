import React from "react";
import { Card, Button } from "react-bootstrap";

import { useHistory } from "react-router-dom";

const UserCard = ({ user, onDelete }) => {
  const history = useHistory();

  const formatDate = (date) => {
    let dateFormat = new Date(date);
    return `${dateFormat.getDate()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`;
  };

  const handleRedirect = (id) => {
    history.push(`/user/${id}`);
  };
  return (
    <>
      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Name: {`${user.firstName} ${user.lastName}`}</Card.Title>
          <Card.Title>Username: {user.username}</Card.Title>
          <Card.Title>Session Time Out (Minutes): {user.session}</Card.Title>
          <Card.Title>Created On: {formatDate(user.createdOn)}</Card.Title>
          {user.permissions && (
            <Card.Text>Permissions: {user.permissions.toString()}</Card.Text>
          )}
          <Button onClick={() => handleRedirect(user._id)} variant="primary">
            Edit
          </Button>{" "}
          <Button variant="primary" onClick={() => onDelete(user)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserCard;
