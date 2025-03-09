import { useState } from "react";
import { Link } from "react-router-dom";
import { BsChatSquareText } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useAuthContext();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const response = await axios.post("http://localhost:5000/user/login",
        { identifier, password },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setAuthUser(response.data.user);
      setIdentifier("");
      setPassword("");
    }
    catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="hidden sm:flex flex-col items-center justify-center w-1/2 bg-blue-500 text-white">
        <BsChatSquareText className="text-6xl mb-4" />
        <h1 className="text-3xl font-bold">Chat App</h1>
      </div>

      <div className="flex flex-1 items-center justify-center px-2">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <input
              type="text"
              name="usernameOrEmail"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Username or Email"
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded-md"
              required
            />

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
