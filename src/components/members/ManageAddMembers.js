import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMembers,
  saveMember,
  deleteMember,
} from "../../redux/actions/membersActions";
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
  ...props
}) => {
  const [member, setMember] = useState({ ...props.member });
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

      <AddMember handleSave={handleSave} onChange={onChange} member={member} />
    </>
  );
};

Members.propTypes = {
  member: propTypes.object.isRequired,
  members: propTypes.array.isRequired,
  loadMembers: propTypes.func.isRequired,
  saveMember: propTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
