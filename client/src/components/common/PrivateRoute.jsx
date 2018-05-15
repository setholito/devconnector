import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Url from '../../constants/Url'

function PrivateRoute({ component: Component, auth, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={Url.LOGIN} />
                )
            }
        />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { auth } = state

    return {
        auth
    }
}

export default connect(mapStateToProps, null)(PrivateRoute)
