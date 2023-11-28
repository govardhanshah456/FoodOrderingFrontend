import React from 'react'
import HeaderMain from '../Layout/HeaderMain'
import RoomCarousel from '../Common/RoomCarousel'
import Parallax from '../Common/Parallax'
import HotelService from '../Common/HotelService'

const Home = () => {
  return (
    <>
    <section>
    <div>Welcome to Hotel Booking Online Website</div>
			<HeaderMain />
			<div className="container">
				<RoomCarousel />
				<Parallax />
				<HotelService />
			</div>
		</section>
    </>
    

  )
}

export default Home