import {
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_USER_TO_GROUP,
  FILTER_USER,
  CLEAR_FILTER,
  GET_USER,
  CLEAR_USERS,
  USER_ERROR,
  CLEAR_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case GET_USER:
      return {
        ...state,
        userss: action.payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        userss: [...state.userss, action.payload],
      };
    case ADD_USER_TO_GROUP:
      return {
        ...state,
        userss: state.users.map((user) =>
          user.userId === action.payload.userId ? action.payload : user
        ),
      };
    case CLEAR_USERS:
      return {
        ...state,
        userss: null,
        filtered: null,
        error: null,
        current: null,
      };

    case DELETE_USER:
      return {
        ...state,
        userss: state.userss.filter((user) => user.userId !== action.payload),
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
        filtered: state.userss.filter((user) => {
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
    case USER_ERROR:
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
