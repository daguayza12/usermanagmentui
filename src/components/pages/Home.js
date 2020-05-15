import React, { useContext, useEffect, useState } from 'react';
import Users from '../users/Users';
import UserForm from '../users/UserForm';
import UserFilter from '../users/UserFilter';

const Home = (props) => {
  useEffect(() => {
    if (!localStorage.token) {
      props.history.push('/login');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <UserForm />
      </div>
      <div>
        <UserFilter />
        <Users />
      </div>
    </div>
  );
};

export default Home;
