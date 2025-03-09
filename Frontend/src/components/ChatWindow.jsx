import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import useFetchMessages from "../hooks/useFetchMessages";

function ChatWindow({ selectedUser, setSelectedUser }) {
  const [messages,setMessages] = useFetchMessages(selectedUser);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <MessagesList selectedUser={selectedUser} messages={messages}/>
      <MessageInput selectedUser={selectedUser} setMessages={setMessages}/>
    </div>
  );
}

export default ChatWindow;
