import React from "react";
import { Button } from "react-bootstrap";
import {
  TextField,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

const AddUser = ({ user, onChange, handleSave }) => {
  const permissions = [
    "View Subscriptions",
    "Create Subscriptions",
    "Delete Subscriptions",
    "Update Subscriptions",
    "View Movies",
    "Create Movies",
    "Delete Movies",
    "Update Movies",
  ];

  function GetFormattedDate(date) {
    var Time = new Date(date);
    var month = Time.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    var day = Time.getDate();
    day = day > 9 ? day : `0${day}`;
    var year = Time.getFullYear();
    return `${year}-${month}-${day}`;
  }
  return (
    <form className="m-3" onSubmit={handleSave}>
      <TextField
        label="Username"
        name="username"
        value={user.username}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <TextField
        label="Frist Name"
        name="firstName"
        value={user.firstName}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <TextField
        label="Last Name"
        name="lastName"
        value={user.lastName}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <TextField
        label="Session Timeout"
        name="session"
        value={user.session}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <InputLabel id="mutiple-checkbox">Permissions</InputLabel>
      <Select
        labelId="mutiple-checkbox"
        id="mutiple-checkbox"
        name="permissions"
        multiple
        value={user.permissions}
        onChange={onChange}
        input={<Input />}
        renderValue={(selected) => selected.join(", ")}
        className="m-2"
        style={{ width: 250 }}
      >
        {permissions.map((perm) => (
          <MenuItem key={perm} value={perm}>
            <Checkbox checked={user.permissions.indexOf(perm) > -1} />
            <ListItemText primary={perm} />
          </MenuItem>
        ))}
      </Select>
      <br />

      <br />
      <TextField
        id="date"
        label="Created On"
        name="createdOn"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className="m-2"
        onChange={onChange}
        value={GetFormattedDate(user.createdOn)}
      />
      <br />
      <Button type="submit" className="btn btn-primar m-2" size="lg">
        Save
      </Button>
    </form>
  );
};

export default AddUser;
