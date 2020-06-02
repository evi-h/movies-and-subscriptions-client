import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/usersActions";
import { loadSubscriptions } from "../../redux/actions/subscriptionsActions";
import propTypes from "prop-types";
import UsersNav from "./UsersNav";
import AddUser from "./AddUser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Users = ({
  users,
  loadUsers,
  saveUser,
  history,
  authentication,
  ...props
}) => {
  const [user, setUser] = useState({ ...props.user });
  useEffect(() => {
    if (users.length === 0) loadUsers();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveUser(user).then(() => {
      toast.success("User Saved");
      history.push("/users");
    });
  };

  return (
    <>
      {authentication === null && <Redirect to="/login" />}
      <h2>Users</h2>
      <UsersNav />
      <AddUser handleSave={handleSave} onChange={onChange} user={user} />
    </>
  );
};

Users.propTypes = {
  user: propTypes.object.isRequired,
  users: propTypes.array.isRequired,
  loadUsers: propTypes.func.isRequired,
  saveUser: propTypes.func.isRequired,
};

const getUserBySlug = (searchUser, slug) => {
  return searchUser.filter((user) => user._id === slug)[0];
};

const getUserObject = () => {
  return {
    username: "",
    firstName: [],
    lastName: "",
    createdOn: "",
    session: 0,
    permissions: [],
  };
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  const user =
    slug && state.users.length > 0
      ? getUserBySlug(state.users, slug)
      : getUserObject();

  return {
    user,
    users: state.users,
    subscriptions: state.subscriptions,
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loadUsers,
  loadSubscriptions,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
