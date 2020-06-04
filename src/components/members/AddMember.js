import React from "react";
import { Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";

const AddMember = ({ member, onChange, handleSave }) => {
  return (
    <form className="m-3" onSubmit={handleSave}>
      <TextField
        label="Name"
        name="Name"
        value={member.Name}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <TextField
        label="Email"
        name="Email"
        value={member.Email}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <TextField
        label="City"
        name="City"
        value={member.City}
        onChange={onChange}
        //variant="outlined"
        className="m-2"
      />
      <br />
      <Button type="submit" className="btn btn-primar m-2" size="lg">
        Save
      </Button>
    </form>
  );
};

export default AddMember;
