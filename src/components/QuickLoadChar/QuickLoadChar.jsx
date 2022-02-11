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

    return (<>
        <div>
            <table>
                <tr>
                    <td>
                        {char.username}
                    </td>
                    <td>
                    <a href={"./game.html?char=" + char.id} target="blank">
                        {char.id}
                    </a>
                    </td>
                </tr>
            </table>
        </div>
    </>)
}

export default QuickLoadChar;
