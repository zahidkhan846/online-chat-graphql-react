import React from "react";
import { useMessage } from "../contexts/MessageProvider";
import { useUser } from "../contexts/UserProvider";
import styles from "../styles/message.module.css";
import moment from "moment";

function Message(props) {
  const { currentUser } = useUser();
  const { from } = useMessage();

  const me = props.message.from === currentUser.email;

  return (
    <li className={styles.li}>
      <div className={`${styles.message} ${me ? styles.myMessage : ""}`}>
        <p className={styles.content}>{props.message.content}</p>
        <div className={styles.info}>
          <p className={styles.time}>
            {moment(props.message.createdAt).startOf("minuts").fromNow()}
          </p>
          <p className={styles.username}>{me ? "Me" : from}</p>
        </div>
      </div>
    </li>
  );
}

export default Message;
