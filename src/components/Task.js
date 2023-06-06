import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
function Task({ task, deleteClick, editeClick }) {
 const handleModalEditeOpen = () => {
  editeClick(task);
 };

 const handleModalDeleteOpen = () => {
  deleteClick(task);
 };

 const [isHovering, setIsHovering] = useState(false);

 const handleMouseEnter = () => {
  setIsHovering(true);
 };

 const handleMouseLeave = () => {
  setIsHovering(false);
 };

 return (
  <TableBody>
   <TableRow>
    <TableCell sx={{ textAlign: 'center' }}>
     {task.id.substring(1, 5)}
    </TableCell>
    <TableCell
     sx={{ textAlign: 'center', whiteSpace: 'normal', wordBreak: 'break-word' }}
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
    >
     {task.text}
     {isHovering && (
      <CreateIcon
       sx={{ marginLeft: '10px', position: 'absolute' }}
       fontSize="small"
       onClick={() => handleModalEditeOpen(task)}
      />
     )}
    </TableCell>
    <TableCell sx={{ textAlign: 'center' }}>
     {new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
     })}
    </TableCell>
    <TableCell sx={{ textAlign: 'center' }}>
     <DeleteIcon onClick={() => handleModalDeleteOpen(task)} />
    </TableCell>
   </TableRow>
  </TableBody>
 );
}
export default Task;
