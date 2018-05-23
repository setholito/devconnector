import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Checkbox extends Component {
    render() {
        const { checked, disabled, label, onClick } = this.props
        return (
            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onClick={onClick}
                />{' '}
                {label}
            </label>
        )
    }
}

Checkbox.defaultProps = {
    checked: false,
    disabled: false,
    label: 'Default Label'
}

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired
}

export default Checkbox
