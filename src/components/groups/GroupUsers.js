import React from 'react';
import PropTypes from 'prop-types';

const GroupUsers = ({ user }) => {
  const { firstName, lastName } = user;
  return (
    <div className='card text-center'>
      <h3>
        <i className='fas fa-user'>
          {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{' '}
          {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
        </i>
      </h3>
    </div>
  );
};
GroupUsers.propTypes = {
  user: PropTypes.object.isRequired,
};
export default GroupUsers;
