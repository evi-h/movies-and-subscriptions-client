import * as types from "../actions/actionsTypes";

const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  let expiry = now.getTime() + ttl * 60 * 1000;
  const item = {
    value,
    expiry,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const logout = (key) => {
  localStorage.removeItem(key);
};

const getUserData = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);

    return user.value;
  }
  return user;
};

export default function usersReducer(state = getUserData(), action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      setWithExpiry("user", action.user, action.user.session);
      return { ...action.user };
    case types.LOGOUT_SUCCESS:
      logout("user");
      return null;
    default:
      return state;
  }
}
