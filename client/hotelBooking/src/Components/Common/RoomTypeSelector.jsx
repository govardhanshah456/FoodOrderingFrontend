import axios from 'axios'
import React, { useEffect, useState } from 'react'

const RoomTypeSelector = ({roomType,setRoomType}) => {
    const [roomTypes, setRoomTypes] = useState([{}])
	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
	const [newRoomType, setNewRoomType] = useState("")
	const [successMessage,setSuccessMessage] = useState("")
	const [errorMessage,setErrorMessage] = useState("")
	const [swt,setSwt] = useState(false)
  	const handleNewRoomTypeInputChange = (e) => {
    	setNewRoomType(e.target.value);
  	}

  const handleNewRoomAdd = async (e) => {
	try {
		await axios.post("http://localhost:8080/room-type/add/new-room-type",{name:newRoomType});
		setSuccessMessage("Added Room Type Successfully.");
		setSwt(!swt)
	} catch (error) {
		console.log(error);
		setErrorMessage("Error Occured While Adding Room Type:"+error.message);
	}
    
    setNewRoomType('');
    setShowNewRoomTypeInput(false);
	setTimeout(()=>{
		setSuccessMessage("");
		setErrorMessage("");
	},3000)
  }

  useEffect(()=>{
    axios.get("http://localhost:8080/room-type/get/all-room-type").then((res)=>setRoomTypes(res.data))
  },[swt])
  console.log(roomType)
  return (
    <>
      {roomTypes.length >= 0 && (
				<div>
					{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

					<select
						required
						className="form-select"
						name="roomType"
						onChange={(e) => {
							setRoomType(e.target.value)
							if (e.target.value === "Add New") {
								setShowNewRoomTypeInput(true)
							} else {
								const selectedIndex = e.target.selectedIndex;
      							const selectedOption = e.target.options[selectedIndex];
      							const id = selectedOption.getAttribute("id");
								setRoomType({id,name:e.target.value})
								setShowNewRoomTypeInput(false)
							}
						}}
						value={roomType?.name}>
						<option value="">Select a room type</option>
						<option value={"Add New"}>Add New</option>
						{roomTypes.map((type, index) => (
							<option key={index} value={type.name} id={type.id}>
								{type.name}
							</option>
						))}
					</select>
					{showNewRoomTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New Room Type"
									value={newRoomType}
									onChange={handleNewRoomTypeInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleNewRoomAdd}>
									Add
								</button>
							</div>
						</div>
					)}
				</div>
			)}
      
    </>
  )
}

export default RoomTypeSelector