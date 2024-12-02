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
import Stats from './Stats';
import Tabla from './Tabla';
import AnimalForm from './AnimalForm';
import FoodForm from './FoodForm';
import TreatmentForm from './TreatmentForm';

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
            <Route path='/signup' element={<SignUp edit={false} />} />
            <Route path='/dashboard' element={<Protected><Dashboard /></Protected>} />
            <Route path='/dashboard/animal' element={<Protected><Stats db='animal' /></Protected>} />
            <Route path='/dashboard/alimento' element={<Protected><Stats db='alimento' /></Protected>} />
            <Route path='/dashboard/tratamiento' element={<Protected><Stats db='tratamiento' /></Protected>} />
            <Route path='/dashboard/granjero' element={<Protected><SignUp edit={true} /></Protected>} />
            <Route path='/dashboard/animal/show' element={<Protected><Tabla tabla='ANIMAL' /></Protected>} />
            <Route path='/dashboard/alimento/show' element={<Protected><Tabla tabla='ALIMENTO' /></Protected>} />
            <Route path='/dashboard/tratamiento/show' element={<Protected><Tabla tabla='TRATAMIENTO' /></Protected>} />
            <Route path='/editANIMAL' element={<Protected><AnimalForm /></Protected>} />
            <Route path='/editALIMENTO' element={<Protected><FoodForm /></Protected>} />
            <Route path='/editTRATAMIENTO' element={<Protected><TreatmentForm /></Protected>} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App;
