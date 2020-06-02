import * as types from "./actionsTypes";
import * as membersApi from "../../api/membersApi";

export function loadMembersSuccess(members) {
  return { type: types.LOAD_MEMBERS_SUCCESS, members };
}

export function updateMemberSuccess(member) {
  return { type: types.UPDATE_MEMBER_SUCCESS, member };
}

export function createMemberSuccess(member) {
  return { type: types.CREATE_MEMBER_SUCCESS, member };
}
export function deleteMemberOptimistic(member) {
  return { type: types.DELETE_MEMBER_OPTIMISTIC, member };
}

export function loadMembers() {
  return function (dispatch) {
    return membersApi
      .getAllMembers()
      .then((members) => {
        dispatch(loadMembersSuccess(members));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveMember(member) {
  return function (dispatch, getState) {
    return membersApi
      .saveMember(member)
      .then((savedMember) => {
        member._id
          ? dispatch(updateMemberSuccess(savedMember))
          : dispatch(createMemberSuccess(savedMember));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteMember(member) {
  return function (dispatch) {
    dispatch(deleteMemberOptimistic(member));
    return membersApi.deleteMember(member._id);
  };
}
