import { useState, useEffect } from 'react'
import BiscuitAddButton from './components/BiscuitAddButton'
import BiscuitCounter from './components/BiscuitCounter'
import BiscuitMakers from './components/BiscuitMakers'
import Footer from './components/Footer'
import Header from './components/Header'
import MainBody from './components/MainBody'
import PurchaseBiscuitManufacturers from './components/PurchaseBiscuitManufacturers'
import Sections from './components/Sections'
import './App.css'
import './components/Header.css'
import './components/Sections.css'
import './components/MainBody.css'
function App() {

  return (
    <>
      <Header />
      <Sections />
      {/* <BiscuitMakers /> */}
    </>
  )
}

export default App
