import React from "react";

import UserCard from "./UserCard";
import { Container, Row } from "react-bootstrap";

const UserTable = ({ users, onDelete }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {users.map((user, index) => (
          <UserCard key={index} user={user} onDelete={onDelete} />
        ))}
      </Row>
    </Container>
  );
};

export default UserTable;
