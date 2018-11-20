import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './css/index.css'
import { ControllerProvider } from './js/controllers/Context.jsx'
import App from './js/App.jsx'

const Master = () => <ControllerProvider master><App /></ControllerProvider>
const Slave = () => <ControllerProvider><App /></ControllerProvider>

const Routes = () =>
  <BrowserRouter>
    <Switch>
      <Route path='/master' component={ Master } />
      <Route path='/' component={ Slave } />
    </Switch>
  </BrowserRouter>

ReactDOM.render(<Routes />, document.getElementById('root'))
