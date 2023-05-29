import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {

  let accounts = useSelector(state=>state.accounts)

  const user = localStorage.getItem('User')

  const history = useNavigate()
  
  const LogOutHendler = () => {
    localStorage.removeItem('app_token')
    sessionStorage.removeItem('app_token')
    history('/login')
  }


  return (
    <div className='main-header'>
      <div className='header'>
          <Link className='link_to_home' to='/'>
            <div className="logo">
                <span>Hotel</span>
                <hr/>
                <div className='stars'>
                  <span>
                  <i className="fa-solid fa-star"></i>
                  </span>
                  <span>
                  <i className="fa-solid fa-star"></i>
                  </span>
                  <span>
                  <i className="fa-solid fa-star"></i>
                  </span>
                  <span>
                  <i className="fa-solid fa-star"></i>
                  </span>
                </div>
            </div>
          </Link>
          <div className='photo_and_log'>
            <div className='profile_photo'>
              <img src={accounts[user]?.image} height='50px' width='50px' alt='profile_photo'/>
            </div>
            <div className='log_out' 
              onClick={LogOutHendler}
            >Log Out</div>
          </div>
      </div>
    </div>
   
  )
}

export default Header