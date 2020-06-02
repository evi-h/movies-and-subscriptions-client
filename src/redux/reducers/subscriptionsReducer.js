import * as types from "../actions/actionsTypes";
export default function subscriptionsReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_SUBSCRIPTION_SUCCESS:
      return [...state, ...action.subscription];
    case types.UPDATE_SUBSCRIPTION_SUCCESS:
      return state.map((subscription) => {
        console.log(action.subscription);
        return subscription._id === action.subscription._id
          ? action.subscription
          : subscription;
      });
    case types.LOAD_SUBSCRIPTIONS_SUCCESS:
      return action.subscriptions;
    case types.DELETE_SUBSCRIPTION_OPTIMISTIC:
      return state.filter(
        (subscription) => subscription._id !== action.subscription._id
      );
    default:
      return state;
  }
}
