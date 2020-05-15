import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UserItem from './UserItems';
import Spinner from '../layout/Spinner';
import UserContext from '../../context/user/userContext';
import AuthContext from '../../context/auth/authContext';

const Users = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { userss, filtered, getUsers, loading } = userContext;
  const { user } = authContext;

  useEffect(() => {
    console.log(user);
    getUsers();
    // eslint-disable-next-line
  }, []);

  if (userss !== null && userss.length === 0 && !loading) {
    return <h4>Please add a user</h4>;
  }

  return (
    <Fragment>
      {userss !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((user) => (
                <CSSTransition
                  key={user.userId}
                  timeout={500}
                  classNames='item'
                >
                  <UserItem user={user} />
                </CSSTransition>
              ))
            : userss.map((user) => (
                <CSSTransition
                  key={user.userId}
                  timeout={500}
                  classNames='item'
                >
                  <UserItem user={user} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Users;
