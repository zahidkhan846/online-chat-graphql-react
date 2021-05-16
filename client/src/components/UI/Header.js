import React from "react";
import { Link, NavLink } from "react-router-dom";
import TextsmsIcon from "@material-ui/icons/Textsms";
import { useAuth } from "../../contexts/AuthProvider";

function Header() {
  const { user, logoutAction } = useAuth();

  const activeClass = {
    color: "black",
  };

  return (
    <header>
      <nav>
        <h1>
          <TextsmsIcon />
          <span>CWZ Connect</span>
        </h1>
        <ul>
          {user && (
            <li>
              <NavLink activeStyle={activeClass} to="/" exact>
                Home
              </NavLink>
            </li>
          )}
          <li>
            {user ? (
              <button className="logout-btn" onClick={logoutAction}>
                Logout
              </button>
            ) : (
              <NavLink activeStyle={activeClass} to="/login">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
