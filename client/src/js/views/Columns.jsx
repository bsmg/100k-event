import React, { Component, Fragment } from 'react'
import Context from '../controllers/Context.jsx'

import '../../css/column.css'

class Columns extends Component {
  static contextType = Context

  render () {
    return (
      <Fragment>
        <div className='column'>
          {
            this.context.prizes.map((prize, i) =>
              <div className={ `item ${i === 0 ? 'active' : ''}` } key={ i }>{ prize.name }</div>
            )
          }

          {
            this.context.drawn.length === 0 ? null :
              this.context.drawn.length === this.context.total ? null :
                <br />
          }

          {
            this.context.drawn.map(({ prize }, i) =>
              <div className='item final' key={ i }>{ prize.name }</div>
            )
          }
        </div>

        <div className='column'>
          {
            this.context.winners.map((winner, i) =>
              <div
                key={ i }
                className={ `item blue ${i === this.context.activeIdx ? 'active' : ''} ${i === this.context.selectedIdx ? 'selected' : ''}` }
              >{ winner }</div>
            )
          }

          {
            this.context.drawn.length === 0 ? null :
              this.context.drawn.length === this.context.total ? null :
                <br />
          }

          {
            this.context.drawn.map(({ winner }, i) =>
              <div className='item final joined' key={ i }>{ winner }</div>
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default Columns
