import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearUsers } = userContext;

  const onLogout = () => {
    logout();
    clearUsers();
  };
  const currentUser = {
    firstName: localStorage.firstName,
    lastName: localStorage.lastName,
  };
  const authLinks = (
    <Fragment>
      <li>
        Welcome{' '}
        {currentUser && currentUser.firstName + ' ' + currentUser.lastName}
      </li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/groups'>User Groups</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'>Logout</i>
          <span className='hide-sm' />
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = <Fragment />;
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon}> {title}</i>
      </h1>
      <ul>{localStorage.token ? authLinks : guestLinks}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'User Managment',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
