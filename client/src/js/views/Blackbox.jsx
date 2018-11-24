import React from 'react'
import PropTypes from 'prop-types'

import '../../css/blackbox.css'

const Blackbox = props =>
  <div className={ `blackbox${props.dark ? '' : ' hidden'}` } />

Blackbox.propTypes = {
  dark: PropTypes.bool.isRequired,
}

export default Blackbox
