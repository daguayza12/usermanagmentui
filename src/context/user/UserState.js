import React, { useReducer } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
  GET_USER,
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_USER_TO_GROUP,
  FILTER_USER,
  CLEAR_USERS,
  CLEAR_FILTER,
  USER_ERROR,
  SET_ALERT,
} from '../types';

const UserState = (props) => {
  const initialState = {
    userss: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');

      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.message,
      });
    }
  };

  // Add USER
  const addUser = async (user) => {
    try {
      const res = await axios.post('/api/users', user);

      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.message,
      });
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);

      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.message,
      });
    }
  };

  // Update group
  const addUserToGroup = async (user) => {
    try {
      const res = await axios.put(`/api/users/${user.userId}`, user);
      dispatch({
        type: ADD_USER_TO_GROUP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.message,
      });
    }
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Set Current User
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  // Clear Current User
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Users
  const filterUsers = (text) => {
    dispatch({ type: FILTER_USER, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <UserContext.Provider
      value={{
        userss: state.userss,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        addUserToGroup,
        filterUsers,
        clearFilter,
        getUsers,
        clearUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
