import React from 'react'
import PropTypes from 'prop-types'

function Section({ children, className }) {
    return <section className={`section ${className}`}>{children}</section>
}

Section.defaultProps = {
    className: ''
}

Section.propTypes = {
    className: PropTypes.string
}

export default Section
