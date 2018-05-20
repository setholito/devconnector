import React from 'react'
import PropTypes from 'prop-types'

function Panel({ children, heading }) {
    return (
        <nav className="panel">
            <p className="panel-heading">{heading}</p>
            {children}
        </nav>
    )
}

Panel.defaultProps = {
    heading: 'Default Heading'
}

Panel.propTypes = {
    heading: PropTypes.string
}

export default Panel
