import {
  ADD_USER,
  SET_ALERT,
  DELETE_USER,
  UPATE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_USER_TO_GROUP,
  FILTER_USER,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case ADD_USER_TO_GROUP:
      return {
        ...state,
        users: state.users.map((user) =>
          user.userId === action.payload.userId ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.userId != action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_USER:
      return {
        ...state,
        filtered: state.users.filter((user) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            user.firstName.match(regex) ||
            user.lastName.match(regex) ||
            user.email.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
  }
};
