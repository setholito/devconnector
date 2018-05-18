import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Content from '../../constants/Content'

class Select extends Component {
    constructor() {
        super()

        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    handleSelectChange(e) {
        const { name, value } = e.target
        this.props.onTextChange(name, value)
    }

    render() {
        const { id, label, name, options, required } = this.props

        const mappedOptions = options.map(item => (
            <option key={item.label} value={item.value.toLowerCase()}>
                {item.label}
            </option>
        ))
        const showRequired = required ? (
            <span className="required">{Content.REQUIRED_LABEL}</span>
        ) : null

        return (
            <div className="field">
                <label className="label" htmlFor={id}>
                    {label} {showRequired}
                </label>
                <div className="control">
                    <div className="select">
                        <select
                            id={id}
                            name={name}
                            onChange={this.handleSelectChange}
                        >
                            {mappedOptions}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

Select.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

export default Select
