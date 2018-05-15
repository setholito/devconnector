import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextArea extends Component {
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
            name,
            placeholder,
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
                    <textarea
                        className={`textarea ${hasErrorClass}`}
                        id={id}
                        name={name}
                        onChange={this.handleTextChange}
                        placeholder={placeholder}
                        value={value}
                    />
                </div>
                {dynamicText}
            </div>
        )
    }
}

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string
}

export default TextArea
