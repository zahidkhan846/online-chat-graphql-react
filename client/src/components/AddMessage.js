import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import styles from "../styles/addMessage.module.css";
import { useMutation } from "@apollo/client";
import { useMessage } from "../contexts/MessageProvider";
import { ADD_MESSAGE } from "../utils/GraphqlQuery";

function AddMessage({ selectedUser: to }) {
  const { addMessage } = useMessage();

  const [getMessages] = useMutation(ADD_MESSAGE, {
    onCompleted: (data) => addMessage(data.sendMessage),
    onError: (err) => console.log(err),
  });

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!to) {
      return;
    }

    if (content.trim === "") {
      return;
    }

    getMessages({ variables: { to, content } });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addMessage}>
      <input
        type="text"
        placeholder="Type your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <IconButton type="submit" className={styles.addMessageIcon}>
        <SendIcon />
      </IconButton>
    </form>
  );
}

export default AddMessage;
