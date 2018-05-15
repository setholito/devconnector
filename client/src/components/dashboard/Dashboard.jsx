import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as profileActions from '../../actions/profileActions'
import Content from '../../constants/Content'
import Spinner from '../common/Spinner'
import Message from '../common/Message'

class Dashboard extends Component {
    componentDidMount() {
        const { profileActions } = this.props
        profileActions.getCurrentProfile()
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).lenght > 0) {
                dashboardContent = (
                    <h3 className="title is-3">Display Profile</h3>
                )
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <Message heading="No Profile" type="warning">
                        <p>
                            You have not created a profile.<br />
                            <br />
                        </p>
                        <Link
                            to="/create-profile"
                            className="button is-primary"
                        >
                            Create Profile
                        </Link>
                    </Message>
                )
            }
        }

        return (
            <section className="dashboard section">
                <div className="columns">
                    <div className="column is-12">
                        <h1 className="title is-1">{Content.DASHBOARD}</h1>
                        <div className="box">{dashboardContent}</div>
                    </div>
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
    const { auth, profile } = state

    return {
        auth,
        profile
    }
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
