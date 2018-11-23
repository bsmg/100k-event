import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '../controllers/Context.jsx'
import { prizeToImage } from '../controllers/helpers.js'

import '../../css/prize.css'

class Prize extends Component {
  static contextType = Context

  render () {
    const { prizes, prizeHidden } = this.context
    if (prizes.length === 0) {
      return <PrizeBox
        title="That's all folks!"
        description="Thanks for coming. We'll be continuing the stream with more things to watch so stay tuned!"
        imageTag={ 'bsmg' }
        hidden={ prizeHidden }
      />
    }

    const [prize] = prizes
    return <PrizeBox
      title={ prize.name }
      description={ prize.description }
      imageTag={ prize.image }
      hidden={ prizeHidden }
    />
  }
}

const PrizeBox = props =>
  <div className='display-container'>
    <div className='videoFX'>
      <video id="background-video" loop autoPlay>
        <source src={ props.videoURL } type="video/mp4" />
        <source src={ props.videoURL } type="video/ogg" />
            Your browser does not support the video tag.
      </video>
    </div>
    <div className='current-prize-container'>
      <h2>Current Prize</h2>
      <div className={ `current-prize${props.hidden ? ' hidden' : ''}` } style={{ backgroundImage: prizeToImage(props.imageTag) }}>
        <div className="container">
          <h2>{ props.title }</h2>
          <p>{ props.description }</p>
        </div>
      </div>
    </div>
  </div>

PrizeBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageTag: PropTypes.string.isRequired,
  videoTag: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
}

export default Prize
