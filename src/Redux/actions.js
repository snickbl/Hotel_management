export const fetchData = () => ({
    type: 'FETCH_DATA',
  });
  
  export const saveData = (data) => ({
    type: 'SAVE_DATA',
    payload: data,
  });