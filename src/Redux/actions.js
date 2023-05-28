export const fetchData = () => ({
    type: 'FETCH_DATA',
  });
  
  // export const saveData = (data) => ({
  //   type: 'SAVE_DATA',
  //   payload: data,
  // });
  export const saveRooms = (data) => ({
    type: 'SAVE_ROOMS',
    payload: data,
  });

  export const saveUsers = (data) => ({
    type: 'SAVE_USERS',
    payload: data,
  });