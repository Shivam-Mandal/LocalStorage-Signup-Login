import React from 'react'
import {useNavigate} from 'react-router-dom'
const Home=()=>{
    const navigate = useNavigate();
    const handleSignup = ()=>{
        navigate('/Signup')
    }
    const handleLogin = ()=>{
        navigate('/Login')
    }
    return(
        <>
            <div className="text-white max-h-screen">
                <h1 className='text-5xl text-slate-500 font-semibold my-10'>Signup and Login based on LocalStorage</h1>
                <button onClick={handleSignup} className='border rounded-lg px-3 py-2 mx-2'>Signup</button>
                <button onClick={handleLogin} className='border rounded-lg px-3 py-2 mx-2'>Login</button>
            </div>
        </>
    )
}
export default Home;