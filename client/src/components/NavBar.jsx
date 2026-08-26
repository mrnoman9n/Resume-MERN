import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({user}) => {
  
  const navigate = useNavigate()

  function handleSignOut (){

navigate('/')

  }





  return (
    <div className='bg-black'>
<nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 transition-all text-slate-800'>
<Link to='/'>
<img src='/logo-black-bg.svg' />
</Link>

<div className='flex  text-white'>
<p className='text-white mx-3 my-1.5 max-sm:hidden'>Hi , {user.name}</p>
<button onClick={handleSignOut} className='border-2 rounded-full mx-2 px-3 py-1 hover:scale-105 transition-transform duration-200 text-green-600'>Log out</button>


</div>


</nav>





    </div>
  )
}

export default NavBar