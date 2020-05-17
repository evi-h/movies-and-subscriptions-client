import * as types from "./actionsTypes";
import * as subscriptionsApi from "../../api/subscriptionsApi";

export function createSubscription(subscription) {
  return { type: types.CREATE_SUBSCRIPTION, subscription };
}

export function loadSubscriptionsSuccess(subscriptions) {
  return { type: types.LOAD_SUBSCRIPTIONS_SUCCESS, subscriptions };
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
