import React from "react";
import { Link, NavLink } from "react-router-dom";
import TextsmsIcon from "@material-ui/icons/Textsms";

function Header() {
  const activeClass = {
    color: "black",
  };

  return (
    <header>
      <nav>
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            color: "white",
            fontSize: "2rem",
          }}
        >
          <TextsmsIcon
            style={{
              fontSize: "2rem",
            }}
          />{" "}
          <span>CWZ Connect</span>
        </Link>
        <ul>
          <li>
            <NavLink activeStyle={activeClass} to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeClass} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
