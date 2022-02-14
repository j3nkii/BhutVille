import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function QuickLoadChar() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'FETCH_CHAR'
        })
    }, [])
    //setup char saga
    const user = useSelector((store) => store.user);
    const char = useSelector((store) => store.character);
    //map through characters making section for each one


    console.log(char);
    return (<>
        <div className="comp">
            <h1>current games:</h1>
            <table >
                {char.map((item) => (
                    <tr>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            <button
                                className="button-primary"
                                onClick={()=> window.open(`./game.html?char=${item.id}`)}
                            >
                                Load Game
                            </button>
                        </td>
                    </tr>))
                }
            </table>
        </div>
    </>)
}

export default QuickLoadChar;
