import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Loader } from 'lucide-react'
import Login from './Login'
import { useSelector } from 'react-redux'

const Layout = () => {

  const { user, loading } = useSelector(state => state.auth)

  if (loading) {
    return <Loader />
  }

  return (
    <div className='bg-black min-h-screen'>

      {user ? (
        <>
          <NavBar user={user} />
          <p className='border rounded-full border-green-700 mx-30 my-3' />
          <Outlet context={{ user }} />
        </>
      ) : (
        <Login />
      )}

    </div>
  )
}

export default Layout