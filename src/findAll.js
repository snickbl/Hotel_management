import { collection, getDocs } from 'firebase/firestore'; // Подключите модуль Firestore из вашей библиотеки Firebase
import { db } from './firebase';

export const GetFirestoreData = async () => {

  try {
    const dataCollection = collection(db, 'data'); // Замените 'your_collection' на имя вашей коллекции

    const snapshot = await getDocs(dataCollection); // Получение снимка (snapshot) документов

    const data = snapshot.docs.map((doc) => doc.data());
    // console.log(data[0])

    return data[0];
  } catch (error) {
    throw new Error('Ошибка при получении данных из Firebase Firestore');
  }
};