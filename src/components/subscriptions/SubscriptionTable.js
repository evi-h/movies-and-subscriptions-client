import React from "react";

import SubscriptionCard from "./SubscriptionCard";
import { Container, Row } from "react-bootstrap";

const SubscriptionTable = ({
  subscriptions,
  handleSave,
  movies,
  onDelete,
  update,
  deletePermission,
}) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {subscriptions.map((subscription, index) => (
          <SubscriptionCard
            key={index}
            deletePermission={deletePermission}
            update={update}
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
