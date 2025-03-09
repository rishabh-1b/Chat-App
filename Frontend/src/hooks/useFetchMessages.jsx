import axios from "axios";
import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";

function useFetchMessages(selectedUser) {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocketContext();

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/message/get/${selectedUser._id}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.log(`Error occurred while fetching the conversation: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    })
    return () => {
      socket.off("newMessage");
    }
  }, [socket, selectedUser]);

  return [messages,setMessages];
}

export default useFetchMessages;