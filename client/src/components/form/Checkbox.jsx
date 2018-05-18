import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Checkbox extends Component {
    constructor() {
        super()
    }

    render() {
        return <input type="checkbox" checked={checked} />
    }
}

Checkbox.defaultProps = {
    // myProp: 'String'
}

Checkbox.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default Checkbox
