import React, { useContext } from 'react'
import TaskContext from '../contexts/taskContext'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '../styles'

function DeleteModal({ isOpen, onClose, submitText, task }) {
  const { handleDeleteTask } = useContext(TaskContext)

  function handleDeleteSubmit(e) {
    e.preventDefault()
    handleDeleteTask(task.id)
  }

  return (
    <Dialog
      sx={styles.root}
      open={isOpen}
      component="form"
      onSubmit={handleDeleteSubmit}
    >
      <DialogContent>
        <CloseIcon
          sx={{
            padding: '2px',
            position: 'absolute',
            top: '-2px',
            right: '0',
            cursor: 'pointer',
          }}
          onClick={onClose}
        />
        <DialogActions>
          <Button variant="contained" type="submit">
            {submitText}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteModal
