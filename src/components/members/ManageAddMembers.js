import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMembers,
  saveMember,
  deleteMember,
} from "../../redux/actions/membersActions";
import { hasPermission } from "../../redux/actions/authenticationActions";

import { loadSubscriptions } from "../../redux/actions/subscriptionsActions";
import propTypes from "prop-types";
import AddMember from "./AddMember";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

const Members = ({
  members,
  loadMembers,
  saveMember,
  history,
  authentication,
  hasPermission,
  ...props
}) => {
  const [member, setMember] = useState({ ...props.member });

  const [createPermission, setCreatePermission] = useState(
    hasPermission(authentication, "Create Subscriptions")
  );

  useEffect(() => {
    if (members.length === 0) loadMembers();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveMember(member).then(() => {
      toast.success("Member Saved");
      history.push("/subscriptions");
    });
  };

  return (
    <>
      {authentication === null && <Redirect to="/login" />}

      {createPermission ? (
        <AddMember
          handleSave={handleSave}
          onChange={onChange}
          member={member}
        />
      ) : (
        <h1>Unauthorized To Create Subscriptions</h1>
      )}
    </>
  );
};

Members.propTypes = {
  member: propTypes.object.isRequired,
  members: propTypes.array.isRequired,
  loadMembers: propTypes.func.isRequired,
  saveMember: propTypes.func.isRequired,
  hasPermission: propTypes.func.isRequired,
};

const getMemberBySlug = (searchMember, slug) => {
  return searchMember.filter((member) => member._id === slug)[0];
};

const getMemberObject = () => {
  return {
    Name: "",
    Email: "",
    City: "",
  };
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  const member =
    slug && state.members.length > 0
      ? getMemberBySlug(state.members, slug)
      : getMemberObject();

  return {
    member,
    members: state.members,
    subscriptions: state.subscriptions,
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loadMembers,
  loadSubscriptions,
  saveMember,
  deleteMember,
  hasPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
