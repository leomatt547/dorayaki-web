import { memo } from 'react'

import { Box, CircularProgress } from '@mui/material'

export const Loading = memo(function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  )
})
