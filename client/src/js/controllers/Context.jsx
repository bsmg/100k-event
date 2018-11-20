import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { waitMS, decelerate, randomRange } from './helpers.js'
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
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    master: PropTypes.bool,
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
      const start = await randomRange(0, this.state.prizes.length - 1)
      this.setState({ activeIdx: start, selectedIdx: null })

      const seed = await randomRange(40, 60) / 100
      const steps = await randomRange(100, 115)

      for (let i = 1; i <= steps; i++) {
        const speed = decelerate(i / 10, seed)
        await waitMS((1 / speed) * (i / 8)) // eslint-disable-line

        const src = tickSFX[i % tickSFX.length]
        const tick = new Audio(src)
        tick.volume = Math.max(0, (1 - (3 / i)) * 0.5)
        tick.play()

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

  componentDidUpdate () {
    if (!this.props.master) return undefined

    const payload = JSON.stringify(this.state)
    console.log(payload)
  }

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
