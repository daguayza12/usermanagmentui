import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import {
  ADD_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_USER,
  ADD_USER_TO_GROUP,
  FILTER_USER,
  CLEAR_FILTER,
} from '../types';
import userContext from './userContext';

const UserState = (props) => {
  const intialState = {
    users: [
      {
        userId: 1,
        firstName: 'Diana',
        lastName: 'Aguayza',
        email: 'daguayza@gmail.com',
        userRole: 'admin',
        groupName: 'group 2',
        groupId: 2,
      },
      {
        userId: 2,
        firstName: 'aRYA',
        lastName: 'Aguayza',
        email: 'arya@gmail.com',
        userRole: 'user',
        groupName: null,
        groupId: 0,
      },
    ],
    current: null,
    filtered: null,
  };
  const [state, dispatch] = useReducer(UserReducer, intialState);
  //Add User
  const addUser = (user) => {
    user.userId = 23;
    dispatch({ type: ADD_USER, payload: user });
  };
  //Delete User
  const deleteUser = (userId) => {
    dispatch({ type: DELETE_USER, payload: userId });
  };

  //Update User
  const addUserToGroup = (user) => {
    dispatch({ type: ADD_USER_TO_GROUP, payload: user });
  };
  //Set Current User
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  //Clear Current User
  const clearCurrent = (user) => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter User
  const filterUsers = (text) => {
    dispatch({ type: FILTER_USER, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        filtered: state.filtered,
        addUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        addUserToGroup,
        filterUsers,
        clearFilter,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
