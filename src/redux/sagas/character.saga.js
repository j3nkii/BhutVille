import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* setChars(action){
    try {
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };
        yield axios.put(`api/user/update/`, {newName: action.payload.newName}, config);
        yield put({type:'FETCH_USER'})
    } catch (error) {
    console.log('User get request failed', error);
    }
}

function* fetchChars(action){
    try {
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };
        yield axios.get(`api/user/character/`, config);
        yield put({type:'FETCH_USER'})
    } catch (error) {
    console.log('User get request failed', error);
    }
}

function* characterSaga() {
    yield takeLatest('FETCH_CHARS', fetchChars);
}

export default userSaga;
