import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/user/userContext';
export const UserItems = ({ user }) => {
  const userContext = useContext(UserContext);
  const { deleteUser, setCurrent, clearCurrent } = userContext;
  const onDelete = () => {
    deleteUser(userId);
    clearCurrent();
  };
  const {
    userId,
    firstName,
    lastName,
    email,
    userRole,
    groupId,
    groupName,
  } = user;
  return (
    <div className='card bg-light'>
      <h3 clasName='text-primary text-left'>
        {firstName} {''} {lastName}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (userRole === 'admin' ? 'badge-success' : 'badge-primary')
          }
        >
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i>
            {email}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(user)}
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
UserItems.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserItems;
