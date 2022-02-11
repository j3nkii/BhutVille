import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function QuickLoadChar() {
    //setup char saga
    const user = useSelector((store) => store.user);
    //map through characters making section for each one
}

export default QuickLoadChar;
