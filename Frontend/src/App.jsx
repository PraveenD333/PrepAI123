import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingPage from './Pages/LoadingPage'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import Dashboard from './Pages/Home/Dashboard'
import InterviewPrep from './Pages/InterviewPrep/InterviewPrep'

const App = () => {
  return (
      <div>
        <Routes>

          <Route path='/' element={<LoadingPage/>} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
        </Routes>
      </div> 
  )
}

export default App