import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from './Components/Room/AddRoom'
import ExistingRooms from './Components/Room/ExistingRooms'
import EditRoom from './Components/Room/EditRoom'
import Navbar from './Components/Layout/Navbar'
import Footer from './Components/Layout/Footer'
import RoomListing from './Components/Room/RoomListing'
import Admin from './Components/Admin/Admin'
import Home from './Components/Home/Home'
import Checkout from './Components/Booking/Checkout'
import BookingSuccess from './Components/Booking/BookingSuccess'
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/existing-rooms' element={<ExistingRooms />} />
          <Route path='/add-rooms' element={<AddRoom />} />
          <Route path='/edit-room/:roomId' element={<EditRoom />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
