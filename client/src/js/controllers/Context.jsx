import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { waitMS, decelerate, randomRange, PooledRandomRange } from './helpers.js'
import { winners as initialWinners, prizes as initialPrizes } from './data.js'

import tickSFX_A4 from '../../media/tick3-A4.wav'
import tickSFX_G4 from '../../media/tick3-G4.wav'
import tickSFX_E4 from '../../media/tick3-E4.wav'
import tickSFX_D4 from '../../media/tick3-D4.wav'
import tickSFX_C4 from '../../media/tick3-C4.wav'
import tickSFX_A3 from '../../media/tick3-A3.wav'

const tickSFX = [
  tickSFX_A4,
  tickSFX_G4,
  tickSFX_E4,
  tickSFX_D4,
  tickSFX_C4,
  tickSFX_A3,
]

const Context = React.createContext()
const { Provider, Consumer } = Context

export class ControllerProvider extends Component {
  constructor (props) {
    super(props)

    this.debug = false

    this.state = {
      winners: [...initialWinners],
      prizes: [...initialPrizes],

      activeIdx: null,
      selectedIdx: null,

      total: Math.min(initialWinners.length, initialPrizes.length),
      drawn: [],
    }

    this.startPool = new PooledRandomRange(0, this.state.total)
    this.seedPool = new PooledRandomRange(40, 60)
    this.stepPool = new PooledRandomRange(95, 105)

    this.socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`)
    this.socket.onopen = () => {
      this.sendState()
    }

    this.socket.onmessage = ev => {
      if (this.props.master) return undefined
      const { type, payload } = JSON.parse(ev.data)

      if (type === 'state') return this.setState(payload)

      if (type === 'sfx') {
        const media = new Audio(payload.src)
        media.volume = payload.volume || 1
        media.play()
      }
    }
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    master: PropTypes.bool,
    token: PropTypes.string,
  }

  drawPrize (index) {
    if (!this.props.master) return undefined

    if (this.state.prizes.length === 0 || this.state.winners.length === 0) return this

    const [prize] = this.state.prizes
    const winner = this.state.winners[index]

    const prizes = [...this.state.prizes].slice(1)
    const winners = [...this.state.winners].filter((_, i) => index !== i)
    const drawn = [...this.state.drawn, { prize, winner }]

    this.setState({ prizes, winners, drawn })
  }

  async pickWinner () {
    if (!this.props.master) return undefined

    if (!this.debug) {
      const start = this.startPool.generate() % this.state.prizes.length
      this.setState({ activeIdx: start, selectedIdx: null })

      const seed = this.seedPool.generate() / 100
      const steps = this.stepPool.generate()

      for (let i = 1; i <= steps; i++) {
        const speed = decelerate(i / 10, seed)
        await waitMS((1 / speed) * (i / 8)) // eslint-disable-line

        const src = tickSFX[i % tickSFX.length]
        const volume = Math.max(0, (1 - (3 / i)) * 0.5)

        if (volume > 0.438) {
          const tick = new Audio(src)
          tick.volume = volume

          tick.play()
          this.sendSound(src, volume)
        }

        this.setState(prevState => {
          const prevIdx = prevState.activeIdx

          const activeIdx = prevIdx + 1
          if (activeIdx >= this.state.prizes.length) return { activeIdx: 0 }
          else return { activeIdx }
        })
      }
    } else {
      const random = await randomRange(0, this.state.prizes.length - 1, true)
      this.setState({ activeIdx: random })
    }

    await waitMS(this.debug ? 0 : 800)
    this.setState(prevState => ({ selectedIdx: prevState.activeIdx }))
  }

  reset () {
    if (!this.props.master) return undefined

    this.drawPrize(this.state.selectedIdx)
    this.setState({ activeIdx: null, selectedIdx: null })
  }

  sendState () {
    if (!this.props.master) return undefined

    try {
      const token = this.props.token || ''
      const payload = JSON.stringify({ token, type: 'state', payload: this.state })

      this.socket.send(payload)
    } catch (err) {
      // Gracefully Fail
    }
  }

  sendSound (src, volume = 1) {
    if (!this.props.master) return undefined

    try {
      const token = this.props.token || ''
      const payload = JSON.stringify({ token, type: 'sfx', payload: { src, volume } })

      this.socket.send(payload)
    } catch (err) {
      // Gracefully Fail
    }
  }

  componentDidUpdate () { this.sendState() }

  render () {
    return (
      <Provider value={{
        // Slave
        master: this.props.master || false,

        // Data
        winners: this.state.winners,
        prizes: this.state.prizes,
        drawn: this.state.drawn,
        total: this.state.total,

        activeIdx: this.state.activeIdx,
        selectedIdx: this.state.selectedIdx,

        // Mutators
        setActiveIdx: idx => { this.setState({ activeIdx: idx }) },
        setSelectedIdx: idx => { this.setState({ selectedIdx: idx }) },

        // Draw Prize
        pickWinner: () => { this.pickWinner() },
        reset: () => { this.reset() },
      }}>
        { this.props.children }
      </Provider>
    )
  }
}

export const Controller = Consumer
export default Context
