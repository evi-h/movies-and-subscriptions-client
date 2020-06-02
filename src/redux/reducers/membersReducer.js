import * as types from "../actions/actionsTypes";
export default function membersReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_MEMBER_SUCCESS:
      return [...state, ...action.member];
    case types.UPDATE_MEMBER_SUCCESS:
      return state.map((member) =>
        member._id === action.member._id ? action.member : member
      );
    case types.LOAD_MEMBERS_SUCCESS:
      return action.members;
    case types.DELETE_MEMBER_OPTIMISTIC:
      return state.filter((member) => member._id !== action.member._id);
    default:
      return state;
  }
}
