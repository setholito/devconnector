import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextUpdate = this.handleTextUpdate.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const { email, password } = this.state

        const userCredentials = {
            email,
            password
        }

        console.log(userCredentials)
    }

    handleTextUpdate(id, text) {
        this.setState({ [id]: text })
    }

    render() {
        return (
            <section className="section login">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4 is-offset-4">
                            <h1 className="title is-1">Login</h1>
                            <div className="box">
                                <form onSubmit={this.handleSubmit}>
                                    <TextInput
                                        id="email"
                                        label="Email"
                                        onTextChange={this.handleTextUpdate}
                                    />
                                    <TextInput
                                        id="password"
                                        label="Password"
                                        onTextChange={this.handleTextUpdate}
                                        type="password"
                                    />
                                    <button
                                        className="button is-primary"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

Login.defaultProps = {
    // myProp: 'String'
}

Login.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default Login
