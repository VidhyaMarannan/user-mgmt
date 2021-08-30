import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "../store";
import { IUserModel } from "../model/users";
import User from "./user";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./App.css";

const Users: React.FC = () => {
  const { users, newUser } = useStoreState((state) => ({
    users: state.users.users,
    newUser: state.users.newUser,
  }));

  const [selectedUser, setSelectedUser] = useState(newUser);
  const [isNewUser, setIsNewUser] = useState(true);

  const { add, update } = useStoreActions((actions) => ({
    add: actions.users.add,
    update: actions.users.update,
  }));

  function addUpdateUser(user: IUserModel) {
    if (isNewUser) {
      add(user);
    } else {
      update(user);
      setSelectedUser(newUser);
      setIsNewUser(true);
    }
  }

  function onNameChange(e: any) {
    setSelectedUser((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  }

  function onAgeChange(e: any) {
    setSelectedUser((prevState) => ({
      ...prevState,
      age: e.target.value,
    }));
  }

  function onGenderChange(e: any) {
    setSelectedUser((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  }

  useEffect(() => {
    console.log("Selected user state changed");
  }, [selectedUser]);

  function findUserById(id: string) {
    const selectedUser = users.find((user) => user.id === id) || newUser;
    setSelectedUser(selectedUser);
    setIsNewUser(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h2>User List</h2>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Paper style={{ height: 500, width: 500 }}>
                <Typography variant="h4" style={{ padding: 10 }}>
                  Users
                </Typography>
                <div style={{ padding: 30 }}>
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                      </tr>
                    </thead>
                    {users.length > 0 ? (
                      users.map((mem) => (
                        <User key={mem.id} user={mem} callback={findUserById} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3}>No users</td>
                      </tr>
                    )}
                  </table>
                </div>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ height: 500, width: 500 }}>
                <Typography variant="h4" style={{ padding: 10 }}>
                  Add/Update User
                </Typography>

                <div>
                  <TextField
                    variant="filled"
                    label="name"
                    onChange={(e) => onNameChange(e)}
                    value={selectedUser.name}
                    className="text-padding"
                  />
                  <br />
                  <TextField
                    id="age"
                    label="age"
                    variant="filled"
                    className="text-padding"
                    onChange={(e) => onAgeChange(e)}
                    value={selectedUser.age}
                  />
                  <br />
                  <TextField
                    id="gender"
                    label="gender"
                    variant="filled"
                    className="text-padding"
                    onChange={(e) => onGenderChange(e)}
                    value={selectedUser.gender}
                  />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ padding: 10 }}
                    onClick={() => addUpdateUser(selectedUser)}
                  >
                    {isNewUser ? "Add" : "Update"}
                  </Button>
                  <span> </span>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ padding: 10 }}
                    onClick={() => setSelectedUser(newUser)}
                  >
                    Discard
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </header>

      {/* <AddUser user={selectedUserState} isNewUser={isNewUserState} /> */}
    </div>
  );
};

export default Users;
