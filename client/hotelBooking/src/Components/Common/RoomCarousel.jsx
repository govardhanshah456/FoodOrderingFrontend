import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardImg, CardTitle, Carousel, CarouselItem, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{}])
    const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get("http://localhost:8080/rooms/get/all-rooms");
                setRooms(res.data);
                setIsLoading(false)
            }
            catch (err) {
                console.log(err);
                setIsLoading(false)
                setErrorMessage(err.message)
            }
        }
        fetchRooms()
    }, [])
    if (isLoading) {
		return <div className="mt-5">Loading rooms....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}
  return (
    <section className="bg-light mb-5 mt-5 shadow">
        <Link to={'/browse-all-rooms'}  className="hote-color text-center">
            Browse All Rooms
        </Link>
        <Container>
            <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
						<CarouselItem key={index}>
							<Row>
								{rooms.slice(index * 4, index * 4 + 4).map((room) => (
									<Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/book-room/${room.id}`}>
												<CardImg
													variant="top"
													src={`data:image/png;base64, ${room.photo}`}
													alt="Room Photo"
													className="w-100"
													style={{ height: "200px" }}
												/>
											</Link>
											<CardBody>
												<CardTitle className="hotel-color">{room.roomType}</CardTitle>
												<CardTitle className="room-price">${room.roomPrice}/night</CardTitle>
												<div className="flex-shrink-0">
													<Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
														Book Now
													</Link>
												</div>
											</CardBody>
										</Card>
									</Col>
								))}
							</Row>
						</CarouselItem>
					))}
            </Carousel>
        </Container>
    </section>
  )
}

export default RoomCarousel