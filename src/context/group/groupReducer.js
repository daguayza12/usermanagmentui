import {
  GET_GROUPS,
  ADD_GROUP,
  DELETE_GROUP,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STATE,
  FILTER_GROUPS,
  CLEAR_GROUPS,
  CLEAR_FILTER,
  GROUP_ERROR,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        updated: true,
        loading: false,
      };
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };
    case UPDATE_STATE:
      console.log('Update state');

      return {
        ...state,
        updated: true,
        //groups: state.groups.map((group) =>
        // group.groupId === action.payload.groupId ? action.payload : group
        //),
      };
    case CLEAR_GROUPS:
      console.log('Update state');
      return {
        ...state,
        groups: null,
        filtered: null,
        error: null,
        current: null,
        updated: null,
      };

    case DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(
          (group) => group.groupId !== action.payload
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      console.log('clear current');
      return {
        ...state,
        current: null,
        updated: null,
      };
    case FILTER_GROUPS:
      return {
        ...state,
        filtered: state.groups.filter((group) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return group.groupName.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  }
};
