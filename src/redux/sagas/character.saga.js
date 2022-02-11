import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchChars(action){
    console.log('in fetch chars saga');
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

function* characterSaga() {
    yield takeLatest('FETCH_CHAR', fetchChars);
}

export default characterSaga;
