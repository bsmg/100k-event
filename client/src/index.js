import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import './css/index.css'
import { ControllerProvider } from './js/controllers/Context.jsx'
import App from './js/App.jsx'

const Master = props => <ControllerProvider master token={ props.match.params.token }><App /></ControllerProvider>
const Slave = () => <ControllerProvider><App /></ControllerProvider>

Master.propTypes = { match: PropTypes.any }

const Routes = () =>
  <BrowserRouter>
    <Switch>
      <Route path='/master/:token' component={ Master } />
      <Route path='/' component={ Slave } />
    </Switch>
  </BrowserRouter>

ReactDOM.render(<Routes />, document.getElementById('root'))
