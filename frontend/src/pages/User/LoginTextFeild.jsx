import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginTextFeild = () => {
  const navigate = useNavigate();
  const [RFID, setRFID] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (RFID !== "") {
      try {
        console.log(RFID);
        const res = await axios.post(
          `http://localhost:5000/emp/login`,
          {
            "empId":RFID
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res.status);
        console.log(res.data.token);
        if (res.status === 200) {
          document.cookie = `token=${res.data.token}`;
          console.log(document.cookie);

          const decodedToken = jwtDecode(res.data.token);
          console.log("decoded",decodedToken);

          if (decodedToken.role === "Manager") {
            navigate("/Admin"); // Redirect to admin page
          } else {
            navigate(`/Employee/${decodedToken.empId}`); // Redirect to employee page with ID
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
        <form className="w-full" onSubmit={handleLogin}> {/* Attach handleLogin to form submission */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm sm:text-base">
              empId
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md "
              placeholder="empId"
              autoFocus
              value={RFID}
              onChange={(e) => setRFID(e.target.value)}
            />
          </div>
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
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Log In</button> {/* Add a submit button */}
        </form>
      </div>
    </div>
  );
};

export default LoginTextFeild;
