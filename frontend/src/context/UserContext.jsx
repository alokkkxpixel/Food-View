// context/UserContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);

  // ✅ memoize user so reference is stable
  const value = useMemo(() => ({ userData, setUserData }), [userData?._id]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
