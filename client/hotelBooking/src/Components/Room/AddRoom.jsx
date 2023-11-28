import React, { useState } from 'react'
import axios from 'axios';
import RoomTypeSelector from '../Common/RoomTypeSelector';
const AddRoom = () => {
    const [roomType, setRoomType] = useState({id:0,name:''});
    const [roomPrice, setRoomPrice] = useState();
    const [photo, setPhoto] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleRoomPriceChange = (e) => {
        setRoomPrice(e.target.value)
    }
    console.log(roomType)
    const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setPhoto(selectedImage)
		setImagePreview(URL.createObjectURL(selectedImage))
	}
    console.log(roomPrice,roomType,photo)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("roomTypeId", roomType.id);
            formData.append("roomPrice", roomPrice);
            await axios.post("http://localhost:8080/rooms/add/new-room", formData);
                setSuccessMessage("Added Room Successfully.");
                setRoomPrice("");
                setRoomType({id:'',name:''});
                setPhoto("");
                setImagePreview("")
        } catch (err) {
            setErrorMessage(err.message);
        }
        setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
    }
    console.log(imagePreview)
    return (
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2>Add New Room</h2>
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
                                id='roomPrice'
                                name='roomPrice'
                                required
                                value={roomPrice}
                                onChange={handleRoomPriceChange}
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-label'>
                                    Room Photo
                                </label>
                                <input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview  room photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
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

export default AddRoom