import React, { Component } from 'react'

import Context from './controllers/Context.jsx'

class App extends Component {
  render () {
    return (
      <div><button onClick={() => {
        const i = Math.floor(Math.random() * this.context.winners.length)
        this.context.drawPrize(i)
      }}>draw prize</button>

      {
        this.context.prizes.map((x, i) => <div key={ i }>{x}</div>)
      }
      {
        this.context.winners.map((x, i) => <div key={ i }>{x}</div>)
      }
      </div>
    )
  }
}

App.contextType = Context

export default App
