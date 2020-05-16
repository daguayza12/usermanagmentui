import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import GroupItems from './GroupItems';
import Spinner from '../layout/Spinner';
import GroupContext from '../../context/group/groupContext';

const Groups = () => {
  const groupContext = useContext(GroupContext);

  const { groups, filtered, getGroups, loading, updated } = groupContext;

  useEffect(() => {
    console.log('updated?');
    console.log(updated);
    if (updated !== null) {
      getGroups();
    }
    // eslint-disable-next-line
  }, [updated]);

  if (groups !== null && groups.length === 0 && !loading) {
    return <h4>Please add a group</h4>;
  }

  return (
    <Fragment>
      {groups !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((group) => (
                <CSSTransition
                  key={group.groupId}
                  timeout={500}
                  classNames='item'
                >
                  <GroupItems group={group} />
                </CSSTransition>
              ))
            : groups.map((group) => (
                <CSSTransition
                  key={group.groupId}
                  timeout={500}
                  classNames='item'
                >
                  <GroupItems group={group} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Groups;
