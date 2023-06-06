import React, { useContext } from 'react';
import TaskContext from '../contexts/taskContext';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { styleBox } from './App';

function EditeModal({
 onClose,
 isOpen,
 submitText,
 modalText,
 setModalText,
 task,
}) {
 const { handleEditeTask } = useContext(TaskContext);

 function handleEditeSubmit(e) {
  e.preventDefault();
  handleEditeTask(task.id, modalText);
 }
 return (
  <Modal open={isOpen}>
   <Box sx={styleBox} component="form" onSubmit={handleEditeSubmit}>
    <CloseIcon sx={{ alignSelf: 'end' }} onClick={onClose} />
    <TextField
     variant="standard"
     required
     id="edite-modal"
     value={modalText}
     onChange={(e) => setModalText(e.target.value)}
    />
    <ButtonGroup disableElevation variant="contained">
     <Button sx={{ width: '100%' }} type="submit">
      {submitText}
     </Button>
     <Button sx={{ width: '100%' }} onClick={onClose}>
      {'Отмена'}
     </Button>
    </ButtonGroup>
   </Box>
  </Modal>
 );
}
export default EditeModal;
