import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material'
import { memo, useCallback, useRef, useState, FocusEventHandler } from 'react'

// https://stackoverflow.com/questions/56772630/mui-select-with-label-without-the-select-having-an-id
let nextIdSuffix = 1

type DropdownProps = {
  label: string
  items: {
    label: string
    value: any
  }[]
  onChange: (_item: any) => void
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Dropdown = memo(function Dropdown(props: DropdownProps) {
  const { items, onChange, label, ...rest } = props

  const idRef = useRef<string>('')
  const [index, setIndex] = useState(0)

  const handleChange = useCallback(
    (e: SelectChangeEvent<number>) => {
      setIndex(e.target.value as number)
      onChange(items[e.target.value as number].value)
    },
    [items, onChange]
  )

  if (!idRef.current) {
    idRef.current = `Dropdown${nextIdSuffix}`
    nextIdSuffix++
  }
  return (
    <FormControl margin="dense">
      <InputLabel id={idRef.current}>{label}</InputLabel>
      <Select
        labelId={idRef.current}
        placeholder={label}
        value={items[index] && index}
        onChange={handleChange}
        label={label}
        sx={{ width: '240px' }}
        {...rest}
      >
        {items.map((item, index) => (
          <MenuItem key={`${item.label} ${index}`} value={index}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
})
