import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material'

import { getResep } from 'api'
import { Loading } from 'components/base'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const ResepDetail = memo(function ResepDetail() {
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(true)
  const [dorayaki, setDorayaki] = useState<Dorayaki | null>(null)
  const [resep, setResep] = useState<
    { bahanBaku: BahanBaku; jumlah: number }[]
  >([])

  useEffect(() => {
    getResep(parseInt(id))
      .then((recipe) => {
        setResep(recipe ? recipe.bahan : [])
        setDorayaki(
          recipe
            ? { id: recipe.id, nama: recipe.nama, photo: recipe.photo }
            : null
        )
      })
      .catch(() => {
        setResep([])
        setDorayaki(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    console.log(resep, dorayaki)
  }, [resep, dorayaki])

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography variant="h3" component="h5" sx={{ textAlign: 'center' }}>
            {dorayaki ? dorayaki.nama : 'Dorayaki tidak ada :('}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <Box sx={{ display: 'flex', alignSelf: 'center' }}>
              {dorayaki && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    whiteSpace: 'nowrap',
                    overflowX: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={dorayaki.photo}
                    sx={{ width: '400px', height: '400px' }}
                  />
                </Box>
              )}
            </Box>
            <Box component="div" sx={{ display: 'flex', width: '400px' }}>
              <TableContainer component={Paper} sx={{ display: 'flex' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Nama</StyledTableCell>
                      <StyledTableCell align="center">Jumlah</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resep.map((resep) => (
                      <TableRow key={resep.bahanBaku.id}>
                        <StyledTableCell align="center">
                          {resep.bahanBaku.nama}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {resep.jumlah}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
})

export default ResepDetail
