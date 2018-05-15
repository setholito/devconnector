import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Select extends Component {
    constructor() {
        super()

        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    handleSelectChange(e) {
        const { id, value } = e.target
        this.props.onTextChange(id, value)
    }

    render() {
        const { id, label, options } = this.props

        const mappedOptions = options.map(item => (
            <option key={item.label} value={item.value.toLowerCase()}>
                {item.label}
            </option>
        ))

        return (
            <div class="field">
                <label class="label" htmlFor={id}>
                    {label}
                </label>
                <div class="control">
                    <div class="select">
                        <select id={id} onChange={this.handleSelectChange}>
                            {mappedOptions}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

Select.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}

export default Select
