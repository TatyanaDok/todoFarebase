import React, { useContext } from 'react';
import TaskContext from '../contexts/taskContext';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

import { styleBox } from './App';
function DeleteModal({ isOpen, onClose, submitText, task }) {
 const { handleDeleteTask } = useContext(TaskContext);

 function handleDeleteSubmit(e) {
  e.preventDefault();
  handleDeleteTask(task.id);
 }

 return (
  <Modal open={isOpen}>
   <Box sx={styleBox} component="form" onSubmit={handleDeleteSubmit}>
    <CloseIcon sx={{ alignSelf: 'end' }} onClick={onClose} />
    <Button variant="contained" type="submit">
     {submitText}
    </Button>
   </Box>
  </Modal>
 );
}
export default DeleteModal;
