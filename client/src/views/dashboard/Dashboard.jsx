import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userProfileActions from '../../actions/userProfileActions'

import Content from '../../constants/Content'

import DashboardProfileActive from './DashboardProfileActive'
import DashboardProfileNone from './DashboardProfileNone'

import Spinner from '../../components/common/Spinner'

import isEmpty from '../../validation/is-empty'

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { errors } = nextProps
        let derivedState = {}

        if (errors) {
            derivedState.errors = errors
        }

        return derivedState
    }

    componentDidMount() {
        const { userProfileActions } = this.props
        userProfileActions.getCurrentProfile()
    }

    render() {
        const { loading, userProfile } = this.props

        let dashboardContent

        if (isEmpty(userProfile) || loading.status) {
            dashboardContent = <Spinner />
        } else {
            // Check if logged in user has profile data
            if (isEmpty(userProfile.profile)) {
                // User is logged in but has no profile
                dashboardContent = <DashboardProfileNone />
            } else {
                dashboardContent = (
                    <DashboardProfileActive profile={userProfile.profile} />
                )
            }
        }

        return (
            <section className="dashboard section">
                <div className="columns">
                    <div className="column is-12">
                        <h1 className="title is-1">
                            {Content.DASHBOARD_HEADING}
                        </h1>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-12">{dashboardContent}</div>
                </div>
            </section>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    userProfileActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { auth, errors, loading, userProfile } = state

    return {
        auth,
        errors,
        loading,
        userProfile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userProfileActions: bindActionCreators(userProfileActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
