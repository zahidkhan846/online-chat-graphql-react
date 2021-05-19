import { gql } from "@apollo/client";

export const GET_USERS = gql`
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

export const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      content
      uuid
      from
      to
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query singleUser {
    getUser {
      username
      email
      createdAt
      imageUrl
    }
  }
`;
