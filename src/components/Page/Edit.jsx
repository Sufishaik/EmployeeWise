import React, { useEffect, useState } from 'react'

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../store/UseSlice';
import { toast, ToastContainer } from 'react-toastify';
function Edit() {
    const { id } = useParams();
    const [fetchIdData, setFetchIdData] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const resp = await fetch(`https://reqres.in/api/users/${id}`)
                const data = await resp.json();
                if (!resp.ok) throw new Error("Invalid Data");
                setFetchIdData(data?.data);
            } catch (err) {
                console.log("Err", err);
            }

        }
        fetchDetails()
    }, [id])
    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!fetchIdData?.first_name || !fetchIdData?.last_name || !fetchIdData?.email) return toast.error("Please fill all the fields")
        if (!fetchIdData) return;
        try {
            const response = await fetch(`https://reqres.in/api/users/${fetchIdData?.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: fetchIdData?.first_name,
                    last_name: fetchIdData.last_name,
                    email: fetchIdData?.email,
                }),
            });
            if (!response.ok) throw new Error("Failed to update user");

            const updatedData = await response.json();
            const updatedUsers = userData.map((user) =>
                user.id === fetchIdData.id ? { ...user, ...updatedData } : user
            );

            toast.success("Updates Successfully, wait 3 seconds you will redirect to home page");
            dispatch(setUsers(updatedUsers))
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (err) {
            console.log("error update", err)
        }
    }

    return (
        <div>

            <div className='relative w-[80vw] '>
                <div>
                    <div className='text-center  mb-[2rem] flex items-center justify-start ml-[2rem] gap-[1rem]'>
                        <Link to={`/`}>
                            <svg style={{ color: 'white', marginBottom: "0.5rem", marginTop: "1rem" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <p className='text-[20px] lg:text-[25px] text-center font-bold text-white ' style={{ marginTop: '1rem' }}>Edit Details</p>
                    </div>
                </div>
                <div className=' flex flex-col gap-5 items-center justify-center text-center'>
                    <Stack
                        component="form"
                        sx={{ width: '25vw', minWidth: '60vw' }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-controlled"
                            size="small"
                            InputProps={{
                                style: { color: "white" }
                            }}
                            value={fetchIdData?.first_name}
                            onChange={(e) => {
                                setFetchIdData((prev) => ({
                                    ...prev,
                                    first_name: e.target.value
                                }))
                            }}

                        />
                        <TextField
                            id="filled-hidden-label-normal"
                            InputProps={{
                                style: { color: "white" }
                            }}
                            size="small"
                            value={fetchIdData?.last_name}
                            onChange={(e) => {
                                setFetchIdData((prev) => ({
                                    ...prev,
                                    last_name: e.target.value
                                }))
                            }}

                        />
                        <TextField
                            id="filled-hidden-label-normal"
                            InputProps={{
                                style: { color: "white" }
                            }}
                            size="small"
                            value={fetchIdData?.email}
                            onChange={(e) => {
                                setFetchIdData((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            }}

                        />
                        <button class='btn btn-primary' onClick={handleUpdate}>Update Details</button>
                    </Stack>
                </div>
            </div>
            <ToastContainer />

        </div>
    )
}

export default Edit
