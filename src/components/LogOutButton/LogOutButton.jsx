import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      className="button-secondary"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
