import React, { useEffect } from "react";
import { connect } from "react-redux";

import UsersNav from "./UsersNav";
import { loadUsers, deleteUser } from "../../redux/actions/usersActions";
import propTypes from "prop-types";
import UsersTable from "./UsersTable";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Users = ({ users, loadUsers, deleteUser, authentication }) => {
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = (user) => {
    toast.success("User Deleted");
    deleteUser(user);
  };

  return (
    <>
      {authentication === null && <Redirect to="/login" />}

      <h2>Users</h2>
      <UsersNav />
      <UsersTable users={users} onDelete={handleDelete} />
    </>
  );
};

Users.propTypes = {
  loadUsers: propTypes.func.isRequired,
  deleteUser: propTypes.func.isRequired,
};
function mapStateToProps(state) {
  return {
    user: {},
    users: state.users,
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loadUsers,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
