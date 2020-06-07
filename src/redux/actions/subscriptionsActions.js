import * as types from "./actionsTypes";
import * as subscriptionsApi from "../../api/subscriptionsApi";

export function createSubscriptionSuccess(subscription) {
  return { type: types.CREATE_SUBSCRIPTION_SUCCESS, subscription };
}

export function updateSubscriptionSuccess(subscription) {
  return { type: types.UPDATE_SUBSCRIPTION_SUCCESS, subscription };
}

export function loadSubscriptionsSuccess(subscriptions) {
  return { type: types.LOAD_SUBSCRIPTIONS_SUCCESS, subscriptions };
}

export function deleteSubscriptionOptimistic(subscription) {
  return { type: types.DELETE_SUBSCRIPTION_OPTIMISTIC, subscription };
}

export function loadSubscriptions() {
  return function (dispatch) {
    return subscriptionsApi
      .getAllSubscriptions()
      .then((subscriptions) => {
        dispatch(loadSubscriptionsSuccess(subscriptions));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveSubscription(subscription) {
  return function (dispatch, getState) {
    return subscriptionsApi
      .saveSubscription(subscription)
      .then((savedSubscription) => {
        savedSubscription.MemberId
          ? dispatch(updateSubscriptionSuccess(savedSubscription))
          : dispatch(createSubscriptionSuccess(savedSubscription));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addSubscription(movie, id) {
  return function (dispatch, getState) {
    return subscriptionsApi
      .addSubscription(movie, id)
      .then(() => {
        dispatch(updateSubscriptionSuccess(movie, id));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteSubscription(subscription) {
  return function (dispatch) {
    dispatch(deleteSubscriptionOptimistic(subscription));
    return subscriptionsApi.deleteSubscription(subscription._id);
  };
}
