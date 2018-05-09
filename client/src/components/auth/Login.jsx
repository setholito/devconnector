import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="login">
                <h3 className="title is-3">Login</h3>
            </div>
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
