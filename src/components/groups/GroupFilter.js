import React, { useContext, useRef, useEffect } from 'react';
import GroupContext from '../../context/group/groupContext';

export const GroupFilter = () => {
  const groupContext = useContext(GroupContext);
  const text = useRef('');
  const { filterGroups, clearFilter, filtered } = groupContext;
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterGroups(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Groups...'
        onChange={onChange}
      ></input>
    </form>
  );
};

export default GroupFilter;
