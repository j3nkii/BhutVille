import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';

function UserPage() {
  // add an edit and delete for user to compl CRUD
  //used for editing
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState('');
  //end editing
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const editUser = (evt) => {
    evt.preventDefault();
    setEdit(!edit)
    dispatch({
      type: 'UPDATE_USER',
      payload: {newName, id: user.id},
    })
  }

  const deleteUser = () => {
    dispatch({
      type: 'DELETE_USER',
      payload: user.id
    })
  }
  return (
    <div className="container">
      {edit 
        ?
        <form onSubmit={editUser} >
          <input onChange={(evt) => setNewName(evt.target.value)} type="text" value={newName}/>
          <button className="btn" type="submit">Update!</button>
        </form>
        : <h2>Welcome, {user.username}!</h2>}
      <button className="btn" onClick={() => setEdit(!edit)}>{edit ? 'Cancel Edit' : 'Edit User'}</button>
      <button className="btn" onClick={deleteUser}>Delete User</button>
      <LogOutButton className="btn" />
      <div><button className="btn"><a href="./game.html?char=1" target="blank">TO BHUTVILLE GAME</a></button></div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
