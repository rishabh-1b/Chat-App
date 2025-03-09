import axios from "axios";
import { useEffect, useState } from "react"

function useFetchUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://chat-app-efwn.onrender.com/user/getAllUsers", {
          withCredentials: true,
        });
        setUsers(response.data.users);
      } catch (error) {
        console.log(`Error occurred while fetching all the users: ${error}`);
      }
    };
    fetchUsers();
  }, [])
  return [users];
}

export default useFetchUsers;
