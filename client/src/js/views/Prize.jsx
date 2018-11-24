import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '../controllers/Context.jsx'
import { prizeToImage, packToImage } from '../controllers/prizeHelpers.js'
import ticketConfetti from '../../media/ticket-confetti.webm'

import '../../css/prize.css'

class Prize extends Component {
  static contextType = Context

  render () {
    const { prizes, prizeHidden, selectedIdx } = this.context
    if (prizes.length === 0) {
      return <PrizeBox
        title="That's all folks!"
        description="Thanks for coming. We'll be continuing the stream with more things to watch so stay tuned!"
        imageTag={ 'bsmg' }
        packTag={ 'blank' }
        hidden={ prizeHidden }
      />
    }

    const [prize] = prizes
    return <PrizeBox
      title={ prize.name }
      description={ prize.description }
      imageTag={ prize.image }
      packTag={ prize.prizePack }
      hidden={ prizeHidden }
      hasWinner={ selectedIdx !== null }
      dramatic={ prize.dramatic }
    />
  }
}

const PrizeBox = props =>
  <div className='display-container'>
    <div className='videoFX'>
      <video id='background-video' loop autoPlay muted className={`${props.hasWinner ? '' : 'hidden'}`}>
        <source src={ ticketConfetti } type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className={`current-prize-container${props.dramatic ? ' dramatic' : ''}`}>
      <h2>Current Prize</h2>
      <div className={`current-prize${props.hidden ? ' hidden' : ''}`} style={{ backgroundImage: prizeToImage(props.imageTag) }}>
        <div className='container'>
          <h2>{ props.title }</h2>
          <p>{ props.description }</p>
        </div>
      </div>

      <img
        className={ `prize-pack${props.hidden ? ' hidden' : ''}` }
        src={ packToImage(props.packTag) }
        alt='Prize Pack'
      />
    </div>
  </div>

PrizeBox.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageTag: PropTypes.string.isRequired,
  packTag: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  hasWinner: PropTypes.bool,
  dramatic: PropTypes.bool,
}

export default Prize
