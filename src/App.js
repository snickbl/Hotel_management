import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { GetFirestoreData } from './findAll';
import { saveData } from './Redux/actions';

function App() {

  const dispatch = useDispatch()

  let accounts = useSelector(state=>state.data.accounts)
  let rooms = useSelector(state=>state.data.rooms)

  useEffect(()=>{
    GetFirestoreData().then(a=>dispatch(saveData(a)))  
  },[])
  console.log(accounts, rooms)

  return (
    <div className="App">
     
    </div>
  );
}

export default App;
