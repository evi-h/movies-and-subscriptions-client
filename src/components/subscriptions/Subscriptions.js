import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadSubscriptions,
  saveSubscription,
  deleteSubscription,
} from "../../redux/actions/subscriptionsActions";
import { hasPermission } from "../../redux/actions/authenticationActions";

import { loadMovies } from "../../redux/actions/moviesActions";
import propTypes from "prop-types";
import SubscriptionNav from "./SubscriptionNav";
import SubscriptionTable from "./SubscriptionTable";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Subscriptions = ({
  subscriptions,
  loadSubscriptions,
  loadMovies,
  movies,
  saveSubscription,
  deleteSubscription,
  authentication,
  hasPermission,
}) => {
  useEffect(() => {
    loadSubscriptions();
  }, []);

  const [subscriptionPermission] = useState(
    hasPermission(authentication, "View Subscriptions")
  );

  const [deletePermission] = useState(
    hasPermission(authentication, "Delete Subscriptions")
  );
  const [updatePermission] = useState(
    hasPermission(authentication, "Update Subscriptions")
  );

  useEffect(() => {
    if (subscriptions.length === 0 && subscriptionPermission) {
      loadSubscriptions();
    }
    if (movies.length === 0) loadMovies();
  }, [subscriptions]);

  const handleDelete = (subscription) => {
    toast.success("Subscription Deleted");
    deleteSubscription(subscription);
  };

  const handleSave = (subscription) => {
    saveSubscription(subscription).then(() => {
      toast.success("Subscription Saved");
      loadSubscriptions();
    });
  };

  return (
    <>
      {authentication === null && <Redirect to="/login" />}

      <h2>Subscriptions</h2>
      <SubscriptionNav subscriptions={true} />

      {subscriptionPermission ? (
        <SubscriptionTable
          subscriptions={subscriptions}
          deletePermission={deletePermission}
          update={updatePermission}
          handleSave={handleSave}
          movies={movies}
          onDelete={handleDelete}
        />
      ) : (
        <h1>Unauthorized To View Subscriptions</h1>
      )}
    </>
  );
};

Subscriptions.propTypes = {
  movies: propTypes.array.isRequired,
  subscriptions: propTypes.array.isRequired,
  loadSubscriptions: propTypes.func.isRequired,
  loadMovies: propTypes.func.isRequired,
  saveSubscription: propTypes.func.isRequired,
  deleteSubscription: propTypes.func.isRequired,
  hasPermission: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions,
    movies: state.movies,
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loadSubscriptions,
  loadMovies,
  saveSubscription,
  deleteSubscription,
  hasPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
