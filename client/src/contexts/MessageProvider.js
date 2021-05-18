import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  messages: null,
});

export const useMessage = () => useContext(AuthContext);

function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const value = {
    messages,
    setMessages,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default MessageProvider;
