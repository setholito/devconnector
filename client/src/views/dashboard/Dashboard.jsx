import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as profileActions from '../../actions/profileActions'

import Content from '../../constants/Content'

import ActiveProfile from './ActiveProfile'
import NoProfile from './NoProfile'

import Spinner from '../../components/common/Spinner'

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            errors: {}
        }

        this.deleteProfile = this.deleteProfile.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { errors } = nextProps
        if (errors) {
            this.setState({ errors })
        }
    }

    componentDidMount() {
        const { profileActions } = this.props
        profileActions.getCurrentProfile()
    }

    deleteProfile() {
        const { profileActions } = this.props

        if (window.confirm('Are you sure?')) {
            profileActions.deleteProfileAndAccount()
        }
    }

    render() {
        const { errors } = this.props
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <ActiveProfile
                        profile={profile}
                        deleteProfile={this.deleteProfile}
                    />
                )
            } else {
                // User is logged in but has no profile
                dashboardContent = <NoProfile />
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
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { auth, errors, profile } = state

    return {
        auth,
        errors,
        profile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
