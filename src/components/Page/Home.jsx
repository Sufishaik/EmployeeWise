import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Modal from 'react-modal';
import axios from 'axios';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
function Home() {
    const [details, setDetails] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editDetails, setEditDetails] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        email: ''
    })
    const checkAuth = () => {
        const token = localStorage.getItem("authToken");

        if (!token) {

            navigate("/login");
            return toast.error("token experied")
        }
    };
    const fetchDetails = async () => {
        const resp = await fetch('https://reqres.in/api/users?page=1', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        })
        const data = await resp.json();
        if (resp.ok) {
            setDetails(data?.data)

        } else {
            return console.error("Invalid Data")
        }
    }
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setEditDetails({})
        setIsOpen(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()


        try {
            const res = await axios.put(`https://reqres.in/api/users/${editDetails?.id}`, {
                first_name: editDetails?.first_name,
                last_name: editDetails?.last_name,
                email: editDetails?.email,
            });

            toast.success("Updates Successfully")
            console.log("update", setDetails((prevDetails) =>
                prevDetails.map((user) =>
                    user.id === editDetails.id ? { ...user, ...res.data } : user
                )
            ))
            setDetails((prevDetails) =>
                prevDetails.map((user) =>
                    user.id === editDetails.id ? { ...user, ...res.data } : user
                )
            );
            fetchDetails();
            closeModal()
        } catch (err) {
            console.log("error update", err)
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        setDetails(details.filter((user) => user.id !== id));
        toast.success("Deleted Successfully")

    };
    useEffect(() => {
        checkAuth();
        fetchDetails()
    }, [setDetails]);
    return (
        <>
            <div >
                <div >
                    <table class="table" style={{ marginTop: "5rem" }}>
                        <thead className=''>
                            <tr className=''>
                                <th scope="" className='w-[5vw]'>Sr.no</th>
                                <th scope="" className='w-[20vw]'>Profile</th>
                                <th scope="" className='w-[20vw]'>First</th>
                                <th scope="" className='w-[20vw]'>Last</th>
                                <th scope="" className='w-[20vw]'>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.map?.((item, id) => {
                                    return (
                                        <>
                                            <tr className='' key={id}>
                                                <th scope="row">{item?.id}</th>
                                                <td><img src={item?.avatar} className='w-[50px] h-[50px] rounded-[2rem]' alt="" /></td>
                                                <td>{item?.first_name}</td>
                                                <td>{item?.last_name}</td>
                                                <td>
                                                    <div className='flex gap-2 cursor-pointer'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                                            setEditDetails({
                                                                id: item?.id,
                                                                first_name: item?.first_name,
                                                                last_name: item?.last_name,
                                                                email: item?.email
                                                            })

                                                            openModal()
                                                        }} width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                        </svg>
                                                        <svg onClick={() => {

                                                            handleDelete(item?.id)
                                                        }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>

                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={modalIsOpen}

                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='relative w-[80vw]'>
                        <div>

                            <div className='text-center mb-[2rem] flex items-center justify-between'>
                                <p className='text-[25px] text-center font-bold'>Edit Details</p>
                                <svg className='mb-7' onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="56" height="36" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className=' flex flex-col gap-5 items-center justify-center text-center'>
                            <Stack
                                component="form"
                                sx={{ width: '55ch' }}
                                spacing={2}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="outlined-controlled"
                                    label="First Name"
                                    size="small"
                                    value={editDetails?.first_name}
                                    onChange={(e) => {
                                        setEditDetails((prev) => ({
                                            ...prev,
                                            first_name: e.target.value
                                        }))
                                    }}
                                />
                                <TextField
                                    id="filled-hidden-label-normal"
                                    label="Last Name"
                                    size="small"
                                    value={editDetails?.last_name}
                                    onChange={(e) => {
                                        setEditDetails((prev) => ({
                                            ...prev,
                                            last_name: e.target.value
                                        }))
                                    }}
                                />
                                <TextField
                                    id="filled-hidden-label-normal"
                                    label="Email"
                                    size="small"
                                    value={editDetails?.email}
                                    onChange={(e) => {
                                        setEditDetails((prev) => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }}
                                />
                                <button class='btn btn-primary' onClick={handleUpdate}>Update Details</button>
                            </Stack>
                        </div>
                    </div>
                </Modal>
            </div>
            <ToastContainer />

        </>
    )
}

export default Home
