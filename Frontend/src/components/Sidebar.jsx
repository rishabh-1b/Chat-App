import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsChatSquareText, BsThreeDotsVertical } from "react-icons/bs";
import ShowUserProfile from "./ShowUserProfile";
import useFetchUsers from "../hooks/useFetchUsers";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";

function Sidebar({ selectedUser, setSelectedUser }) {
  const [users] = useFetchUsers();
  const [logout] = useLogout();
  const {setAuthUser} = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleOnLogout = () => {
    setAuthUser(null);
    logout();
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`bg-white border-r flex flex-col transition-all duration-300 ${!selectedUser ? "w-full sm:w-[22rem]" : "hidden sm:flex sm:w-[22rem]"}`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BsChatSquareText className="text-blue-500 w-9 h-9 pt-1" />
          <h1 className="text-2xl font-bold">Chat App</h1>
        </div>
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className={`p-2 rounded-lg hover:bg-gray-200 ${showDropdown && "bg-gray-200"}`}>
            <BsThreeDotsVertical className="text-gray-600 w-5 h-5" />
          </button>
          {showDropdown && (
            <div className="px-1 absolute right-0 top-10 w-40 bg-gray-50 shadow-md rounded-lg py-2 border z-50">
              <button className="w-full rounded-md px-3 py-1.5 text-left hover:bg-gray-200"
                onClick={() => { setShowDropdown(false); setShowUserProfile(true) }}>
                Show Profile
              </button>
              <button className="w-full rounded-md px-3 py-1.5 text-left text-red-500 hover:bg-gray-200" onClick={handleOnLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pt-1 pb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar">
        {filteredUsers.length === 0 ?
          <p className="h-full flex items-center justify-center text-lg text-slate-500">
            No user found
          </p>
          :
          filteredUsers.map((user) =>
            <div
              key={user._id}
              className={`flex items-center p-3 mx-3 mb-1 cursor-pointer rounded-md transition-colors ${selectedUser === user ? "bg-blue-400 text-white" : "hover:bg-blue-50"}`}
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.profilePic} alt="avatar" className="w-11 h-11 rounded-full" />
              <div className="ml-4">
                <span className="font-semibold text-[15px]">{user.username}</span>
                <p className={`text-sm ${selectedUser !== user && "text-slate-500"}`}>{user.fullName}</p>
              </div>
            </div>
          )
        }
      </div>
      {showUserProfile && <ShowUserProfile onClose={() => setShowUserProfile(false)} />}
    </div>
  );
}

export default Sidebar;
