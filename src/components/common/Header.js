import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#f15b2a" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Movies
      </NavLink>
      {" | "}
      <NavLink to="/subscriptions" activeStyle={activeStyle} exact>
        Subscription
      </NavLink>
      {" | "}
      <NavLink to="/users" activeStyle={activeStyle} exact>
        Users
      </NavLink>
    </nav>
  );
};

export default Header;
