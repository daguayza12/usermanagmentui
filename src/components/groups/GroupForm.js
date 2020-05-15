import React, { useState, useContext, useEffect } from 'react';
import GroupContext from '../../context/group/groupContext';
import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/user/userContext';
import { GET_GROUPS } from '../../context/types';

const GroupForm = () => {
  const groupContext = useContext(GroupContext);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { userss, filtered, getUsers, loading, addUser } = userContext;

  const {
    current,
    clearCurrent,
    clearGroups,
    error,
    addGroup,
    updateGroup,
    getGroups,
  } = groupContext;
  const { setAlert } = alertContext;
  const [userList, setUsers] = useState([
    {
      firstName: '',
      lastName: '',
      userId: 0,
      groupId: 0,
      userRole: '',
      email: '',
      groupName: '',
    },
  ]);
  const [value, setValue] = useState();

  const addUserToGroup = () => {
    for (var user of userList) {
      if (user.userId === parseInt(value)) {
        user.groupId = groupId;
        addUser(user);
        window.location.reload(false);
        break;
      }
    }
  };
  useEffect(() => {
    if (userss !== null && userss.length) {
      setUsers(
        userss.map(
          ({ firstName, lastName, email, userId, groupName, userRole }) => ({
            firstName: firstName,
            lastName: lastName,
            email: email,
            groupName: groupName,
            userRole: userRole,
            userId: userId,
            groupId: groupId,
          })
        )
      );
    } else {
      getUsers();
    }
    //
    if (current !== null) {
      setGroup(current);
      userList.unshift({});
    } else if (error === 'Group already exists.') {
      setAlert(error, 'danger');
      clearGroups();
    } else {
      setGroup({
        groupName: '',
        users: [],
        groupId: 0,
      });
    }
  }, [groupContext, current, userContext, userss]);
  const [group, setGroup] = useState({
    groupName: '',
    groupId: 0,
    users: [],
  });
  const { groupName, users, groupId } = group;

  const onChange = (e) =>
    setGroup({ ...group, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const userRole = localStorage.userRole;
    if (userRole !== 'admin') {
      setAlert('Only admin user can add groups', 'danger');
    } else {
      if (current === null) {
        if (groupName.length === 0) {
          setAlert('Must enter a group name', 'danger');
        } else {
          addGroup(group);
        }
      } else {
        addUserToGroup();
      }
      clearCurrent();
    }
    setGroup({
      groupName: '',
      users: [],
      groupId: 0,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      {!current && (
        <div>
          <h2 className='text-primary'>Add Group</h2>
          <input
            type='text'
            placeholder='GroupName'
            name='groupName'
            value={groupName}
            onChange={onChange}
          />
          <div>
            <input
              type='submit'
              value='Add Group'
              className='btn btn-primary btn-block'
            />
          </div>
        </div>
      )}

      {current && userss && (
        <div>
          <h2 className='text-primary'>Add User to Group</h2>
          <input
            type='text'
            disabled={true}
            type='text'
            placeholder='GroupName'
            name='groupName'
            value={groupName.charAt(0).toUpperCase() + groupName.slice(1)}
          />
          <div>
            <select
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            >
              {userList.map(({ userId, firstName, lastName }) => (
                <option key={userId} value={userId}>
                  {firstName + lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type='submit'
              value='Add User to Group'
              className='btn btn-primary btn-block'
            />
          </div>
        </div>
      )}
    </form>
  );
};
export default GroupForm;
