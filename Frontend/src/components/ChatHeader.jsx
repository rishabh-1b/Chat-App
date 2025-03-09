import { useSocketContext } from "../context/SocketContext";

function ChatHeader({ selectedUser, setSelectedUser }) {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b flex items-center">
      <button className="sm:hidden mr-3" onClick={() => setSelectedUser(null)}>🔙</button>
      <img
        src={selectedUser.profilePic}
        alt="avatar"
        className="w-11 h-11 rounded-full"
      />
      <div className="ml-3">
        <span className="font-semibold text-[15px]">{selectedUser.username}</span>
        <p className={`text-sm ${isOnline ? "text-blue-500" : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}

export default ChatHeader;
