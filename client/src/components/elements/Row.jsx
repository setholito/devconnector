import React from 'react'
import PropTypes from 'prop-types'

function Row({ children, header }) {
    let mappedChildren

    if (header) {
        mappedChildren = React.Children.map(children, child => {
            const extractedContent = child.props.children
            return <th>{extractedContent}</th>
        })
    } else {
        mappedChildren = React.Children.map(children, child => {
            const extractedContent = child.props.children
            return <td>{extractedContent}</td>
        })
    }

    return <tr>{mappedChildren}</tr>
}

Row.defaultProps = {
    header: false
}

Row.propTypes = {
    header: PropTypes.bool
}

export default Row
