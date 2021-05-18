import { useLazyQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useMessage } from "../contexts/MessageProvider";
import styles from "../styles/chat.module.css";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      content
    }
  }
`;

function Chat({ user }) {
  const [selectedUser, setSelectedUser] = useState();
  const [errors, setErrors] = useState();

  const { setMessages } = useMessage();

  const [getMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
    onCompleted: (data) => {
      setMessages(data.getMessages);
    },
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessages]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errors) {
    return (
      <ul>
        {Object.values(errors).map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    );
  }

  return (
    <li className={styles.chatList} onClick={() => setSelectedUser(user.email)}>
      <div className={styles.image}>
        <img src={user.imageUrl} alt={user.username} />
      </div>
      <div className={styles.chatInfo}>
        <h3>{user.username}</h3>
        <p>{user.latestMessage.content}</p>
      </div>
    </li>
  );
}

export default Chat;
