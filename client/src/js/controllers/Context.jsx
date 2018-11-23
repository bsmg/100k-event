import React, { Component } from 'react'
import Sockette from 'sockette'
import PropTypes from 'prop-types'

import { waitMS, decelerate, randomRange, PooledRandomRange } from './helpers.js'
import { contestants as initialContestants, prizes as initialPrizes } from './data.js'

import winnerJingle from '../../media/winner-jingle6.wav'
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

    this.initialState = {
      contestants: [...initialContestants],
      prizes: [...initialPrizes],

      activeIdx: null,
      selectedIdx: null,

      total: Math.min(initialContestants.length, initialPrizes.length),
      drawn: [],

      prizeHidden: false,
    }

    const localState = localStorage.getItem('state')
    this.state = this.props.master && localState ?
      JSON.parse(localState) :
      this.initialState

    this.startPool = new PooledRandomRange(0, this.state.total)
    this.seedPool = new PooledRandomRange(40, 60)
    this.stepPool = new PooledRandomRange(95, 105)

    const wsURL = this.debug ? 'ws://localhost:3001' :
      `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`

    this.socket = new Sockette(wsURL, {
      onopen: () => { this.sendState() },
      onmessage: ev => {
        if (this.props.master) return undefined
        const { type, payload } = JSON.parse(ev.data)

        if (type === 'state') return this.setState(payload)
        if (type === 'sfx') this.playSound(payload.src, payload.volume || 1, false)
      },
    })
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    master: PropTypes.bool,
    token: PropTypes.string,
  }

  setStateAsync (state) {
    return new Promise(resolve => {
      this.setState(state, () => { resolve() })
    })
  }

  async drawPrize (index) {
    if (!this.props.master) return undefined
    if (this.state.prizes.length === 0 || this.state.contestants.length === 0) return undefined

    const [prize] = this.state.prizes
    const winner = this.state.contestants[index]

    const prizes = [...this.state.prizes].slice(1)
    const contestants = [...this.state.contestants].filter((_, i) => index !== i)
    const drawn = [...this.state.drawn, { prize, winner }]

    await this.setStateAsync({ prizeHidden: true })
    await waitMS(200)
    await this.setStateAsync({ prizes, contestants, drawn })
    await waitMS(200)
    await this.setStateAsync({ prizeHidden: false })
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

        if (volume > 0.438) this.playSound(src, volume)

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

    await waitMS(this.debug ? 0 : 650)
    this.playSound(winnerJingle, 0.6)
    await waitMS(this.debug ? 0 : 150)
    this.setState(prevState => ({ selectedIdx: prevState.activeIdx }))
  }

  playSound (src, volume, send = true) {
    const audio = new Audio(src)
    audio.volume = volume || 1

    audio.play()
    if (send) this.sendSound(src, volume)
  }

  async reset () {
    if (!this.props.master) return undefined

    await this.drawPrize(this.state.selectedIdx)
    this.setState({ activeIdx: null, selectedIdx: null })
  }

  sendState (noStore) {
    if (!this.props.master) return undefined

    // Send WS
    try {
      const token = this.props.token || ''
      const payload = JSON.stringify({ token, type: 'state', payload: this.state })

      this.socket.send(payload)
    } catch (err) {
      // Gracefully Fail
    }

    // Save to Local Storage
    if (!noStore) {
      localStorage.setItem('state', JSON.stringify(this.state))
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

  async resetStorage () {
    localStorage.removeItem('state')
    await this.setStateAsync(this.initialState)
    await this.sendState(true)
  }

  componentDidUpdate () { this.sendState() }

  render () {
    return (
      <Provider value={{
        // Slave
        master: this.props.master || false,

        // Data
        contestants: this.state.contestants,
        prizes: this.state.prizes,
        drawn: this.state.drawn,
        total: this.state.total,

        activeIdx: this.state.activeIdx,
        selectedIdx: this.state.selectedIdx,

        prizeHidden: this.state.prizeHidden,

        // Mutators
        setActiveIdx: idx => { this.setState({ activeIdx: idx }) },
        setSelectedIdx: idx => { this.setState({ selectedIdx: idx }) },

        // Draw Prize
        pickWinner: () => { this.pickWinner() },
        reset: () => { this.reset() },
        resetStorage: () => { this.resetStorage() },
      }}>
        { this.props.children }
      </Provider>
    )
  }
}

export const Controller = Consumer
export default Context
