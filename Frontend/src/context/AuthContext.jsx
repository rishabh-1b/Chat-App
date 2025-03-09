import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () =>  {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/user/getUser",
        { withCredentials: true }
      );
      setAuthUser(response.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Error occurred while fetching the user: ${error.message}`);
    }
  };

  useEffect(
    () => { fetchUser() }, []
  )
  return <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
    {children}
  </AuthContext.Provider>
}