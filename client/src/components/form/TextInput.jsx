import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextInput extends Component {
    render() {
        const { label } = this.props

        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Text input"
                    />
                </div>
            </div>
        )
    }
}

TextInput.defaultProps = {
    // myProp: 'String'
}

TextInput.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default TextInput
