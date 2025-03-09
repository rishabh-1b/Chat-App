import axios from "axios";

function useLogout() 
{
  const logout = async () => {
    try {
      await axios.post(
        `http://localhost:5000/user/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(`Error occurred while logout the user: ${error.message}`);
    }
  }

  return [logout];
}

export default useLogout;