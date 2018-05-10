import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Hero from './Hero'

class SplashPage extends Component {
    render() {
        return (
            <div className="splash-page">
                <Hero>
                    <div className="field has-addons">
                        <p className="control">
                            <Link to="/register" className="button">
                                <span>Register</span>
                            </Link>
                        </p>
                        <p className="control">
                            <Link to="/login" className="button">
                                <span>Login</span>
                            </Link>
                        </p>
                    </div>
                </Hero>
            </div>
        )
    }
}

SplashPage.defaultProps = {
    // myProp: 'String'
}

SplashPage.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default SplashPage
