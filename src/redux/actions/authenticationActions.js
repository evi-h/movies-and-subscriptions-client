import * as types from "./actionsTypes";
import * as usersApi from "../../api/usersApi";

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function logoutSuccess(user) {
  return { type: types.LOGOUT_SUCCESS, user };
}

export function authenticate(user) {
  return function (dispatch, getState) {
    return usersApi
      .login(user)
      .then((userData) => {
        if (userData !== "ERROR") {
          dispatch(loginSuccess(userData));
          return "ok";
        }
        return "error";
      })
      .catch((error) => {
        return "error";
      });
  };
}

export function logout() {
  return function (dispatch) {
    return dispatch(logoutSuccess({ user: "adsfa" }));
  };
}
