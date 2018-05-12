import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextInput extends Component {
    constructor() {
        super()

        this.handleTextChange = this.handleTextChange.bind(this)
    }

    handleTextChange(e) {
        const { id, value } = e.target
        this.props.onTextChange(id, value)
    }

    render() {
        const {
            errorText,
            helpText,
            id,
            label,
            placeholder,
            type,
            value
        } = this.props
        const hasErrorClass = errorText ? 'is-danger' : ''

        const hasHelpText = helpText ? <p className="help">{helpText}</p> : null
        const hasErrorText = errorText ? (
            <p className="help is-danger">{errorText}</p>
        ) : null
        const dynamicText = errorText ? hasErrorText : hasHelpText

        return (
            <div className="field">
                <label className="label" htmlFor={id}>
                    {label}
                </label>
                <div className="control">
                    <input
                        className={`input ${hasErrorClass}`}
                        id={id}
                        onChange={this.handleTextChange}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                    />
                </div>
                {dynamicText}
            </div>
        )
    }
}

TextInput.defaultProps = {
    placeholder: 'Enter text here',
    type: 'text'
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
}

export default TextInput
