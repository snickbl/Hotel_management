import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFirestoreData } from "../../../findAll";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { saveRooms } from "../../../Redux/actions";

export const CheckOut = (roomInfo) => {

  const dispatch = useDispatch();

  useEffect(() => {
    GetFirestoreData(dispatch);
  }, []);

  let rooms = useSelector((state) => state.rooms);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const check_out = () => {
    rooms.map((e, index)=>{
      if(e?.number == roomInfo.room?.number){
        rooms[index].guest = ''
        rooms[index].isCheckedIn = false
        rooms[index].checkInDate = null

        const db = getFirestore()
      
        const sender = async () => {
          try{
            await updateDoc(doc(db, "data", "1cB2lyPiRJfgRUYnlfzs"), {
              rooms: rooms
            })
          }catch{
            console.log('ERROR');
          }
        }
        sender()
        dispatch(saveRooms(rooms))
      }})
  }

  const handleOk = () => {
    check_out()
    setIsModalOpen(false);
    GetFirestoreData(dispatch)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if(roomInfo?.room?.guest !== ''){
    return (
      <>
        <Button type="primary" onClick={showModal}>
          Check Out
        </Button>
        <Modal closable={false}
           title="Check Out" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Confirm' cancelText='Cancel'>
          <hr/>
          <p style={{marginTop: 20, marginBottom: 30}}>Do you confirm the check-out Room {roomInfo.room?.number}?</p>
          <hr/>
        </Modal>
      </>
    );
  }else{
        return(
          <Button disabled>
            Check Out
          </Button>
        )
  }
}
