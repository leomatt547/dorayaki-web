import { memo, useCallback, useEffect, useState } from 'react'
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
} from '@mui/material'

import { UpdateBahanBaku } from 'components/module'
import { getBahanBaku } from 'api'

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

const Bahan = memo(function Bahan() {
  const [updateBahan, setUpdateBahan] = useState(false)
  const [nama, setNamaBahan] = useState('')
  const [id, setIdBahan] = useState(0)
  const [rows, setRows] = useState<BahanBaku[]>([])

  const toggleBahanBaku = useCallback(
    (name: string, id: number) => {
      setUpdateBahan(!updateBahan)
      setNamaBahan(name)
      setIdBahan(id)
    },
    [updateBahan]
  )

  useEffect(() => {
    getBahanBaku().then((response) => {
      setRows(response)
    })
  }, [updateBahan])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID Bahan</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Stok</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.nama}</StyledTableCell>
                <StyledTableCell align="center">{row.stok}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="outlined"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(0,200,0,0.3)',
                    }}
                    onClick={() => {
                      toggleBahanBaku(row.nama, row.id)
                    }}
                  >
                    Edit Stok
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateBahanBaku
        id={id}
        name={nama}
        open={updateBahan}
        closeModal={() => toggleBahanBaku(nama, id)}
      />
    </>
  )
})

export default Bahan
