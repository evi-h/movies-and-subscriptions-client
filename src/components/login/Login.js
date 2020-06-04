import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import {
  authenticate,
  savePassword,
} from "../../redux/actions/authenticationActions";
import { toast } from "react-toastify";

const Login = ({ authenticate, savePassword, history }) => {
  const [user, setUser] = useState({ Username: "", Password: "" });
  const [password, setPassword] = useState({ password: "" });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(id, value);
    setPassword(() => ({ [id]: value }));
  };
  const createPassword = () => {
    savePassword(user).then((result) => {
      console.log(result);
      if (result === "ok") {
        toast.success("Password Created Successfully");
        history.push("/movies");
      } else {
        toast.error("Saving Password Failed");
      }
    });
  };

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
      } else if (result === "password") {
        handleClickOpen();
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to the Movies CMS!
            <br />
            Please set your new Password
          </DialogContentText>
          <TextField
            autoFocus
            onChange={onChange}
            margin="dense"
            id="password"
            name="Password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createPassword} color="primary">
            Create Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const mapDispatchToProps = {
  authenticate,
  savePassword,
};

export default connect(null, mapDispatchToProps)(Login);
