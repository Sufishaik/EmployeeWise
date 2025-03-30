import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { setUsers } from '../../store/UseSlice';

function Home() {

    const navigate = useNavigate()
    const hasFetched = useRef(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);

    const checkAuth = () => {
        const token = localStorage.getItem("authToken");

        if (!token) {

            navigate("/login");
            return toast.error("token experied")
        }
    };
    const logout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
        toast.success("Logged out successfully");
    };

    const fetchDetails = async (page) => {
        const resp = await fetch(`https://reqres.in/api/users?page=${page}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        })
        const data = await resp.json();
        if (resp.ok) {
            dispatch(setUsers(data?.data))
            setTotalPages(data.total_pages);
        } else {
            return console.error("Invalid Data")
        }
    }

    const handleDelete = async (id) => {
        await axios.delete(`https://reqres.in/api/users/${id}`);
        const updatedUsers = userData.filter((user) => user.id !== id);
        dispatch(setUsers(updatedUsers));
        toast.success("Deleted Successfully")
    };

    useEffect(() => {
        fetchDetails(currentPage);
    }, [currentPage])

    useEffect(() => {
        checkAuth();
    }, []);
    return (
        <>
            <div className='relative'>
                <div className='overflow-hidden max-w-[85vw] mx-auto' >
                    <div className='flex items-center justify-center absolute top-5 left-5  md:right-0 lg:right-0'>

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[90vw] max-w-[50vw] bg-white text-gray-900 border border-gray-300 px-4 py-2 rounded-full shadow-md focus:ring-2 focus:ring-purple-400 mb-4"
                        />
                    </div>
                    <div className='flex items-center justify-center absolute top-5  right-[1rem] lg:right-[8rem]'>
                        <button onClick={logout} className="bg-red-500 text-white p-2 rounded flex ">
                            Logout
                        </button>
                    </div>
                    <table class="table" style={{ marginTop: "5rem" }}>
                        <thead className=''>
                            <tr className=''>
                                <th scope="" className='w-[5vw]'>Sr.no</th>
                                <th scope="" className='w-[20vw]'>Profile</th>
                                <th scope="" className='w-[20vw]'>First</th>
                                <th scope="" className='w-[20vw]'>Last</th>
                                <th scope="" className='w-[20vw]'>Email</th>
                                <th scope="" className='w-[20vw]'>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData
                                    ?.filter((user) => user.first_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    ?.map?.((item, id) => {
                                        return (
                                            <>
                                                <tr className='' key={id}>
                                                    <th scope="row">{item?.id}</th>
                                                    <td><img src={item?.avatar} className='w-[50px] h-[50px] rounded-[2rem]' alt="" /></td>
                                                    <td>{item?.first_name}</td>
                                                    <td>{item?.last_name}</td>
                                                    <td>{item?.email}</td>
                                                    <td>
                                                        <div className='flex gap-2 cursor-pointer'>
                                                            <Link to={`/edit/${item?.id}`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {

                                                                }} width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                                </svg>
                                                            </Link>
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
                    <div className="flex justify-center items-center mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 mx-2 bg-gray-800 hover:bg-gray-700 text-white rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 mx-2 bg-gray-800 hover:bg-gray-700 text-white rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
            <ToastContainer />

        </>
    )
}

export default Home
