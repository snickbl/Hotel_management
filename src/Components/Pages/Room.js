import React, { useEffect } from "react";
import Header from "../../Header/Header";
import { Link, useParams } from "react-router-dom";
import "./Room.css";
import { useDispatch, useSelector } from "react-redux";
import { GetFirestoreData } from "../../findAll";
import { Button, Carousel } from "antd";

export const Room = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GetFirestoreData(dispatch);
  }, []);

  let rooms = useSelector((state) => state.rooms);

  let { roomId } = useParams();
  const id = roomId;

  const searchById = (id) => {
    return rooms.find((obj) => obj.id === id);
  };

  const roomInfo = searchById(id);

  const carr = (index) => {
    if(roomInfo){
      return <img width='700px' height='400px' src={roomInfo.gallery[index]}/>
    }
  }

  // const featureCreater = () => {
  //   if(roomInfo){
  //     roomInfo.features.map((el, index) => {
  //       console.log('vsyo ok');
  //       return (
  //         <div id={index}>
  //           el
  //         </div>
  //       )
  //     })
  //   }
  // }

  // console.log(roomInfo);

  return (
    <div>
      <Header />
      <div className="room_container">
        <div>
          <div className="home_return">
            <Link className="link_to_home" to="/">
              <i className="fa-solid fa-house"></i>Back Home
            </Link>
          </div>
        </div>
        <div className="info_container">
          <div className="first">
          <Carousel autoplay>
            <div>
              {carr(0)}
            </div>
            <div>
              {carr(1)}
            </div>
          </Carousel>
          </div>
          <div className="sec_and_thd">
            <div className="second">
              <div className="content_info">
                <h2>Room {roomInfo?.number}</h2>
                <p><strong>Type </strong>:  {roomInfo?.type}</p>
                <p><strong>Occupancy </strong>:  {roomInfo?.occupancy}</p>
                <p><strong>Price </strong>:  {roomInfo?.price}$</p>
                <p><strong>Guest </strong>:  {roomInfo?.guest}</p>
              </div>
            </div>
            <div className="third">
              <div className="check_btn">
                <Button>Check In</Button>
                <Button style={{ background: '#0478FF', color: 'white', marginLeft:'15px' }}>Check Out</Button>
              </div>
              <div>
                <strong className="strong_feat">Features:</strong>
                <div>
                  <ul className="features_list">
                    {roomInfo?.features.map((item, index) => (
                      <li key={index}><i class="fa-solid fa-check"></i> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="desc_cont">
          <strong>Description:</strong>
          <div className="desc">{roomInfo?.description}</div>
        </div>
      </div>
    </div>
  );
};
