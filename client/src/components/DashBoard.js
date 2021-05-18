import { useQuery, gql } from "@apollo/client";
import React from "react";
import styles from "../styles/dashboard.module.css";
import Chat from "./Chat";
import { useMessage } from "../contexts/MessageProvider";
import Messages from "./Message";
import IconButtons from "./UI/IconButtons";

const GET_USERS = gql`
  query allUsers {
    getUsers {
      id
      username
      email
      createdAt
      imageUrl
      latestMessage {
        uuid
        content
        from
        to
        createdAt
      }
    }
  }
`;

function DashBoard() {
  const { loading, data, error } = useQuery(GET_USERS);

  const { messages } = useMessage();

  let users;

  if (error) {
    console.error(error);
  }

  if (!data || loading) {
    users = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    users = <h2>No users foumd.</h2>;
  } else if (data.getUsers.length > 0) {
    users = data.getUsers;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.gridContainer}>
        <div className={styles.col1}>
          <div className={styles.headerLeft}>
            <h2>Chats</h2>
            <IconButtons />
          </div>
          <ul>
            {data && users.map((user) => <Chat key={user.id} user={user} />)}
          </ul>
        </div>
        <div className={styles.col2}>
          <Messages messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
