import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SubscriptionNav = ({ subscriptions, onChange }) => {
  const history = useHistory();

  const handleRedirect = (route) => {
    history.push(route);
  };
  return (
    <>
      <Button
        onClick={() => handleRedirect("/subscriptions")}
        variant="primary"
        size="lg"
      >
        Subscriptions
      </Button>{" "}
      <Button
        onClick={() => handleRedirect("/member")}
        variant="primary"
        size="lg"
      >
        Add Subscription
      </Button>{" "}
    </>
  );
};

export default SubscriptionNav;
