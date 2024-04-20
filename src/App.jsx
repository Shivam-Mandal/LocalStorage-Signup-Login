import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome'
import Alert from './components/Alert'
import Home from './components/Home'
import UserState from './context/UserState'
import ForgetPassword from './components/ForgetPassword'

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (messge, type) => {
    setAlert({
      msg: messge,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  return (
    <>
      <UserState>
        <Router>
          <Alert alert={alert} />
          <div className="mt-8">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='Signup' element={<Signup showAlert={showAlert} />} />
              <Route exact path='Login' element={<Login showAlert={showAlert} />} />
              <Route exact path='Welcome' element={<Welcome showAlert={showAlert} />} />
              <Route exact path='ForgetPassword' element={<ForgetPassword showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </UserState>
      {/* <Login/> */}

    </>
  )
}

export default App
