import { React, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Button from "@mui/material/Button";
import uuid from "react-uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";

const TableUI = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [edit, setAEdit] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSeleccionado, setUserSeleccionado] = useState("");
  const [showError, setShowError] = useState(false);

  const addRow = () => {
    if (age < 0 || !age || !name || !surname) {
      setShowError(true);
    } else {
      const newUser = {
        key: uuid(),
        name: name,
        surname: surname,
        age: age,
      };
      setUsers([...users, newUser]);
      setName("");
      setSurname("");
      setAge("");
      setShowError(false);
    }
  };

  const deleteRow = (idSelected) => {
    const newArray = users.filter((item) => item.key !== idSelected);
    setUsers(newArray);
    console.log(users);
  };

  const editRow = (item) => {
    // const userIndex = users.findIndex((item) => item.key === key);
    // const user = users[userIndex];
    const { key, name, surname, age } = item;
    setName(name);
    setSurname(surname);
    setAge(age);
    setAEdit(true);
    setUserSeleccionado(key);
  };

  const saveRow = () => {
    if (age < 0 || !age || !name || !surname) {
      setShowError(true);
    } else {
      const update = users.map((item) => {
        if (item.key === userSeleccionado) {
          return { key: item.key, name, surname, age };
        } else {
          return item;
        }
      });
      setAEdit(false);
      setUsers(update);
      setUserSeleccionado("");
      setName("");
      setSurname("");
      setAge("");
      setShowError(false);
    }
  };

  return (
    <div className="tableUI">
      <Container fixed>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {edit ? (
                    <Button
                      id="btnSave"
                      onClick={() => {
                        saveRow();
                      }}
                      variant="contained"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button id="btnAdd" onClick={addRow} variant="contained">
                      <AddCircleOutlinedIcon />
                    </Button>
                  )}
                  {showError && (
                    <Alert severity="error" sx={{ m: 2 }}>
                      The fields must be complete and the age must be greater
                      than 0
                    </Alert>
                  )}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    label={"Name"}
                    variant="standard"
                    value={name}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    id="surname"
                    label={"Surname"}
                    variant="standard"
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    id="age"
                    label={"Age"}
                    variant="standard"
                    type="number"
                  />
                </TableCell>
              </TableRow>
              {users.map((item) => (
                <TableRow key={item.key}>
                  <TableCell>{item.key}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.surname}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell className="btnConfig">
                    <Button
                      id="btnDelete"
                      onClick={() => deleteRow(item.key)}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      id="btnEdit"
                      onClick={() => editRow(item)}
                      color="success"
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default TableUI;
