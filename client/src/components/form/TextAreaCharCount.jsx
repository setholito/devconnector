import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextArea from './TextArea'

class TextAreaCharCount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            maxNumChars: props.maxLength
        }

        this.limitTextChange = this.limitTextChange.bind(this)
    }

    limitTextChange(name, value) {
        const { maxNumChars } = this.state
        const { onTextChange } = this.props

        if (maxNumChars - value.length >= 0) {
            onTextChange(name, value)
        }
    }

    render() {
        const { maxNumChars } = this.state
        const { errorText, id, label, name, value } = this.props

        const curNumChars = maxNumChars - value.length

        return (
            <TextArea
                id={id}
                errorText={errorText}
                label={label}
                name={name}
                onTextChange={this.limitTextChange}
                value={value}
                helpText={`${curNumChars} of ${maxNumChars}`}
            />
        )
    }
}

TextAreaCharCount.defaultProps = {
    label: 'Default Label',
    maxLength: 280
}

TextAreaCharCount.propTypes = {
    id: PropTypes.string,
    errorText: PropTypes.string,
    label: PropTypes.string,
    maxLength: PropTypes.number.isRequired,
    name: PropTypes.string,
    value: PropTypes.string
}

export default TextAreaCharCount
