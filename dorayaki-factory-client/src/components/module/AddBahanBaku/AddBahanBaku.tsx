import {
  memo,
  useState,
  ChangeEventHandler,
  useCallback,
  MouseEventHandler,
  useEffect,
} from 'react'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import swal from 'sweetalert2'

import { Modal } from 'components/base'
import { createBahanBaku } from 'api'

type AddBahanBakuProps = {
  open: boolean
  closeModal: () => void
}

export const AddBahanBaku = memo(function AddBahanBaku({
  open,
  closeModal,
}: AddBahanBakuProps) {
  const [quantity, setQuantity] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    setQuantity(0)
    setName('')
  }, [open])

  const onNameChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const onQuantityChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback((e) => {
    setQuantity(parseInt(e.target.value))
  }, [])

  const onSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    // validasi
    if (quantity <= 0) {
      swal.fire({
        icon: 'error',
        text: 'Kuantitas harus bilangan positif',
      })
      return
    }
    if (!name) {
      swal.fire({
        icon: 'error',
        text: 'Nama bahan tidak boleh kosong',
      })
      return
    }
    createBahanBaku(name, quantity).then(() => {
      swal.fire({
        icon: 'success',
        text: 'You successfully created an ingredient',
      })
      closeModal()
    })
    // POST ke API
  }, [name, quantity, closeModal])

  return (
    <Modal title="Tambah Bahan Baku" open={open} closeModal={closeModal}>
      <Box
        component="form"
        className="mb-4"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Box
          component="div"
          sx={{ display: 'flex', flexDirection: 'column' }}
          className="mr-6"
        >
          <Typography variant="body1" component="p">
            Bahan baku
          </Typography>
          <FormControl margin="dense" sx={{ flexDirection: 'row' }}>
            <TextField
              label="Nama bahan"
              placeholder="Nama bahan"
              value={name}
              onChange={onNameChange}
            />
          </FormControl>
        </Box>
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" component="p">
            Kuantitas
          </Typography>
          <FormControl margin="dense" sx={{ flexDirection: 'row' }}>
            <TextField
              fullWidth
              type="number"
              value={quantity ? quantity : ''}
              placeholder="Kuantitas"
              label="Kuantitas"
              onChange={onQuantityChange}
            />
          </FormControl>
        </Box>
      </Box>
      <Button
        fullWidth
        component="button"
        variant="contained"
        onClick={onSubmit}
      >
        SUBMIT
      </Button>
    </Modal>
  )
})
