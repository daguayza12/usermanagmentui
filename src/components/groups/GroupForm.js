import React, { useState, useContext, useEffect } from 'react';
import GroupContext from '../../context/group/groupContext';
import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/user/userContext';

const GroupForm = () => {
  const groupContext = useContext(GroupContext);
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const { userss, getUsers, updateUser, clearUsers } = userContext;
  const {
    current,
    clearCurrent,
    error,
    addGroup,
    clearErrors,
    updateGroup,
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
        console.log(user);
        updateUser(user);
        break;
      }
    }
  };
  useEffect(() => {
    if (userss !== null && userss.length > 0) {
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
      clearErrors();
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
      setAlert('Only admin user can make group changes', 'danger');
      clearErrors();
    } else {
      if (current === null) {
        if (groupName.length === 0) {
          setAlert('Must enter a group name', 'danger');
        } else {
          addGroup(group);
          if (error) {
            setAlert(error, 'danger');
            clearErrors();
          }
        }
      } else {
        addUserToGroup();
        updateGroup();
      }
    }
    clearUsers();
    //  clearGroups();
    clearCurrent();
    setUsers([]);
    setValue({ value: '' });
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
            placeholder='GroupName'
            name='groupName'
            value={groupName.charAt(0).toUpperCase() + groupName.slice(1)}
          />
          <div>
            <label>List of Users</label>
            <select
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            >
              <option value=''>Select option</option>
              {userList.map(({ userId, firstName, lastName }) => (
                <option key={userId} value={userId}>
                  {firstName.charAt(0).toUpperCase() +
                    firstName.slice(1) +
                    '  ' +
                    lastName.charAt(0).toUpperCase() +
                    lastName.slice(1)}
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
