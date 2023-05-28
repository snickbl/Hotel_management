import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'


const Header = () => {

  const history = useNavigate()
  
  const LogOutHendler = () => {
    localStorage.removeItem('app_token')
    history('/autorisation')
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
          <div className='log_out' 
            onClick={LogOutHendler}
          ><i className="fa-solid fa-user"></i>Log Out</div>
      </div>
    </div>
   
  )
}

export default Header