import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios";
import RoomTypeSelector from "../Common/RoomTypeSelector";
const EditRoom = () => {
    const param = useParams()
    const id =param.roomId;
    const [roomType,setRoomType] = useState({id:0,name:''});
    const [room, setRoom] = useState({
		photo: "",
		roomPrice: 0
	})
    const [imagePreview, setImagePreview] = useState('');
    const [dbImage,setDbImage] = useState(true)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleRoomPriceChange = (e) => {
        setRoomPrice(e.target.value)
    }
    // console.log(roomType)
    const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setRoom({ ...room, photo: selectedImage })
        setDbImage(false);
		setImagePreview(URL.createObjectURL(selectedImage))
	}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("photo", room.photo);
            formData.append("roomTypeId", roomType.id);
            formData.append("roomPrice", room.roomPrice);
            console.log(formData)
            await axios.put(`http://localhost:8080/rooms/edit/room/${id}`, formData);
                setSuccessMessage("Edited Room Successfully.");
                setRoomType({id:0,name:''});
                setRoom({photo:"",roomPrice:""})
        } catch (err) {
            setErrorMessage(err.message);
        }
        setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
    }
    useEffect(()=>{
        const fetchRoomById = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/rooms/get/${id}`);
                console.log(res)
                setRoom(res.data.body)
                setDbImage(true)
                setRoomType({id:res.data.body.roomType.id,name:res.data.body.roomType.name})
				setImagePreview(res.data.body.photo)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoomById()
    },[id])
    const handleInputChange = (event) => {
		const { name, value } = event.target
		setRoom({ ...room, [name]: value })
	}
    console.log(imagePreview)
  return (
    <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2>Edit Room</h2>
                        {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='roomType' className='form-label'>
                                    Room Type
                                </label>
                                <div>
									<RoomTypeSelector
                                        roomType={roomType}
										setRoomType={setRoomType}
									/>
								</div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-label'>
                                    Room Price
                                </label>
                                <input
                                className='form-control'
                                type="number"
                                id='roomPrice'
                                name='roomPrice'
                                required
                                value={room.roomPrice}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
							<label htmlFor="photo" className="form-label hotel-color">
								Photo
							</label>
							<input
								required
								type="file"
								className="form-control"
								id="photo"
								name="photo"
								onChange={handleImageChange}
							/>
							{(imagePreview) && (dbImage) && (
								<img
									src={`data:image/jpeg;base64,${imagePreview}`}
									alt="Room preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
                            {(imagePreview) && (!dbImage) && (
								<img
									src={imagePreview}
									alt="Room preview"
									style={{ maxWidth: "400px", maxHeight: "400" }}
									className="mt-3"
								/>
							)}
						</div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Room
								</button>
							</div>
                        </form>
                    </div>
                </div>
            </section>
        </>
  )
}

export default EditRoom