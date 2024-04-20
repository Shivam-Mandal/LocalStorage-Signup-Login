import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = ({showAlert}) => {
    console.log(showAlert)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value}));

    };
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        if (formData.name.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '' && formData.cpassword === formData.password) {
            let newUserData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            };
            let existingUserData = localStorage.getItem('user');
            existingUserData = existingUserData ? JSON.parse(existingUserData) : []; 
            const findEmail = existingUserData.find((userEmail)=>userEmail.email===formData.email)
            if(findEmail){
                showAlert('Email already exist','warning');
                return;
            }
            // Create a new array with all user data
            let updatedUserData = [...existingUserData, newUserData];
        
            // Store the updated data in local storage
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            showAlert("signup successful", "success")
            setFormData({
                name: '',
                email: '',
                password: '',
                cpassword: ''
            })
                navigate('/Login')
        
        }
        else if(formData.password.trim() !==formData.cpassword.trim()){
            showAlert("password not matched", 'error')
        }
        else {
            showAlert("enter all the fields", "error")
        }

        console.log(formData)

    }
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/Login')
    }
    const handleClickHome=()=>{
        navigate('/')
    }
    return (
        <>
            <div className="flex items-center justify-center max-h-screen">
            <button onClick={handleClickHome} className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Home</button>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">Signup Form</h1>
                    <form onSubmit={handleSignupSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="flex text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your name"
                                // required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="flex text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your email"
                                // required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="flex text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your password"
                                // required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="flex text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="cpassword"
                                name="cpassword"
                                value={formData.cpassword}
                                onChange={handleChange}

                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your password"
                                // required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                        <button onClick={handleLogin} className='mt-3'>Already have an account? <span className='font-semibold'>Login</span></button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup;