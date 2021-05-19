import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ApolloProvider from "./contexts/ApolloProvider";
import AuthProvider from "./contexts/AuthProvider";
import MessageProvider from "./contexts/MessageProvider";
import UserProvider from "./contexts/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <MessageProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </MessageProvider>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
