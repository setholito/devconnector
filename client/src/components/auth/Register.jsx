import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'

class Register extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log('Submitted from form!')
    }

    render() {
        return (
            <div className="register">
                <h3 className="title is-3">Register</h3>
                <form onSubmit={this.handleSubmit}>
                    <TextInput label="Email" />
                    <TextInput label="First Name" />
                    <TextInput label="Last Name" />
                    <TextInput label="Password" />
                    <TextInput label="Confirm Password" />
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

Register.defaultProps = {
    // myProp: 'String'
}

Register.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default Register
