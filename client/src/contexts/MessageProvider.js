import React, { createContext, useContext, useReducer, useState } from "react";

const initialState = {
  messages: null,
};

const actionTypes = {
  SET_MESSAGES: "SET_MESSAGES",
  ADD_MESSAGES: "ADD_MESSAGES",
};

const AuthContext = createContext({
  messages: null,
  selectedUser: null,
  setMessages: () => {},
  setSelectedUser: () => {},
  addMessage: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case actionTypes.ADD_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export const useMessage = () => useContext(AuthContext);

function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectedUser, setSelectedUser] = useState(null);
  const [from, setFrom] = useState(null);

  const setMessages = (arg) => {
    dispatch({
      type: actionTypes.SET_MESSAGES,
      payload: arg,
    });
  };

  const addMessage = (arg) => {
    dispatch({
      type: actionTypes.ADD_MESSAGES,
      payload: arg,
    });
  };

  const value = {
    messages: state.messages,
    setMessages,
    selectedUser,
    setSelectedUser,
    from,
    setFrom,
    addMessage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default MessageProvider;
