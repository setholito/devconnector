import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as authActions from '../../actions/authActions'

import Button from '../elements/Button'
import CenteredContainer from '../layout/CenteredContainer'
import TextInput from '../form/TextInput'

import Content from '../../constants/Content'

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

    componentDidMount() {
        const { history, auth } = this.props
        const { isAuthenticated } = auth

        if (isAuthenticated) {
            history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        const { errors } = nextProps
        if (errors) {
            this.setState({ errors })
        }
    }

    onFormSubmit(e) {
        e.preventDefault()

        const { email, firstName, lastName, password, password2 } = this.state
        const { authActions, history } = this.props

        const newUser = {
            email,
            firstName,
            lastName,
            password,
            password2
        }

        authActions.registerUser(newUser, history)
    }

    handleTextUpdate(id, text) {
        this.setState({ [id]: text })
    }

    render() {
        const {
            email,
            errors,
            firstName,
            lastName,
            password,
            password2
        } = this.state

        return (
            <section className="section register">
                <CenteredContainer>
                    <h1 className="title is-1">{Content.REGISTER}</h1>
                    <div className="box">
                        <form onSubmit={this.onFormSubmit}>
                            <TextInput
                                errorText={errors.firstName}
                                id="firstName"
                                label="First Name"
                                onTextChange={this.handleTextUpdate}
                                value={firstName}
                            />
                            <TextInput
                                errorText={errors.lastName}
                                id="lastName"
                                label="Last Name"
                                onTextChange={this.handleTextUpdate}
                                value={lastName}
                            />
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
                                type="password"
                                value={password}
                            />
                            <TextInput
                                errorText={errors.password2}
                                id="password2"
                                label="Confirm Password"
                                onTextChange={this.handleTextUpdate}
                                type="password"
                                value={password2}
                            />
                            <Button type="submit" />
                        </form>
                    </div>
                </CenteredContainer>
            </section>
        )
    }
}

Register.propTypes = {
    auth: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(Register)
)
