import React from 'react'
import Header from './Header'
import Footer from './Footer'
function Dashboard() {
  return (
    <>
      <Header tabs={false} />
      <div className='dashboard'>
        <a href='/dashboard/ganado' className='dashboard-child'>
          <h3>GANADO</h3>
          <img src='/src/assets/ganado.png' alt='lol' />
        </a>
        <a href='/dashboard/alimento' className='dashboard-child'>
          <h3>ALIMENTO</h3>
          <img src='/src/assets/alimento.png' alt='lol' />
        </a>
        <a href='/dashboard/granjero' className='dashboard-child'>
          <h3>GRANJERO</h3>
          <img src='granjero.png' alt='lol' />
        </a>
        <a href='/dashboard/tratamiento' className='dashboard-child'>
          <h3>TRATAMIENTO</h3>
          <img src='/src/assets/tratamiento.png' alt='lol' />
        </a>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
