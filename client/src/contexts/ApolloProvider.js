import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider as Provider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>;
}

export default ApolloProvider;
