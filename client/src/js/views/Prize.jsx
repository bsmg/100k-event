import React, { Component } from 'react'
import Context from '../controllers/Context.jsx'

import { prizeToImage } from '../controllers/helpers.js'

import '../../css/prize.css'

class Prize extends Component {
  static contextType = Context

  render () {
    return (
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
    )
  }
}

export default Prize
