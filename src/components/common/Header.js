import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { logout } from "../../redux/actions/authenticationActions";

const Header = ({ logout, authenticaiton }) => {
  const activeStyle = { color: "#f15b2a" };

  const username = authenticaiton ? authenticaiton.username : null;

  const logoutUser = () => {
    logout();
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand style={{ color: "black" }} href="/">
        Movies And Subscriptions CMS
      </Navbar.Brand>
      <Nav className="mr-auto" style={{ color: "white" }}>
        <NavLink
          to="/"
          style={{ color: "white" }}
          activeStyle={activeStyle}
          exact
        >
          Movies
        </NavLink>
        {" | "}
        <NavLink
          to="/subscriptions"
          style={{ color: "white" }}
          activeStyle={activeStyle}
          exact
        >
          Subscription
        </NavLink>

        {username === "admin" && (
          <>
            {" | "}
            <NavLink
              to="/users"
              style={{ color: "white" }}
              activeStyle={activeStyle}
              exact
            >
              Users
            </NavLink>
          </>
        )}
      </Nav>
      {authenticaiton && (
        <Button onClick={() => logoutUser()} variant="outline-light">
          Logout
        </Button>
      )}
    </Navbar>
  );
};

function mapStateToProps(state) {
  return {
    authenticaiton: state.authentication,
  };
}

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
