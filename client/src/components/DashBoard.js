import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styles from "../styles/dashboard.module.css";
import Chat from "./Chat";
import { useMessage } from "../contexts/MessageProvider";
import Messages from "./Messages";
import IconButtons from "./UI/IconButtons";
import { GET_MESSAGES, GET_USERS } from "../utils/GraphqlQuery";

function DashBoard() {
  const { setMessages, selectedUser } = useMessage();

  const [messageError, setMessageError] = useState();

  const [getMessages, { loading: messageLoading }] = useLazyQuery(
    GET_MESSAGES,
    {
      onCompleted: (data) => {
        setMessages(data.getMessages);
      },
      onError: (err) => setMessageError(err),
    }
  );

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser, getMessages]);

  const { loading, data, error } = useQuery(GET_USERS);

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
            <h2 className={styles.heading}>Chats</h2>
            <div className={styles.headerIcons}>
              <IconButtons />
            </div>
          </div>
          <ul>
            {data && users.map((user) => <Chat key={user.id} user={user} />)}
          </ul>
        </div>
        <div className={styles.col2}>
          <Messages loading={messageLoading} error={messageError} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
