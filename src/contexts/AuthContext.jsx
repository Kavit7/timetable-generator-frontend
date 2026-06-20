import { createContext, useState, useEffect } from "react";
import { loginUser } from "../services/loginUser";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    role: "",
    schoolId: "",
  });

  

  // decode token helper
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);

      return {
        role: decoded.role,
        schoolId: decoded.school_id,
      };
    } catch (err) {
      return { role: "", schoolId: "" };
    }
  };

  // load token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      setUserInfo(decodeToken(savedToken));
    }
  }, []);

  const login = async (data) => {
    const result = await loginUser(data);

    if (result.data.token) {
      setToken(result.data.token);
      localStorage.setItem("token", result.data.token);
      const decoded = decodeToken(result.data.token);
      setUserInfo(decoded);
    }
    return result;
  };

  const logout = () => {
    setToken(null);
    setUserInfo({ role: "", schoolId: "" });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role: userInfo.role,
        schoolId: userInfo.schoolId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
