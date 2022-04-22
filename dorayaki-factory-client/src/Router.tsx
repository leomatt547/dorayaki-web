import { memo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'tailwindcss/tailwind.css'

import Login from 'pages/Login/Login'
import Resep from 'pages/Resep/Resep'
import ResepDetail from 'pages/ResepDetail/ResepDetail'
import Request from 'pages/Request/Request'

import { Navbar } from 'components/module'
import { UserContextProvider } from 'context'
import Bahan from 'pages/Bahan/Bahan'

function Router(): JSX.Element {
  return (
    <div className="flex h-screen flex-col" style={{ paddingTop: '72px' }}>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/resep" exact component={Resep} />
            <Route path="/request" exact component={Request} />
            <Route path="/bahan" exact component={Bahan} />
            <Route path="/resep/:id([0-9]+)" exact component={ResepDetail} />
            <Route path="/" exact component={Request} />
          </Switch>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default memo(Router)
