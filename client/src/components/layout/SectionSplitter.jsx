import React from 'react'
import PropTypes from 'prop-types'

import Section from './Section'

function SectionSplitter({ className, left, right, sizeLeft, sizeRight }) {
    return (
        <Section className="split-section">
            <div className="columns">
                <div className={`column is-${sizeLeft}`}>{left}</div>
                <div className={`column is-${sizeRight}`}>{right}</div>
            </div>
        </Section>
    )
}

SectionSplitter.defaultProps = {
    sizeLeft: 4,
    sizeRight: 8
}

SectionSplitter.propTypes = {
    sizeLeft: PropTypes.number.isRequired,
    sizeRight: PropTypes.number.isRequired
}

export default SectionSplitter
