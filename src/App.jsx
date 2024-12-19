import React, { useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { setLocalStorage } from './utils/LocalStorage'

const App = () => {

 const [user,setUser] = useState(null)

 const handleLogin = (email,password)=>{
  
 }

  return (
    <>
    {!user? <Login/>: ''}
      <Login/>
      {/* <EmployeeDashboard/> */}
      {/* <AdminDashboard/> */}
    </>
  )
}

export default App
