import React from 'react'
import PropTypes from 'prop-types'

function Button({ className, id, onClick, text, type }) {
    return (
        <button
            id={id}
            className={`button ${className}`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: 'Submit',
    type: 'button'
}

Button.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Button
