// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect} from 'react';
// import { GetFirestoreData } from './findAll';
// import { saveData } from './Redux/actions';

import { useEffect } from "react";
import { URLs } from "./Components/URLs";
import { useNavigate } from "react-router-dom";

function App() {

  // const dispatch = useDispatch()

  // let accounts = useSelector(state=>state.data.accounts)
  // let rooms = useSelector(state=>state.data.rooms)

  // useEffect(()=>{
  //   GetFirestoreData().then(a=>dispatch(saveData(a)))  
  // },[])
  // console.log(accounts, rooms)

  // GetFirestoreData()

  let history = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('app_token')){
      history('/autorisation')
    }
  }, [])


  return (
    <div className="App">
      <URLs/>
    </div>
  );
}

export default App;
