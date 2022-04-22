import { memo, useCallback, useEffect, useState, Fragment } from 'react'
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
import swal from 'sweetalert2'

import { getRequest, acceptStatus, rejectStatus } from 'api'

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

const Request = memo(function Request() {
  const [rows, setRows] = useState<RequestDorayaki[]>([])

  const get = useCallback(
    () =>
      getRequest().then((response) => {
        setRows(response)
      }),
    []
  )
  const acceptRequest = useCallback(
    (id: number) => {
      acceptStatus(id)
        .then(() => get())
        .then(() =>
          swal.fire({
            icon: 'success',
            text: 'Status berhasil diubah!',
          })
        )
    },
    [get]
  )

  const rejectRequest = useCallback(
    (id: number) => {
      rejectStatus(id)
        .then(() => get())
        .then(() =>
          swal.fire({
            icon: 'success',
            text: 'Status berhasil diubah',
          })
        )
    },
    [get]
  )

  useEffect(() => {
    get()
  }, [get])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID Request</StyledTableCell>
            <StyledTableCell align="center">IP Address</StyledTableCell>
            <StyledTableCell align="center">Endpoint</StyledTableCell>
            <StyledTableCell align="center">ID Dorayaki</StyledTableCell>
            <StyledTableCell align="center">Jumlah Request</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Waktu Request</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.ip}</StyledTableCell>
              <StyledTableCell align="center">{row.endpoint}</StyledTableCell>
              <StyledTableCell align="center">
                {row.id_dorayaki}
              </StyledTableCell>
              <StyledTableCell align="center">{row.stok}</StyledTableCell>
              <StyledTableCell align="center">{row.username}</StyledTableCell>
              <StyledTableCell align="center">
                {new Date(row.timestamp).toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell>
                {row.status === 'WAITING' ? (
                  <Fragment>
                    <Button
                      variant="outlined"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(0,200,0,0.3)',
                      }}
                      onClick={() => acceptRequest(row.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(200,0,0,0.3)',
                      }}
                      onClick={() => rejectRequest(row.id)}
                    >
                      Reject
                    </Button>
                  </Fragment>
                ) : null}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export default Request
