import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"

const Login = () => {
  const navigate = useNavigate();

  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (empId !== "" && password !== "") {
      try {
        console.log(empId,password)
        const res = await axios.post(
          `http://localhost:5000/emp/login`,
          {
            empId,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res.status)
        console.log(res.data.token);
        if (res.status === 200) {
          document.cookie = `token=${res.data.token}`;  
          
          console.log(document.cookie)

          const decodedToken = jwtDecode(res.data.token);
          console.log(decodedToken);

          if (decodedToken.role === "admin") {
            navigate("/Admin"); // Redirect to admin page
          } else if (decodedToken.role !== 'admin') {
            navigate(`/Employee/${decodedToken.empId}`); // Redirect to employee page with ID
          } else {
            navigate("/"); // Redirect to home if role is unknown
          }  
        } else if (res.status === 401) {
          setError("Incorrect password");
        }
      } catch (err) {
        console.log(err.message);
        setError("Login failed. Please try again.");
      }
    } else {
      setError("Fill in the credentials properly.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center p-6 w-full max-w-md">
        <h2 className="text-black mb-6 text-2xl sm:text-3xl font-medium text-center">
          Log In
        </h2>
        {error && <p className="error text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm sm:text-base">
              empId
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="empId"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Log In
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/Signup")}
              >
                Signup
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
