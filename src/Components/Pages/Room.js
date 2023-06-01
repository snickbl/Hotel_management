import React, { useEffect } from "react";
import Header from "../../Header/Header";
import { Link, useParams } from "react-router-dom";
import "./Room.css";
import { useDispatch, useSelector } from "react-redux";
import { GetFirestoreData } from "../../findAll";
import { Carousel } from "antd";
import { CheckOut } from "./Check_Out/Check_Out";
import { CheckIn } from "./Check_In/Check_In";

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
      return <img width='700px' height='400px' src={roomInfo.gallery[index]} alt="room_pic"/>
    }
  }

  const checkin_btn = document.getElementById('checkin_btn')

  if(roomInfo && !roomInfo.guest == ''){
    checkin_btn?.setAttribute('disabled', null)
  }

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
                <div style={{marginRight: 2}}><CheckIn roomInfo={roomInfo}/></div>
                <div><CheckOut room={roomInfo}/></div>
              </div>
              <div>
                <strong className="strong_feat">Features:</strong>
                <div>
                  <ul className="features_list">
                    {roomInfo?.features.map((item, index) => (
                      <li key={index}><i className="fa-solid fa-check"></i> {item}</li>
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
