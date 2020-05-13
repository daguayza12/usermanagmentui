import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UserContext from '../../context/user/userContext';
import UserItem from './UserItems';
export const Users = () => {
  const userContext = useContext(UserContext);
  const { users, filtered } = userContext;
  if (users.legnth === 0) {
    return <h4>Please add a user</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((user) => (
              <CSSTransition key={user.userId} timeout={500} classNames='item'>
                <UserItem user={user} />
              </CSSTransition>
            ))
          : users.map((user) => (
              <CSSTransition key={user.userId} timeout={500} classNames='item'>
                <UserItem user={user} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};
export default Users;
