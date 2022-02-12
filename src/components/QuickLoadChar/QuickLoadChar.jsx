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
        <div>
            <h1>current games:</h1>
            <table>
                {char.map((item) => (
                    <tr>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            <a href={"./game.html?char=" + item.id} target="blank">
                                {item.id}
                            </a>
                        </td>
                    </tr>))
                }
            </table>
        </div>
    </>)
}

export default QuickLoadChar;
