export const styles = {
  root: {
    '& .MuiDialog-paper': {
      overflow: 'hidden',
      width: '90vw',
      maxWidth: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      margin: 0,
      padding: 0,
    },

    '& .MuiInputBase-input-MuiInput': {
      with: '100%',
    },
    '& .MuiDialogContent-root ': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiDialogActions-root': {
      padding: 0,
      display: 'contents',
      position: 'relative',
    },
    '& .MuiButtonBase-root': {
      with: '100%',
    },
  },
}
