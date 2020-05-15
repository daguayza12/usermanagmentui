import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('firstName', action.payload.firstName);
      localStorage.setItem('lastName', action.payload.lastName);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('userRole', action.payload.userRole);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');

      return {
        ...state,
        token: false,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
  }
};
