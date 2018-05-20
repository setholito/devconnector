import React from 'react'
import PropTypes from 'prop-types'

function PanelAuto({ children, heading }) {
    const mappedChildren = React.Children.map(children, (child, idx) => {
        return <div className="panel-block">{child}</div>
    })

    return (
        <nav className="panel">
            <p className="panel-heading">{heading}</p>
            {mappedChildren}
        </nav>
    )
}

PanelAuto.defaultProps = {
    heading: 'Default Heading'
}

PanelAuto.propTypes = {
    heading: PropTypes.string
}

export default PanelAuto
