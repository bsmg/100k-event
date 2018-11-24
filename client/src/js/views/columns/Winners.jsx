import React, { Component, Fragment } from 'react'
import Context from '../../controllers/Context.jsx'

import '../../../css/column.css'

class Winners extends Component {
  static contextType = Context

  render () {
    return (
      <Fragment>
        <div className='column winners'>
          <div className='item title image-right'>Winners</div>
          {
            this.context.drawn.map(({ winner }, i) =>
              <div
                key={ i }
                style={{ '--image': `url('${winner.image}')` }}
                className='item final joined image-right'
              >
                { winner.name }
              </div>
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
              >{ contestant.name }</div>
            )
          }
        </div>
      </Fragment>
    )
  }
}

export default Winners
