import { collection, getDocs } from 'firebase/firestore'; // Подключите модуль Firestore из вашей библиотеки Firebase
import { db } from './firebase';
import { /*saveData,*/ saveRooms, saveUsers } from './Redux/actions';

export const GetFirestoreData = async (dispatch) => {

  // const dispatch = useDispatch()

  try {
    const dataCollection = collection(db, 'data'); // Замените 'your_collection' на имя вашей коллекции

    const snapshot = await getDocs(dataCollection); // Получение снимка (snapshot) документов

    const data = snapshot.docs.map((doc) => doc.data());

    // dispatch(saveData(data[0]))


    dispatch(saveRooms(data[0]?.rooms))
    dispatch(saveUsers(data[0]?.accounts))

  

    return data[0];
  } catch (error) {
    throw new Error('Ошибка при получении данных из Firebase Firestore');
  }
};