import axios from 'axios';

function useSendMessage() {

  const sendMessage = async (selectedUser, message, setMessages) => {
    try {
      const response = await axios.post(`http://localhost:5000/message/send/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );
      setMessages((messages)=>[...messages,response.data.newMessage]);
    } catch (error) {
      console.log(`Error occurred while sending the message: ${error.message}`);
    }
  }

  return [sendMessage];
}

export default useSendMessage;