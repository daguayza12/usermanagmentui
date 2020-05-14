import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/user/userContext';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

export const UserItems = ({ user }) => {
  const userContext = useContext(UserContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { deleteUser, setCurrent, clearCurrent } = userContext;
  const { setAlert } = alertContext;
  const { userId, firstName, email, lastName, userRole } = user;

  const onDelete = () => {
    const currentUserId = parseInt(localStorage.userId);
    console.log(currentUserId);
    console.log(userId);
    if (userRole === 'admin') {
      setAlert('Cannot delete admin user', 'danger');
    } else if (currentUserId === userId) {
      setAlert('Cannot delete logged in user', 'danger');
    } else {
      console.log(userId);
      deleteUser(userId);
      clearCurrent();
    }
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
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
