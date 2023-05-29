import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Room } from './Pages/Room'
import { Autorisation } from './Pages/Autorisation'
import {PrivateRoute} from './PrivateRoute/PrivateRoute'

export const URLs = () => {
  return (
    <>
        <Routes>
            <Route path='/login' element={<Autorisation/>}/>

            <Route path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<Home/>}/>            
              <Route path='/rooms?/:roomId' element={<Room/>}/>
            </Route>            
            
        </Routes>
    </>
  )
}
