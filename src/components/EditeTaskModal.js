import React, { useContext } from 'react'
import TaskContext from '../contexts/taskContext'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styles } from '../styles'

function EditeModal({
  onClose,
  isOpen,
  submitText,
  modalText,
  setModalText,
  task,
}) {
  const { handleEditeTask } = useContext(TaskContext)

  function handleEditeSubmit(e) {
    e.preventDefault()
    handleEditeTask(task.id, modalText)
  }

  return (
    <Dialog
      sx={styles.root}
      open={isOpen}
      component="form"
      onSubmit={handleEditeSubmit}
    >
      <DialogContent>
        <CloseIcon
          sx={{ alignSelf: 'end', cursor: 'pointer' }}
          onClick={onClose}
        />
        <TextField
          variant="standard"
          required
          id="edite-modal"
          value={modalText}
          onChange={(e) => setModalText(e.target.value)}
        />
        <DialogActions>
          <ButtonGroup disableElevation variant="contained">
            <Button sx={{ width: '100%' }} type="submit">
              {submitText}
            </Button>
            <Button sx={{ width: '100%' }} onClick={onClose}>
              {'Отмена'}
            </Button>
          </ButtonGroup>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
export default EditeModal
