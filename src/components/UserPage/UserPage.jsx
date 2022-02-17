import React, {useState, useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import QuickLoadChar from '../QuickLoadChar/QuickLoadChar';
import NewCharacterForm from '../NewCharacterForm/NewCharacterForm';

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
    <div id="userPage" >
      <div className="comp">
          {edit 
              ?
              <form onSubmit={editUser} >
                <input onChange={(evt) => setNewName(evt.target.value)} type="text" placeholder="New User Name" value={newName}/>
                <button className="button-warning" type="submit">Update!</button>
              </form>
              : <h2>Welcome, {user.username}!</h2>
            }
            <div id="userButtons">
            <button className="button-warning" onClick={() => setEdit(!edit)}>{edit ? 'Cancel Edit' : 'Edit User'}</button>
            <button className="button-danger" onClick={deleteUser}>Delete User</button>
            <LogOutButton />
          </div>
          </div>
        <QuickLoadChar />
        <NewCharacterForm />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
