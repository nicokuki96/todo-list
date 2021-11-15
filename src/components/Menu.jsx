import React, { useState } from "react";
import PopupAdd from "./PopupAdd";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import uniqid from "uniqid";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  deleteButton: {
    marginRight: "10px",
  },
}));

function BottomAppBar(props) {
  const [nombre, setNombre] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [lista, setLista] = React.useState([]);
  const [isEdit, setIsedit] = useState(false);
  const [idSelected, setIdselected] = useState(null);
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El nombre esta vacio");
      return;
    }
    const nuevoItem = {
      id: uniqid(),
      tituloNombre: nombre,
      tituloPrecio: precio,
    };
    setLista([...lista, nuevoItem]);
    setNombre("");
    setPrecio("");
    setError(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsedit(false);
    setNombre("");
    setPrecio("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickEdit = (item) => {
    const { id, tituloNombre, tituloPrecio } = item;
    setOpen(true);
    setIsedit(true);
    setIdselected(id);
    setNombre(tituloNombre);
    setPrecio(tituloPrecio);
  };

  const endEdit = () => {
    const nuevaLista = lista.map((item) => {
      if (item.id == idSelected)
        return {
          id: item.id,
          tituloNombre: nombre,
          tituloPrecio: precio,
        };
      else {
        return item;
      }
    });
    setLista(nuevaLista);
  };

  const borrar = (id) => {
    const nuevoArray = lista.filter((item) => item.id !== id);
    setLista(nuevoArray);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
        <PopupAdd
          isOpen={open}
          onClickClose={handleClose}
          onSubmit={onSubmit}
          isEdit={isEdit}
          idSelected={idSelected}
          nombre={nombre}
          precio={precio}
          setNombre={setNombre}
          setPrecio={setPrecio}
          lista={lista}
          error={error}
          endEdit={endEdit}
        />
        <List className={classes.list}>
          {lista.map((item) => (
            <React.Fragment key={item.id}>
              {item.id === 1 && (
                <ListSubheader className={classes.subheader}>Hoy</ListSubheader>
              )}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.tituloNombre}
                  secondary={item.tituloPrecio}
                />
                <Button
                  className={classes.deleteButton}
                  onClick={() => {
                    borrar(item.id);
                  }}
                  variant="contained"
                  color="secondary"
                >
                  <DeleteIcon />
                </Button>
                <Button
                  onClick={() => {
                    onClickEdit(item);
                  }}
                  variant="contained"
                >
                  <EditIcon />
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Fab
            color="secondary"
            onClick={handleClickOpen}
            aria-label="add"
            className={classes.fabButton}
          >
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default BottomAppBar;
