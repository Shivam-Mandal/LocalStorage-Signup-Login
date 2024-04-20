import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';

const Welcome = () => {
    const navigate = useNavigate();
    const {userData,setUser} = useContext(UserDataContext)
    
    
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        setUser(null)
        navigate('/Login');
    };
    useEffect(()=>{
        const loggedInUser = localStorage.getItem('loggedInUser')
        if(loggedInUser){
            const parsedData = JSON.parse(loggedInUser)
            setUser(parsedData)
        }
        else{
            navigate('/Login')
        }
    },[])
    if (!userData) {
        return <div className="">Loading...</div>;
    }

    const { name, email, password } = userData;
    return (
        <>
            <h2 className='text-gray-50 text-3xl'>Welcome to the Home page <span className='font-semibold'>{name}</span></h2>
            <p className='text-gray-50 mt-2'>Your email : <span className='font-medium'> {email}</span></p>
            <button className='text-white border-white border mt-4 p-2 rounded-lg' onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Welcome;
