import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

import Router from './Router'
import reportWebVitals from './reportWebVitals'

import 'tailwindcss/tailwind.css'
import './index.css'

const theme = createTheme({})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('we-ba-dut')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
