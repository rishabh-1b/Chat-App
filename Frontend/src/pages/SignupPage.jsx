import { useState } from "react";
import { BsChatSquareText } from "react-icons/bs";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("")

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const response = await axios.post("http://localhost:5000/user/signup",
        { fullName, username: username.toLowerCase(), email, password, confirmPassword, gender },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setGender("");
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
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-2 border rounded-md"
              required
            />
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                Female
              </label>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
