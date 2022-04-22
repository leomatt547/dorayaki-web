import { ReactNode, memo } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'

type ModalProps = {
  open: boolean
  children: ReactNode
  closeModal: () => void
  title: string
}

export const Modal = memo(function Modal({
  open,
  children,
  closeModal,
  title,
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      keepMounted={false}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
      }}
      scroll="body"
    >
      <DialogTitle
        id="modal-modal-title"
        className="text-center"
        sx={{ fontWeight: 600 }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
          padding: '20px',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
})
