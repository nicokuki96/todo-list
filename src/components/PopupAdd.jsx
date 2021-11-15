import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";

function PopupAdd(props) {
  const {
    error,
    setPrecio,
    isOpen,
    onClickClose,
    idSelected,
    isEdit,
    setNombre,
    nombre,
    precio,
    onSubmit,
    endEdit,
  } = props;

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEdit ? "Editar Producto" : "Agregar producto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Edite y guarde el form"
              : "Complete el siguiente formulario"}
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            value={nombre}
            autoFocus
            margin="normal"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
          />
          {error != null ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <div></div>
          )}
          <TextField
            onChange={(e) => {
              setPrecio(e.target.value);
            }}
            value={precio}
            margin="normal"
            id="precio"
            label="Precio"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={isEdit ? endEdit : onSubmit} color="primary">
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupAdd;
