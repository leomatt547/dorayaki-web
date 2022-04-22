import { Fragment, memo, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab, Box } from '@mui/material'

import { FaBook, FaListUl } from 'react-icons/fa'
import { BsPlusLg } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

import { logout } from 'api'
import { useUser, useUpdateUser } from 'context'
import { AddBahanBaku, AddRecipe } from 'components/module'

export const Navbar = memo(function Navbar() {
  const user = useUser()
  const updateUser = useUpdateUser()

  const [addRecipe, setAddRecipe] = useState(false)
  const [addBahan, setAddBahan] = useState(false)

  const logOut = useCallback(() => {
    logout()
    updateUser()
  }, [updateUser])

  const toggleBahan = useCallback(() => setAddBahan(!addBahan), [addBahan])
  const toggleRecipe = useCallback(() => setAddRecipe(!addRecipe), [addRecipe])
  if (!user.email && !user.nama) return <Fragment />

  return (
    <Fragment>
      <Tabs
        value={0}
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        className="w-full bg-yellow"
      >
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}
          className="w-full"
        >
          <Box sx={{ display: 'flex' }}>
            <Tab
              label="Request"
              icon={<FaListUl />}
              iconPosition="top"
              value="Request"
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                textAlign: 'center',
                '&:hover': { color: 'yellow' },
              }}
              className="h-16 flex text-center items-center justify-center p-4 duration-200 hover:bg-purple"
            />
            <Tab
              label="Resep"
              icon={<FaBook />}
              iconPosition="top"
              value="Resep"
              component={Link}
              to="/resep"
              sx={{
                display: 'flex',
                textAlign: 'center',
                '&:hover': { color: 'yellow' },
              }}
              className="h-16 flex text-center items-center justify-center p-4 duration-200 hover:bg-purple"
            />
            <Tab
              label="Bahan"
              icon={<FaListUl />}
              iconPosition="top"
              value="Bahan"
              component={Link}
              to="/bahan"
              sx={{
                display: 'flex',
                textAlign: 'center',
                '&:hover': { color: 'yellow' },
              }}
              className="h-16 flex text-center items-center justify-center p-4 duration-200 hover:bg-purple"
            />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Tab
              component="button"
              onClick={toggleRecipe}
              className="hover:text-yellow hover:bg-purple duration-200 h-full"
              label="Dorayaki"
              icon={<BsPlusLg />}
              iconPosition="top"
            />
            <Tab
              component="button"
              onClick={toggleBahan}
              className="hover:text-yellow hover:bg-purple duration-200 h-full"
              label="Bahan"
              icon={<BsPlusLg />}
              iconPosition="top"
            />
            <Tab
              component="button"
              onClick={logOut}
              className="hover:text-yellow hover:bg-purple duration-200 h-full"
              label="Logout"
              icon={<BiLogOut />}
              iconPosition="top"
            />
          </Box>
        </Box>
      </Tabs>
      <AddBahanBaku open={addBahan} closeModal={toggleBahan} />
      <AddRecipe open={addRecipe} closeModal={toggleRecipe} />
    </Fragment>
  )
})
