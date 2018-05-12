import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/authActions'

import TextInput from '../form/TextInput'
import CenteredContainer from '../layout/CenteredContainer'

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

    componentWillReceiveProps(nextProps) {
        const { auth, errors } = nextProps
        const { history } = this.props

        if (auth.isAuthenticated) {
            history.push('/dashboard')
        }

        if (errors) {
            this.setState({ errors })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const { authActions } = this.props
        const { email, password } = this.state

        const userCredentials = {
            email,
            password
        }

        authActions.loginUser(userCredentials)
    }

    handleTextUpdate(id, text) {
        this.setState({ [id]: text })
    }

    render() {
        const { email, errors, password } = this.state
        return (
            <section className="section login">
                <CenteredContainer>
                    <h1 className="title is-1">Login</h1>
                    <div className="box">
                        <form onSubmit={this.handleSubmit}>
                            <TextInput
                                errorText={errors.email}
                                id="email"
                                label="Email"
                                onTextChange={this.handleTextUpdate}
                                value={email}
                            />
                            <TextInput
                                errorText={errors.password}
                                id="password"
                                label="Password"
                                onTextChange={this.handleTextUpdate}
                                value={password}
                            />
                            <button className="button is-primary" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </CenteredContainer>
            </section>
        )
    }
}

Login.defaultProps = {
    // myProp: 'String'
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { auth, errors } = state
    return {
        auth,
        errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
