import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const UsersNav = ({ onChange }) => {
  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };
  return (
    <>
      <Button
        onClick={() => handleRedirect("/users")}
        variant="primary"
        size="lg"
      >
        Users
      </Button>{" "}
      <Button
        onClick={() => handleRedirect("/user")}
        variant="primary"
        size="lg"
      >
        Add New User
      </Button>{" "}
    </>
  );
};

export default UsersNav;
