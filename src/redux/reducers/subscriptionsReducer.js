import * as types from "../actions/actionsTypes";
export default function subscriptionsReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_SUBSCRIPTION:
      return [...state, ...action.subscription];
    case types.LOAD_SUBSCRIPTIONS_SUCCESS:
      return action.subscriptions;
    default:
      return state;
  }
}
