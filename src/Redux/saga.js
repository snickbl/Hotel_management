import { takeLatest, put, call } from 'redux-saga/effects';
import { /*saveData, */ saveRooms, saveUsers } from './actions';
import { GetFirestoreData } from '../findAll'; // Замените `yourDataFetchingFunction` на вашу функцию получения данных

function* fetchDataSaga() {
  try {
    const data = yield call(GetFirestoreData); // Вызов функции получения данных

    yield put(saveRooms(data)); // Сохранение данных в хранилище при помощи экшена SAVE_DATA
    yield put(saveUsers(data)); // Сохранение данных в хранилище при помощи экшена SAVE_DATA
    // yield put(saveData(data)); // Сохранение данных в хранилище при помощи экшена SAVE_DATA
  } catch (error) {
    // Обработка ошибок, если требуется
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_DATA', fetchDataSaga);
}

export default rootSaga;