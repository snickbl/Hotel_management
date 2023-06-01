import { takeLatest, put, call } from 'redux-saga/effects';
import { saveRooms, saveUsers } from './actions';
import { GetFirestoreData } from '../findAll'; 

function* fetchDataSaga() {
  try {
    const data = yield call(GetFirestoreData);

    yield put(saveRooms(data));
    yield put(saveUsers(data)); 
  } catch (error) {
    console.log('ERROR');
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_DATA', fetchDataSaga);
}

export default rootSaga;