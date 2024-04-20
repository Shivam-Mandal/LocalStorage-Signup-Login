import React, { useContext, useEffect, useState } from 'react';
import Welcome from './Welcome';
import { Link,useNavigate } from 'react-router-dom';
import UserDataContext from '../context/UserDataContext';

const Login = ({ showAlert }) => {
    const navigate = useNavigate();
    const { userData, setUser } = useContext(UserDataContext)
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };
    useEffect(() => {

        const savedData = localStorage.getItem('user');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const foundData = parsedData.find(user => user.email === loginFormData.email && user.password === loginFormData.password);
          if (foundData) {
            setUser(foundData);
            console.log(foundData);
          }
        }
    }, [loginFormData])

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginFormData.email.trim() === '' || loginFormData.password.trim() === '') {
            showAlert('enter all credentials', 'error')
        }
        else if (userData) {
            // const savedData = localStorage.getItem('user');
            // const parsedData = JSON.parse(savedData);
            // const foundData = parsedData.find(user => user.email === loginFormData.email && user.password === loginFormData.password);
            // setUser(foundData)
            console.log(userData);
            localStorage.setItem('loggedInUser', JSON.stringify(userData))
            showAlert("login successful", "success");
            navigate('/Welcome');
        }
        else {
            showAlert("invalid credentials", "error");
        }

    };

    const handleReturnSignup = () => {
        navigate('/Signup');
    };

    const handleClickHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center max-h-screen">
            <button onClick={handleClickHome} className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Home</button>
            <div className="bg-white p-8 rounded-lg shadow-lg w-80 items-center">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="flex text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={loginFormData.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-slate-500 focus:border-transparent rounded-md shadow-sm"
                            placeholder='Enter email address'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="flex text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginFormData.password}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border border-slate-500 focus:border-transparent rounded-md shadow-sm"
                            placeholder='Enter password'
                        />
                    </div>
                    <button type="submit" className="w-full mb-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
                    <Link to="/ForgetPassword">Forget Password</Link>
                    <button type="submit" className="" onClick={handleReturnSignup}>Not register? <span className='font-semibold'>Signup</span></button>
                </form>
                {/* {isLogin && <Welcome found={found} />} */}

            </div>
        </div>
    );
};

export default Login;
