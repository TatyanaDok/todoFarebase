import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { styleBox } from './App';
const styleButton = {
 marginTop: 1,
 bgcolor: 'black',
};
function AddTaskModal({ isOpen, onClose, onAddTask, submitText }) {
 const [isInput, setIsInput] = useState('');
 function handleNewTask(e) {
  setIsInput(e.target.value);
 }
 function handleAddSubmit(e) {
  e.preventDefault();
  onAddTask(isInput);
 }

 useEffect(() => {
  setIsInput('');
 }, [isOpen]);
 return (
  <Modal open={isOpen}>
   <Box sx={styleBox} component="form" onSubmit={handleAddSubmit}>
    <CloseIcon sx={{ alignSelf: 'end' }} onClick={onClose} />
    <TextField
     variant="standard"
     required
     id="add-modal"
     onChange={handleNewTask}
     value={isInput}
     placeholder="Введите текст"
    />
    <Button
     sx={styleButton}
     variant="contained"
     type="submit"
     disabled={!isInput.length}
    >
     {submitText}
    </Button>
   </Box>
  </Modal>
 );
}
export default AddTaskModal;
