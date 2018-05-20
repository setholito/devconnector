import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DisplayProfile extends Component {
    constructor() {
        super()
    }

    render() {
        const { match } = this.props
        return (
            <div>
                <h1 className="title is-1">{match.params.handle}'s Profile</h1>
            </div>
        )
    }
}

DisplayProfile.defaultProps = {
    // myProp: 'String'
}

DisplayProfile.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default DisplayProfile
