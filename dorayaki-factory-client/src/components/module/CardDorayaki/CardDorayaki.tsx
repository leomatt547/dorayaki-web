import { memo } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'

type ResepProps = {
  resep: Dorayaki
}

export const CardDorayaki = memo(function CardResep({ resep }: ResepProps) {
  return (
    <Card
      component={Link}
      to={`/resep/${resep.id}`}
      sx={{ display: 'flex', width: '300px', height: '400px', margin: '8px' }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={resep.photo}
          sx={{
            display: 'flex',
            width: '300px',
            height: '300px',
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ height: '100px' }}>
          <Typography>{resep.nama}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})
