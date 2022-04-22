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
import { updateBahanBaku } from 'api'
import { textAlign } from '@mui/system'

type UpdateBahanBakuProps = {
  open: boolean
  id: number
  name: string
  closeModal: () => void
}

export const UpdateBahanBaku = memo(function UpdateBahanBaku({
  open,
  id,
  name,
  closeModal,
}: UpdateBahanBakuProps) {
  const [quantity, setQuantity] = useState(0)
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)

  useEffect(() => {
    setQuantity(0)
  }, [open])

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
    setDisableSubmitBtn(true)
    updateBahanBaku(id, quantity).then((res) => {
      if (res) {
        swal.fire({
          icon: 'success',
          text: 'You successfully updated the ingredients',
        })
      } else {
        swal.fire({
          icon: 'error',
          text: 'Error sending your request',
        })
      }
      setDisableSubmitBtn(false)
      closeModal()
    })
    // POST ke API
  }, [id, quantity, closeModal])

  return (
    <Modal title="Update Bahan Baku" open={open} closeModal={closeModal}>
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
          <Typography variant="body1" component="p"></Typography>
          <FormControl
            margin="dense"
            sx={{ flexDirection: 'row' }}
          ></FormControl>
        </Box>
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" component="p">
            {name}
          </Typography>
          <FormControl
            margin="dense"
            sx={{ flexDirection: 'row', verticalAlign: 'center' }}
          >
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
        disabled={disableSubmitBtn}
      >
        SUBMIT
      </Button>
    </Modal>
  )
})
