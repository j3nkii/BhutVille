import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchChars(action){
    try {
        const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        };
        const chars = yield axios.get(`api/char/`, config);
        yield put({type:'SET_CHAR', payload: chars.data})
    } catch (error) {
    console.log('chars get request failed', error);
    }
}

function* addChars(action){
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        yield axios.post(`api/char/add-char`, {name: action.payload}, config);
        yield put({type:'FETCH_CHAR'})
    } catch (error) {
    console.log('chars get request failed', error);
    }
}

function* characterSaga() {
    yield takeLatest('FETCH_CHAR', fetchChars);
    yield takeLatest('ADD_CHAR', addChars);
}

export default characterSaga;
