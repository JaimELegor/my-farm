import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Index from './Index';
import About from './About';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from './Context/useAuth';
import Protected from './Protected';
import Ganado from './Ganado';

function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
            <Route path='/dashboard/ganado' element={<Protected><Ganado /></Protected>} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App;
