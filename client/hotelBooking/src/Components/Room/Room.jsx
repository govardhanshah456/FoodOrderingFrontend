import React, { useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import { Col, Row } from 'react-bootstrap'
import RoomFilter from '../Common/RoomFilter'
import RoomPaginator from '../Common/RoomPaginator'
import axios from 'axios'
const Room = () => {
    const [rooms, setRooms] = useState([{}])
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPerPage] = useState(6)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredRooms, setFilteredRooms] = useState([{}])
    const [selectedRoomType, setSelectedRoomType] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get("http://localhost:8080/rooms/get/all-rooms");
                console.log(res.data)
                setRooms(res.data);
                setFilteredRooms(res.data)
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
    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms)
        } else {
            const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filteredRooms)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])
    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <>
            <Row>
                <Col md={6} className="mb-2 md-mb-0">
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                        onPageChange={handlePaginationClick}
					/>
				</Col>
            </Row>
            <Row>
                {currentRooms.map((room,index)=>(
                    <RoomCard room={room} key={index}/>
                ))}
            </Row>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                        onPageChange={handlePaginationClick}
					/>
				</Col>
            </Row>
        </>
    )
}

export default Room