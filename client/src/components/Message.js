import React from "react";
import styles from "../styles/message.module.css";
import moment from "moment";
import { useAuth } from "../contexts/AuthProvider";

function Message(props) {
  const { user } = useAuth();

  const me = props.message.from === user.email;

  return (
    <li className={styles.li}>
      <div className={`${styles.message} ${me ? styles.myMessage : ""}`}>
        <p className={styles.content}>{props.message.content}</p>
        <div className={styles.info}>
          <p className={styles.time}>
            {moment(props.message.createdAt).startOf("minuts").fromNow()}
          </p>
          <p className={styles.username}>{me ? "Me" : props.createdBy}</p>
        </div>
      </div>
    </li>
  );
}

export default Message;
