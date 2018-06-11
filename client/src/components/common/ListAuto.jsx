import React from 'react'
import PropTypes from 'prop-types'

function ListAuto({ arr, className }) {
    const mappedItems = arr.map((item, idx) => {
        return (
            <li key={idx}>
                <strong>{item.label}:</strong> {item.text}
            </li>
        )
    })

    return <ul className={`unstyled ${className}`}>{mappedItems}</ul>
}

ListAuto.defaultProps = {
    arr: [],
    className: ''
}

ListAuto.propTypes = {
    arr: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default ListAuto
