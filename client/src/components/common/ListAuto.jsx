import React from 'react'
import PropTypes from 'prop-types'

function ListAuto({ arr }) {
    const mappedItems = arr.map((item, idx) => {
        return (
            <li key={idx}>
                <strong>{item.label}:</strong> {item.text}
            </li>
        )
    })

    return <ul className="unstyled with-lines">{mappedItems}</ul>
}

ListAuto.defaultProps = {
    arr: []
}

ListAuto.propTypes = {
    arr: PropTypes.array.isRequired
}

export default ListAuto
