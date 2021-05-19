import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({
  currentUser: null,
  setUser: (data) => {},
});
export const useUser = () => useContext(UserContext);

function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState();

  const setUser = (data) => {
    setCurrentUser(data);
  };

  const value = {
    currentUser,
    setUser,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
