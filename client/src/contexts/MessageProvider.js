import React, { createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();
export const useMessage = () => useContext(AuthContext);

const actionTypes = {
  SET_USERS: "SET_USERS",
  SELECTED_USER: "SELECTED_USER",
  SET_USER_MESSAGES: "SET_USER_MESSAGES",
  ADD_NEW_USER_MESSAGE: "ADD_NEW_USER_MESSAGE",
};

const initialState = {
  users: null,
  selectedUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case actionTypes.SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case actionTypes.SET_USER_MESSAGES:
      const { email, messages } = action.payload;

      let newSelectedUser = { ...state.selectedUser };

      if (email === newSelectedUser.email) {
        newSelectedUser = { ...newSelectedUser, messages };
      }

      return {
        ...state,
        selectedUser: newSelectedUser,
      };

    case actionTypes.ADD_NEW_USER_MESSAGE:
      let updatedUserMessage = { ...state.selectedUser };

      if (action.payload.email === updatedUserMessage.email) {
        updatedUserMessage = {
          ...updatedUserMessage,
          messages: [action.payload.message, ...updatedUserMessage.messages],
        };
      }
      return {
        ...state,
        selectedUser: updatedUserMessage,
      };

    default:
      return state;
  }
};

function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [from, setFrom] = useState(null);

  const setUsers = (users) => {
    dispatch({
      type: actionTypes.SET_USERS,
      payload: users,
    });
  };

  const setSelectedUser = (currentUser) => {
    dispatch({
      type: actionTypes.SELECTED_USER,
      payload: currentUser,
    });
  };

  const setUserMessages = (user, messages) => {
    dispatch({
      type: actionTypes.SET_USER_MESSAGES,
      payload: {
        email: user,
        messages: messages,
      },
    });
  };

  const addNewUserMessage = (user, message) => {
    dispatch({
      type: actionTypes.ADD_NEW_USER_MESSAGE,
      payload: {
        email: user,
        message: message,
      },
    });
  };

  const value = {
    setSelectedUser,
    from,
    setFrom,
    setUsers,
    users: state.users,
    setUserMessages,
    addNewUserMessage,
    selectedUser: state.selectedUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default MessageProvider;
