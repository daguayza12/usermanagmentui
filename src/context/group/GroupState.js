import React, { useReducer } from 'react';
import axios from 'axios';
import GroupContext from './groupContext';
import GroupReducer from './groupReducer';
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

const GroupState = (props) => {
  const initialState = {
    groups: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(GroupReducer, initialState);

  // Getgroups
  const getGroups = async () => {
    try {
      console.log('hereee');
      const res = await axios.get('/api/groups');

      dispatch({
        type: GET_GROUPS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GROUP_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Add Group
  const addGroup = async (group) => {
    try {
      const res = await axios.post('/api/groups', group);

      dispatch({
        type: ADD_GROUP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GROUP_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Delete group
  const deleteGroup = async (groupId) => {
    try {
      await axios.delete(`/api/groups/${groupId}`);

      dispatch({
        type: DELETE_GROUP,
        payload: groupId,
      });
    } catch (err) {
      dispatch({
        type: GROUP_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Update group
  const updateGroup = async (groupId) => {
    try {
      const res = await axios.get(`/api/groups/${groupId}`);
      dispatch({
        type: UPDATE_STATE,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GROUP_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Clear groups
  const clearGroups = () => {
    dispatch({ type: CLEAR_GROUPS });
  };

  // Set Current Group
  const setCurrent = (group) => {
    dispatch({ type: SET_CURRENT, payload: group });
  };

  // Clear Current Group
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Groups
  const filterGroups = (text) => {
    dispatch({ type: FILTER_GROUPS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <GroupContext.Provider
      value={{
        groups: state.groups,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addGroup,
        deleteGroup,
        setCurrent,
        clearCurrent,
        updateGroup,
        filterGroups,
        clearFilter,
        getGroups,
        clearGroups,
        clearErrors,
      }}
    >
      {props.children}
    </GroupContext.Provider>
  );
};

export default GroupState;
