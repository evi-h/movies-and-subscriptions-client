import * as types from "../actions/actionsTypes";
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [...state, ...action.user];
    case types.UPDATE_USER_SUCCESS:
      return state.map((user) =>
        user._id === action.user._id ? action.user : user
      );
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    case types.DELETE_USER_OPTIMISTIC:
      return state.filter((user) => user._id !== action.user._id);
    default:
      return state;
  }
}
