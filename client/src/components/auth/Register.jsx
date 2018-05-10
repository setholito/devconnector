import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'
import Button from '../elements/Button'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleTextUpdate = this.handleTextUpdate.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault()
        const { email, firstName, lastName, password, password2 } = this.state

        const newUser = {
            email,
            firstName,
            lastName,
            password,
            password2
        }

        console.log(newUser)
    }

    handleTextUpdate(id, text) {
        this.setState({ [id]: text })
    }

    render() {
        const { email, firstName, lastName, password, password2 } = this.state

        return (
            <section className="section register">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4 is-offset-4">
                            <h1 className="title is-1">Register</h1>
                            <div className="box">
                                <form onSubmit={this.onFormSubmit}>
                                    <TextInput
                                        hasError={false}
                                        id="email"
                                        label="Email"
                                        onTextChange={this.handleTextUpdate}
                                        value={email}
                                    />
                                    <TextInput
                                        hasError={false}
                                        id="firstName"
                                        label="First Name"
                                        onTextChange={this.handleTextUpdate}
                                        value={firstName}
                                    />
                                    <TextInput
                                        hasError={false}
                                        id="lastName"
                                        label="Last Name"
                                        onTextChange={this.handleTextUpdate}
                                        value={lastName}
                                    />
                                    <TextInput
                                        hasError={false}
                                        id="password"
                                        label="Password"
                                        onTextChange={this.handleTextUpdate}
                                        type="password"
                                        value={password}
                                    />
                                    <TextInput
                                        hasError={false}
                                        id="password2"
                                        label="Confirm Password"
                                        onTextChange={this.handleTextUpdate}
                                        type="password"
                                        value={password2}
                                    />
                                    <Button type="submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
