import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GroupContext from '../../context/group/groupContext';
import AlertContext from '../../context/alert/alertContext';
import GroupUsers from './GroupUsers';

export const GroupItems = ({ group }) => {
  const groupContext = useContext(GroupContext);
  const alertContext = useContext(AlertContext);
  const { deleteGroup, setCurrent, clearCurrent } = groupContext;
  const { setAlert } = alertContext;
  const { groupId, groupName, users } = group;

  const onDelete = () => {
    const userRole = localStorage.userRole;
    if (userRole !== 'admin') {
      setAlert('Only admin user can delete groups', 'danger');
    } else {
      deleteGroup(groupId);
      clearCurrent();
    }
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
      </h3>

      <div style={userStyle}>
        {users.map((user) => (
          <GroupUsers key={user.userId} user={user} />
        ))}
      </div>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(group)}
        >
          Add User to Group
        </button>

        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridgGap: '1rem',
};
GroupItems.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItems;
