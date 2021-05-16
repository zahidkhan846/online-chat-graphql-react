import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";

const GET_USERS = gql`
  query allUsers {
    getUsers {
      username
      email
    }
  }
`;

function DashBoard() {
  const { loading, data, error } = useQuery(GET_USERS);

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="container">
      <h1>Hello from Dashboard!</h1>
    </div>
  );
}

export default DashBoard;
