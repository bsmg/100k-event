import React from 'react'
import ReactDOM from 'react-dom'

import './css/index.css'
import { ControllerProvider } from './js/controllers/Context.jsx'
import App from './js/App.jsx'

ReactDOM.render(<ControllerProvider><App /></ControllerProvider>, document.getElementById('root'))
