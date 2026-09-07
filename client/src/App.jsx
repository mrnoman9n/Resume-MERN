import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import api from './configs/api'
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import Resume from "./pages/Resume";
import Signup from "./pages/Signup";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./app/authSlice";
import { Toaster } from "react-hot-toast";

const App = () => {

const dispatch = useDispatch()
const getUserData = async () => {
  const token = localStorage.getItem('token')

try {
  if (token) {


  const {data} = await api.get('/api/users/data' , {
   headers :{
    Authorization : `Bearer ${token}`
   }
  })

  if (data.user) {
    dispatch(login({token , user : data.user}))
  }
  dispatch(setLoading(false))

  
} else {
  dispatch(setLoading(false))
  
}
  
} catch (error) {
   dispatch(setLoading(false))
   console.log(error.message)
}

}

useEffect(
  () =>{
    getUserData()
  }, []
)


  return (
    <div>
      <Toaster/>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* App Layout */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<Resume />} />
        </Route>

        {/* Authentication */}
       <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Resume Preview */}
        <Route path="/view/:resumeId" element={<Preview />} />

      

      </Routes>
    </div>
  );
};

export default App;