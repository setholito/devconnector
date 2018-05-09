import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextInput from '../form/TextInput'

class Login extends Component {
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
            <section className="section login">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4 is-offset-4">
                            <h3 className="title is-3">Login</h3>
                            <div className="box">
                                <form onSubmit={this.handleSubmit}>
                                    <TextInput label="Email" />
                                    <TextInput label="Password" />
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
