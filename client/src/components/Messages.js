import React from "react";
import { useMessage } from "../contexts/MessageProvider";
import styles from "../styles/messages.module.css";
import Message from "./Message";

function Messages({ error, loading }) {
  const { messages } = useMessage();

  if (error) console.log(error);

  let selectedChatMessages;

  if (!messages && !loading) {
    selectedChatMessages = <li>Select a chat to view the messages.</li>;
  } else if (loading) {
    selectedChatMessages = <li>Loading...</li>;
  } else if (messages.length > 0) {
    selectedChatMessages = messages.map((message) => {
      console.log(message);
      return <Message key={message.uuid} message={message} />;
    });
  } else if (messages.length === 0) {
    selectedChatMessages = <li>Your messages will appear here.</li>;
  }
  return <ul className={styles.messagesList}>{selectedChatMessages}</ul>;
}

export default Messages;
