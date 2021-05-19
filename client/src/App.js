import { useQuery } from "@apollo/client";
import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DashBoard from "./components/DashBoard";
import Header from "./components/UI/Header";
import { useAuth } from "./contexts/AuthProvider";
import { useUser } from "./contexts/UserProvider";
import { GET_USER } from "./utils/GraphqlQuery";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const { user } = useAuth();
  const { setUser } = useUser();

  const { data } = useQuery(GET_USER);

  useEffect(() => {
    if (user && data) {
      setUser(data.getUser);
    }
  }, [user, setUser, data]);

  return (
    <Fragment>
      <Header />
      <Switch>
        <PrivateRoute path="/" exact component={DashBoard} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Fragment>
  );
}

export default App;
