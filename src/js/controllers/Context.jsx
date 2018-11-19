import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { winners as initialWinners, prizes as initialPrizes } from './data.js'

const Context = React.createContext()
const { Provider, Consumer } = Context

export class ControllerProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      winners: [...initialWinners],
      prizes: [...initialPrizes],

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

  render () {
    return (
      <Provider value={{
        // Data
        winners: this.state.winners,
        prizes: this.state.prizes,
        drawn: this.state.drawn,

        // Mutators
        drawPrize: index => { this.drawPrize(index) },
      }}>
        { this.props.children }
      </Provider>
    )
  }
}

export const Controller = Consumer
export default Context
