import { Box, Typography } from '@mui/material'
import { memo, useEffect, useState } from 'react'

import { CardDorayaki } from 'components/module'
import { getDorayaki } from 'api'

const Resep = memo(function Resep() {
  const [dorayaki, setDorayaki] = useState<Dorayaki[]>([])

  useEffect(() => {
    getDorayaki()
      .then((dorayaki) => setDorayaki(dorayaki))
      .catch(() => setDorayaki([]))
  }, [])

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" component="h5" sx={{ textAlign: 'center' }}>
        Resep Dorayaki
      </Typography>
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
        {dorayaki.map((dorayaki) => (
          <CardDorayaki key={dorayaki.id} resep={dorayaki} />
        ))}
      </Box>
    </Box>
  )
})

export default Resep
