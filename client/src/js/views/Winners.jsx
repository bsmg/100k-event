import React, { Component, Fragment } from 'react'
import Context from '../controllers/Context.jsx'

import '../../css/column.css'

class Prizes extends Component {
  static contextType = Context

  render () {
    return (
      <Fragment>
        <div className='column winners'>
          <div className='item title'>Winners</div>
          {
            this.context.drawn.map(({ winner }, i) =>
              <div className='item final joined' key={ i }>{ winner }</div>
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
                className={ `item hidden` }
              >{ contestant }</div>
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default Prizes
