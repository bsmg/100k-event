import React, { Component, Fragment } from 'react'
import Context from './controllers/Context.jsx'

import Columns from './views/Columns.jsx'
import Prize from './views/Prize.jsx'
import Contestants from './views/Contestants.jsx'

class App extends Component {
  static contextType = Context

  render () {
    return (
      <Fragment>
        {
          !this.context.master ? null :
            <Fragment>
              <button disabled={ this.context.activeIdx !== null } className='debug' onClick={ () => this.context.pickWinner() }>DRAW WINNER</button>
              <button disabled={ this.context.selectedIdx === null } className='debug next' onClick={ () => this.context.reset() }>NEXT</button>
            </Fragment>
        }

        <Columns />
        <Prize />
        <Contestants />
      </Fragment>
    )
  }
}

export default App
