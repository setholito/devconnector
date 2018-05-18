import React from 'react'
import PropTypes from 'prop-types'

function Button({ onClick, text, type }) {
    return (
        <button className="button is-primary" type={type} onClick={onClick}>
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
