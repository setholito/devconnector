import React from 'react'
import PropTypes from 'prop-types'

function Button({ className, onClick, text, type }) {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: 'Submit',
    type: 'button'
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Button
