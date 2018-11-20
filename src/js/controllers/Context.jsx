import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { waitMS, decelerate, randomRange } from './helpers.js'
import { winners as initialWinners, prizes as initialPrizes } from './data.js'

const Context = React.createContext()
const { Provider, Consumer } = Context

export class ControllerProvider extends Component {
  constructor (props) {
    super(props)

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
  }

  drawPrize (index) {
    if (this.state.prizes.length === 0 || this.state.winners.length === 0) return this

    const [prize] = this.state.prizes
    const winner = this.state.winners[index]

    const prizes = [...this.state.prizes].slice(1)
    const winners = [...this.state.winners].filter((_, i) => index !== i)
    const drawn = [...this.state.drawn, { prize, winner }]

    this.setState({ prizes, winners, drawn })
  }

  async pickWinner () {
    this.setState({ activeIdx: null, selectedIdx: null })

    const seed = randomRange(40, 60) / 100
    const steps = randomRange(100, 115)

    for (let i = 1; i <= steps; i++) {
      const speed = decelerate(i / 10, seed)
      await waitMS((1 / speed) * (i / 8)) // eslint-disable-line

      this.setState(prevState => {
        const prevIdx = prevState.activeIdx

        const activeIdx = prevIdx + 1
        if (activeIdx >= this.state.prizes.length) return { activeIdx: 0 }
        else return { activeIdx }
      })
    }

    await waitMS(800)
    this.setState(prevState => ({ selectedIdx: prevState.activeIdx }))
  }

  reset () {
    this.drawPrize(this.state.selectedIdx)
    this.setState({ activeIdx: null, selectedIdx: null })
  }

  render () {
    return (
      <Provider value={{
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
