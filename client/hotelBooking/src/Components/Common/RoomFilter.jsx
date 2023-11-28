import React, { useEffect, useState } from 'react'
import axios from 'axios'
const RoomFilter = ({data,setFilteredData}) => {
    const [filter, setFilter] = useState("")
    const [roomTypes,setRoomTypes] = useState([{}])
	const handleSelectChange = (e) => {
		const selectedType = e.target.value
		setFilter(selectedType)

		const filteredRooms = data.filter((room) =>
			room.roomTypeName.toLowerCase().includes(selectedType.toLowerCase())
		)
		setFilteredData(filteredRooms)
	}

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

    useEffect(()=>{
        const fetchRoomTypes = async () => {
            await axios.get("http://localhost:8080/room-type/get/all-room-type").then((res)=>setRoomTypes(res.data))
        }
        fetchRoomTypes()
    },[])
  return (
    <div className="input-group mb-3">
			<span className="input-group-text" id="room-type-filter">
				FIlter rooms by type
			</span>
			<select
				className="form-select"
				aria-label="romm type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a room type to filter....</option>
				{roomTypes.map((type, index) => (
					<option key={index} value={type.name}>
						{type.name}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
  )
}

export default RoomFilter