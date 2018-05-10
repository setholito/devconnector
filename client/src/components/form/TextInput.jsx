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
        const { hasError, id, label, placeholder, type, value } = this.props
        const errorClass = hasError ? 'is-danger' : ''

        return (
            <div className="field">
                <label className="label" htmlFor={id}>
                    {label}
                </label>
                <div className="control">
                    <input
                        id={id}
                        className={`input ${errorClass}`}
                        type={type}
                        placeholder={placeholder}
                        onChange={this.handleTextChange}
                        value={value}
                    />
                </div>
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
