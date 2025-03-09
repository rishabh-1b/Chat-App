import { useEffect, useRef } from "react";

function MessagesList({ selectedUser, messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar p-4 space-y-3 bg-gray-50">
      {messages.map((msg) => (
        <div key={msg._id} className={`flex ${msg.sender !== selectedUser._id ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[70%] px-3 py-2 rounded-lg shadow-md ${msg.sender !== selectedUser._id ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 rounded-bl-none"}`}
            style={{
              wordWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap"
            }}
          >
            <p>{msg.message}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default MessagesList;
