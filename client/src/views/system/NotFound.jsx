import React from 'react'
import PropTypes from 'prop-types'

function NotFound({}) {
    return <div className="">This page does not exist.</div>
}

NotFound.defaultProps = {
    // myProp: 'String'
}

NotFound.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default NotFound
