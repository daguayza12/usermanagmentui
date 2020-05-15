import React, { useContext, useEffect, useState } from 'react';
import Groups from '../groups/Groups';
import GroupForm from '../groups/GroupForm';
import GroupFilter from '../groups/GroupFilter';
import AuthContext from '../../context/auth/authContext';

const GroupHome = (props) => {
  const authContext = useContext(AuthContext);
  const { loadGroups, isAuthenticated } = authContext;

  useEffect(() => {
    if (!localStorage.token) {
      props.history.push('/login');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <GroupForm />
      </div>
      <div>
        <GroupFilter />
        <Groups />
      </div>
    </div>
  );
};

export default GroupHome;
