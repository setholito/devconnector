import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as profileActions from '../../actions/profileActions'
import Content from '../../constants/Content'
import Card from '../common/Card'
import Spinner from '../common/Spinner'
import Button from '../elements/Button'
import Message from '../common/Message'

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
                    <Fragment>
                        <h5 className="title is-5">
                            Hi{' '}
                            <Link to={`/profile/${profile.handle}`}>
                                {profile.handle}
                            </Link>!
                        </h5>
                        <div className="columns">
                            <div className="column">
                                <p>
                                    Here's some dashboard stuff.
                                    <Link to="/edit-profile" className="button">
                                        Edit Profile
                                    </Link>
                                    <br />
                                    <Link
                                        to="/add-experience"
                                        className="button"
                                    >
                                        Add Experience
                                    </Link>
                                    <br />
                                    <Link
                                        to="/add-education"
                                        className="button"
                                    >
                                        Add Education
                                    </Link>
                                    <br />
                                    <Button
                                        text="Delete"
                                        className="is-danger"
                                        onClick={this.deleteProfile}
                                    >
                                        Delete
                                    </Button>
                                </p>
                            </div>
                            <div className="column">
                                <Card title="First">Test</Card>
                            </div>
                            <div className="column">
                                <Card title="First">Test</Card>
                            </div>
                        </div>
                    </Fragment>
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
