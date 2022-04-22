import {
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  styled,
} from '@mui/material'
import {
  ChangeEvent,
  ChangeEventHandler,
  memo,
  useEffect,
  useCallback,
  useState,
  MouseEventHandler,
  useMemo,
} from 'react'
import swal from 'sweetalert2'
import { BsXLg } from 'react-icons/bs'

import { Dropdown, Modal } from 'components/base'
import { addToResep, createDorayaki, getBahanBaku } from 'api'

const Input = styled('input')({
  display: 'none',
})

type AddRecipeProps = {
  open: boolean
  closeModal: () => void
}

export const AddRecipe = memo(function AddRecipe({
  open,
  closeModal,
}: AddRecipeProps) {
  const [allBahan, setAllBahan] = useState<BahanBaku[]>([])

  const [recipes, setRecipes] = useState([0])

  const [nama, setNama] = useState('')
  const [image, setImage] = useState<File | null>(null)
  /**
   * Ini ntar ikutin type bahan baku yang didapet dari RestAPI
   */
  const [bahanBaku, setBahanBaku] = useState<(BahanBaku | null)[]>([null])
  const [jumlah, setJumlah] = useState<number[]>([0])

  useEffect(() => {
    if (!open) {
      setRecipes([0])
      setJumlah([0])
      setNama('')
      setImage(null)
    }
    getBahanBaku()
      .then((bahan) => {
        setAllBahan(bahan)
        setBahanBaku([bahan[0]])
      })
      .catch(() => setAllBahan([]))
  }, [open])

  const dropdownItems = useMemo(
    () =>
      allBahan.map((b) => ({
        label: b.nama,
        value: b,
      })),
    [allBahan]
  )

  const onChangeNama: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNama(e.target.value)
    },
    []
  )

  const onChangeImage: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setImage(e.target.files ? e.target.files[0] : null)
    },
    []
  )

  const onChangeStok = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      setJumlah(
        jumlah.map((pemakaian, i) =>
          i === index ? parseInt(e.target.value) : pemakaian
        )
      )
    },
    [jumlah]
  )

  const addMoreItems = useCallback(
    (index) => {
      if (index === recipes.length - 1) {
        setBahanBaku(bahanBaku.concat(allBahan[0]))
        setJumlah(jumlah.concat(0))
        setRecipes(recipes.concat(recipes[recipes.length - 1] + 1))
      }
    },
    [bahanBaku, jumlah, recipes, allBahan]
  )

  const onChangeDropdown = useCallback(
    (bahan: BahanBaku, index: number) => {
      setBahanBaku(bahanBaku.map((b, i) => (index === i ? bahan : b)))
    },
    [bahanBaku]
  )

  const removeItem = useCallback(
    (index) => {
      setBahanBaku(bahanBaku.filter((_, i) => i !== index))
      setJumlah(jumlah.filter((_, i) => i !== index))
      setRecipes(recipes.filter((_, i) => i !== index))
    },
    [bahanBaku, jumlah, recipes]
  )

  const onSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (!nama) {
      swal.fire({
        icon: 'error',
        text: 'Nama tidak boleh kosong',
      })
      return
    }
    if (!image) {
      swal.fire({
        icon: 'error',
        text: 'Harus ada gambar',
      })
      return
    }
    for (const stok of jumlah.slice(0, -1)) {
      if (stok <= 0) {
        swal.fire({
          icon: 'error',
          text: 'Bahan baku harus dipakai setidaknya 1 buah',
        })
        return
      }
    }
    const bahanBakuChoice = bahanBaku.slice(0, -1)
    for (let i = 0; i < bahanBakuChoice.length; i++) {
      const barang = bahanBakuChoice[i]

      if (
        bahanBakuChoice.find(
          (b, index) => (b && barang ? b.id === barang.id : true) && i !== index
        )
      ) {
        swal.fire({
          icon: 'error',
          text: 'Tidak boleh terdapat bahan baku yang duplikat',
        })
        return
      }
    }
    createDorayaki(nama, image)
      .then((dorayaki) => {
        return Promise.all(
          jumlah.map((s, i) => {
            const bahan = bahanBaku[i]
            return addToResep(
              dorayaki ? dorayaki.id : 0,
              bahan ? bahan.id : 0,
              s
            )
          })
        )
      })
      .then(() =>
        swal.fire({
          icon: 'success',
          text: 'Anda telah membuat sebuah resep dorayaki baru',
        })
      )
  }, [nama, image, jumlah, bahanBaku])

  return (
    <Modal open={open} title="Tambah Resep Dorayaki" closeModal={closeModal}>
      <Box component="form">
        <FormControl fullWidth margin="dense">
          <TextField
            fullWidth
            label="Nama"
            placeholder="Nama"
            onChange={onChangeNama}
            value={nama}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <Input
            accept="image/*"
            type="file"
            onChange={onChangeImage}
            sx={{ display: 'flex', width: '240px' }}
          />
        </FormControl>
        <Box
          component="div"
          className="mt-4"
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
            {recipes.map((seq, i) => (
              <Dropdown
                key={`DDRecipe-${seq}`}
                items={dropdownItems}
                onChange={(index) => onChangeDropdown(index, i)}
                label="Bahan"
                onFocus={() => addMoreItems(i)}
              />
            ))}
          </Box>
          <Box
            component="div"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="body1" component="p">
              Quantity
            </Typography>
            {recipes.map((_, i, self) => (
              <FormControl
                key={`TFRecipe-${i}`}
                margin="dense"
                sx={{ flexDirection: 'row' }}
              >
                <TextField
                  fullWidth
                  type="number"
                  value={jumlah[i] ? jumlah[i] : ''}
                  onChange={(e) => onChangeStok(e, i)}
                  placeholder="Pemakaian"
                  label="Pemakaian"
                  onFocus={() => addMoreItems(i)}
                />
                {i < self.length - 1 && (
                  <Button
                    variant="contained"
                    sx={{
                      display: 'flex',
                      alignSelf: 'center',
                      justifySelf: 'center',
                      width: 'auto',
                      height: 'auto',
                      padding: '8px',
                      minWidth: 'auto',
                      marginLeft: '24px',
                      bgcolor: 'error.main',
                      color: 'common.white',
                    }}
                    onClick={() => removeItem(i)}
                  >
                    <BsXLg />
                  </Button>
                )}
              </FormControl>
            ))}
          </Box>
        </Box>
        <FormControl fullWidth margin="dense">
          <Button variant="contained" component="button" onClick={onSubmit}>
            Submit
          </Button>
        </FormControl>
      </Box>
    </Modal>
  )
})
