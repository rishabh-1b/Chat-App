import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

function HomePage() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="flex h-screen">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      {selectedUser ? (
        <ChatWindow selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      ) : (
        <div className="bg-gray-50 flex-1 hidden sm:flex items-center justify-center text-slate-500 text-lg">Select a chat to start messaging</div>
      )}
    </div>
  )
}

export default HomePage;