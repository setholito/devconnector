import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Content from '../../constants/Content'

class TextArea extends Component {
    constructor(props) {
        super(props)

        this.handleTextChange = this.handleTextChange.bind(this)
    }

    handleTextChange(e) {
        const { name, value } = e.target
        const { onTextChange } = this.props

        onTextChange(name, value)
    }

    render() {
        const {
            errorText,
            helpText,
            id,
            label,
            name,
            placeholder,
            required,
            value
        } = this.props
        const hasErrorClass = errorText ? 'is-danger' : ''

        const hasHelpText = helpText ? <p className="help">{helpText}</p> : null
        const hasErrorText = errorText ? (
            <p className="help is-danger">{errorText}</p>
        ) : null

        const dynamicText = errorText ? hasErrorText : hasHelpText
        const showRequired = required ? (
            <span className="required">{Content.REQUIRED_LABEL}</span>
        ) : null

        return (
            <div className="field">
                <label className="label" htmlFor={id}>
                    {label} {showRequired}
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
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
}

export default TextArea
