import React, { Component, Fragment } from 'react'
import Context from './controllers/Context.jsx'

import Columns from './views/Columns.jsx'

import '../css/prize.css'

import viveProHTC from '../images/prizes/vive-pro-htc.png'
import viveProVRFI from '../images/prizes/vive-pro-vrfi.png'
import viveProPlutovr from '../images/prizes/vive-pro-plutovr.png'
import placeholder from '../images/prizes/placeholder.png'

const prizeToImage = prize => {
  switch (prize) {
    case 'vive-pro-htc':
      return `url(${viveProHTC})`
    case 'vive-pro-vrfi':
      return `url(${viveProVRFI})`
    case 'vive-pro-plutovr':
      return `url(${viveProPlutovr})`
    default:
      return `url(${placeholder})`
  }
}

class App extends Component {
  static contextType = Context

  render () {
    return (
      <Fragment>
        <button className='debug' onClick={ () => this.context.drawPrizeDebug() }>TEST</button>

        <Columns />

        <div className='display-container'>
          <div className='current-prize-container'>
            <h2>Current Prize</h2>
            <div className='current-prize' style={{ backgroundImage: prizeToImage(this.context.prizes[0].image) }}>
              <div className="container">
                <h2>{ this.context.prizes[0].name }</h2>
                <p>{ this.context.prizes[0].description }</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App
