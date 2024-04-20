import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ForgetPassword = ({ showAlert }) => {
  const [forget, setForget] = useState({ email: "" });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate()
  const savedData = localStorage.getItem("user");
  const parsed = savedData ? JSON.parse(savedData) : null;

  console.log("savedData:", savedData);
  console.log("parsed:", parsed);
  console.log("parsed.email:", parsed ? parsed.email : "N/A");

  const handleInputChange = (e) => {
    setForget({ email: e.target.value });
  };
  console.log(parsed)
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundData = parsed ? parsed.find((user) => user.email === forget.email) : null;
    if (foundData) {
      setShowChangePassword(true);
    } else {
      showAlert("Email not found. Please enter a valid email.", "error");
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const updatedUser = parsed.map((user) => {
      if (user.email === forget.email) {
        return { ...user, password: newPassword };
      }
      return user;
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    showAlert("Password changed successfully!", "success");
    navigate('/Login')

  };
  const handleClickHome=()=>{
    navigate('/')
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <button onClick={handleClickHome} className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Home</button>

        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <h1 className="text-2xl font-bold mb-6">Forget Password</h1>
          {!showChangePassword ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={forget.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your new password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Change Password
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
