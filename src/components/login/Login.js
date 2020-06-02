import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { authenticate } from "../../redux/actions/authenticationActions";
import { toast } from "react-toastify";

const Login = ({ authenticate, history }) => {
  const [user, setUser] = useState({ Username: "", Password: "" });
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const Login = () => {
    authenticate(user).then((result) => {
      if (result === "ok") {
        toast.success("Login Successful");
        history.push("/movies");
      } else {
        toast.error("Login Failed");
      }
    });
  };
  return (
    <Container className="justify-content-md-center mt-5">
      <Row>
        <Col></Col>
        <Col>
          <Container style={{ backgroundColor: "rgba(230, 230, 230,0.4)" }}>
            <TextField
              label="Username"
              name="Username"
              onChange={onChange}
              className="m-2 "
            />
            <br />
            <TextField
              label="Password"
              name="Password"
              type="password"
              onChange={onChange}
              className="m-2 "
            />
            <br />
            <Button
              onClick={() => Login()}
              className="btn btn-primar m-2"
              size="lg"
            >
              Login
            </Button>
          </Container>
        </Col>

        <Col></Col>
      </Row>
    </Container>
  );
};

const mapDispatchToProps = {
  authenticate,
};

export default connect(null, mapDispatchToProps)(Login);
