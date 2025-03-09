import { useEffect, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import useSendMessage from "../hooks/useSendMessage";

function MessageInput({ selectedUser, setMessages}) {
  const [inputMessage, setInputMessage] = useState("");
  const [sendMessage] = useSendMessage();

  useEffect(() => {
    setInputMessage("");
  }, [selectedUser]);

  const handleOnSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(selectedUser, inputMessage, setMessages);
    setInputMessage("");
  }

  return (
    <form onSubmit={(e) => handleOnSendMessage(e)} className="p-2 bg-white border-t flex items-center gap-2">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 p-2 text-base outline-none"
      />
      {inputMessage.trim() && (
        <button type="submit" className="text-blue-500 p-2 hover:text-blue-600">
          <LuSendHorizontal size={26} />
        </button>
      )}
    </form>
  );
}

export default MessageInput;
