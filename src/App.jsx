import { useState } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from './Components/Header'
import HeroSec from './Components/Herosec'
import GymDetails from './Components/GymDetails'
import GymDetailsSec2 from './Components/GymDetailsSec2'
import PaymentForm from './Components/PaymentForm'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <Header />
      <HeroSec />
      <GymDetails />
      <GymDetailsSec2 />
      <PaymentForm />
      <Footer />
    </>
  )
}

export default App
