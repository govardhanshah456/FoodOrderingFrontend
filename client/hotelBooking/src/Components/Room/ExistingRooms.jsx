import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import RoomPaginator from '../Common/RoomPaginator'
import RoomFilter from '../Common/RoomFilter'
import { Col, Row } from "react-bootstrap"
const ExistingRooms = () => {
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
    const handleDelete = async (id) => {
        try{
            const res = await axios.delete(`http://localhost:8080/rooms/delete/room/${id}`);
            setSuccessMessage("Deleted Room Successfully.");
        }
        catch(err){
            setErrorMessage(err.message);
        }
        setTimeout(()=>{
            setSuccessMessage("");
            setErrorMessage("")
        },3000)
    }

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>
            {isLoading ? (
                <p>Loading existing rooms</p>
            ) : (
                <>
                    <section className="mt-5 mb-5 container">
                        <div className="d-flex justify-content-between mb-3 mt-5">
                            <h2>Existing Rooms</h2>
                        </div>
                        <Row>
							<Col md={6} className="mb-2 md-mb-0">
								<RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
							</Col>

							<Col md={6} className="d-flex justify-content-end">
								<Link to={"/add-room"}>
									<FaPlus /> Add Room
								</Link>
							</Col>
						</Row>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className="text-center">
                                        <td>{room.id}</td>
                                        <td>{room.roomTypeName}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-room/${room.id}`} className="gap-2">
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm ml-5">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm ml-5"
                                                onClick={() => handleDelete(room.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </section>
                </>
            )}
        </>
    )
}

export default ExistingRooms