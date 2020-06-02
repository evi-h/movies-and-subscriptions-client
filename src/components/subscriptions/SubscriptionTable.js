import React from "react";

import SubscriptionCard from "./SubscriptionCard";
import { Container, Row } from "react-bootstrap";

const SubscriptionTable = ({ subscriptions, handleSave, movies, onDelete }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {subscriptions.map((subscription, index) => (
          <SubscriptionCard
            key={index}
            subscription={subscription}
            movies={movies}
            onDelete={onDelete}
            handleSave={handleSave}
          />
        ))}
      </Row>
    </Container>
  );
};

export default SubscriptionTable;
