import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styles } from '../styles'

function AddTaskModal({ isOpen, onClose, onAddTask, submitText, isLoading }) {
  const [isInput, setIsInput] = useState('')
  const isInputEmpty = isInput.trim() === ''
  useEffect(() => {
    setIsInput('')
  }, [isOpen])

  function handleNewTask(e) {
    setIsInput(e.target.value)
  }
  function handleAddSubmit(e) {
    e.preventDefault()
    onAddTask(isInput)
  }

  return (
    <Dialog
      open={isOpen}
      component="form"
      onSubmit={handleAddSubmit}
      sx={styles.root}
    >
      <DialogContent>
        <CloseIcon
          sx={{ alignSelf: 'end', cursor: 'pointer' }}
          onClick={onClose}
        />
        <TextField
          variant="standard"
          required
          id="add-modal"
          onChange={handleNewTask}
          value={isInput}
          placeholder="Введите текст"
        />
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            disabled={!isInput.length || isLoading || isInputEmpty}
          >
            {submitText}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
export default AddTaskModal
