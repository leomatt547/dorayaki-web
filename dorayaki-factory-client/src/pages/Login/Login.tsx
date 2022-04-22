import {
  ChangeEventHandler,
  MouseEventHandler,
  memo,
  useCallback,
  useState,
} from 'react'
import { useHistory } from 'react-router'
import { TextField, FormControl, Box, Button } from '@mui/material'

import { login } from 'api'
import { useUpdateUser } from 'context'

const Login = memo(function Landing() {
  const history = useHistory()
  const updateUser = useUpdateUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEmail(e.target.value)
    },
    []
  )

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setPassword(e.target.value)
    },
    []
  )

  const onSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    login(email, password)
      .then(() => updateUser())
      .then(() => history.push('/'))
  }, [history, email, password, updateUser])

  return (
    <div className="flex w-full h-full items-center justify-center self-center justify-self-center">
      <img
        src="logo512.png"
        className="absolute"
        style={{ zIndex: -1 }}
        alt=""
      />
      <Box
        component="form"
        sx={{
          bgcolor: 'common.white',
          flexDirection: 'column',
          display: 'flex',
          padding: '8px',
          paddingTop: '4px',
          borderRadius: '8px',
        }}
      >
        <FormControl margin="dense">
          <TextField
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            onChange={onChangeEmail}
            value={email}
          />
        </FormControl>
        <FormControl margin="dense">
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            onChange={onChangePassword}
            value={password}
          />
        </FormControl>
        <FormControl margin="dense">
          <Button
            fullWidth
            component="button"
            variant="contained"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </div>
  )
})

export default Login
