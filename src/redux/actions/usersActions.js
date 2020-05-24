import * as types from "./actionsTypes";
import * as usersApi from "../../api/usersApi";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}
export function deleteUserOptimistic(user) {
  return { type: types.DELETE_USER_OPTIMISTIC, user };
}

export function loadUsers() {
  return function (dispatch) {
    return usersApi
      .getAllUsers()
      .then((users) => {
        dispatch(loadUsersSuccess(users));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveUser(user) {
  return function (dispatch, getState) {
    return usersApi
      .saveUser(user)
      .then((savedUser) => {
        user._id
          ? dispatch(updateUserSuccess(savedUser))
          : dispatch(createUserSuccess(savedUser));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteUser(user) {
  return function (dispatch) {
    dispatch(deleteUserOptimistic(user));
    return usersApi.deleteUser(user._id);
  };
}
