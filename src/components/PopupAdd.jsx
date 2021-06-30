import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import uniqid from 'uniqid'

function PopupAdd(props) {

  const {onClickIngresar,isOpen,onClickClose} = props
  
  const [nombre, setNombre] = React.useState('');
  const [precio, setPrecio] = React.useState('');
  const [edicion, setEdicion] = React.useState(false);
  const [setId, Id] = React.useState('');
  const [error, setError] = React.useState(null);
  

  const onSubmit = (e) => {
    e.preventDefault()
    if(!nombre.trim()){
        setError('El nombre esta vacio')
        return
    }
    const nuevoItem={
      id:uniqid(),
      tituloNombre:nombre,
      tituloPrecio: precio
    }
    onClickIngresar(nuevoItem)
    setNombre('')
    setPrecio('')
    setError(null)
    
  }

  const editar = (item) =>{
    setEdicion(true)
    setNombre(item.tituloNombre)
    setId(item.id)
  }
  

  return (
    <div>
      <Dialog open={isOpen} onClose={onClickClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete el siguiente formulario
          </DialogContentText>
          <TextField
            onChange={(e)=>{setNombre(e.target.value)}}
            value={nombre}
            autoFocus
            margin="normal"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
          />
          {
            error != null ?
            (
              <Alert severity="error">
                {error}
              </Alert>
            )
            :
            (
              <div></div>
            )
          }
          <TextField
            onChange={(e)=>{setPrecio(e.target.value)}}
            value={precio}
            autoFocus
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
          <Button onClick={onSubmit} color="primary">
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupAdd
