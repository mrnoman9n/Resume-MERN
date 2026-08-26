import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'


const Layout = () => {

const user = {name : "jhon doe"}
  
  return (
    <div className='bg-black min-h-screen'>
      <NavBar user={user}/>
      <p className=' border rounded-full border-green-700  mx-30 my-3 '/>

      <Outlet context={{user}}/>
    </div>
  )
}

export default Layout;