import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  messages: null,
  selectedUser: null,
  setMessages: () => {},
  setSelectedUser: () => {},
});

export const useMessage = () => useContext(AuthContext);

function MessageProvider({ children }) {
  const [messages, setMessages] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [from, setFrom] = useState(null);

  const value = {
    messages,
    setMessages,
    selectedUser,
    setSelectedUser,
    from,
    setFrom,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default MessageProvider;
