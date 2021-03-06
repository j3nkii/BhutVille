import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function NewCharacterForm() {
    const [charName, setCharName] = useState('');
    const dispatch = useDispatch();

    const newChar = (evt) =>{
        console.log(charName);
        evt.preventDefault();
        dispatch({
            type: 'ADD_CHAR',
            payload: charName
        })
    }

    return (
        <form className="comp" onSubmit={newChar}>
        <h2>Make New Character</h2>
        <div>
            <input
                type="text"
                name="username"
                placeholder="Character Name"
                value={charName}
                required
                onChange={(event) => setCharName(event.target.value)}
            />
        </div>
        <div>
            <input className="button-primary" type="submit" name="submit" value="Add Character" />
        </div>
        </form>
    );
}

export default NewCharacterForm;
