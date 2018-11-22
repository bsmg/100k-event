import React, { Component, Fragment } from 'react'
import Context from '../controllers/Context.jsx'

import '../../css/column.css'

class Columns extends Component {
  static contextType = Context

  render () {
    return (
      <Fragment>
        <div className='column right'>
          {
            this.context.drawn.map(({ winner }, i) =>
              <div className='item final joined hidden' key={ i }>{ winner }</div>
            )
          }

          {
            this.context.drawn.length === 0 ? null :
              this.context.drawn.length === this.context.total ? null :
                <br />
          }
          
          {
            this.context.contestants.map((contestant, i) =>
              <div
                key={ i }
                className={ `item blue${i === this.context.activeIdx ? ' active' : ''}${i === this.context.selectedIdx ? ' selected' : ''}` }
              >{ contestant }</div>
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default Columns
