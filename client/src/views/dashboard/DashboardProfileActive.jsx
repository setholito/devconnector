import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ExperienceDisplay from '../experience/ExperienceDisplay'
import EducationDisplay from '../education/EducationDisplay'

import Button from '../../components/elements/Button'

import * as userProfileActions from '../../actions/userProfileActions'

import Url from '../../constants/Url'

class DashboardProfileActive extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: {
                experience: [],
                education: [],
                handle: ''
            }
        }

        this.deleteExperience = this.deleteExperience.bind(this)
        this.deleteEducation = this.deleteEducation.bind(this)
        this.deleteProfile = this.deleteProfile.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { profile } = nextProps

        let derivedState = {
            profile
        }

        return derivedState
    }

    deleteExperience(e) {
        const { id } = e.target
        const { userProfileActions } = this.props
        userProfileActions.deleteExperience(id)
    }

    deleteEducation(e) {
        const { id } = e.target
        const { userProfileActions } = this.props
        userProfileActions.deleteEducation(id)
    }

    deleteProfile() {
        const { userProfileActions } = this.props

        if (window.confirm('Are you sure?')) {
            userProfileActions.deleteProfileAndAccount()
        }
    }

    render() {
        const { profile } = this.state

        const experienceTable = (
            <ExperienceDisplay
                experience={profile.experience}
                deleteExperience={this.deleteExperience}
            />
        )

        const showExperience =
            profile.experience.length > 0 ? (
                experienceTable
            ) : (
                <h5 className="title is-5 faded">No Experience.</h5>
            )

        const educationTable = (
            <EducationDisplay
                education={profile.education}
                deleteEducation={this.deleteEducation}
            />
        )

        const showEducation =
            profile.education.length > 0 ? (
                educationTable
            ) : (
                <h5 className="title is-5 faded">No Education.</h5>
            )

        return (
            <div className="active-profile">
                <h5 className="title is-5">
                    Hi{' '}
                    <Link to={`${Url.USER_PROFILE_DISPLAY}`}>
                        {profile.handle}
                    </Link>!
                </h5>
                <Link to="/edit-profile" className="button spacer-bottom">
                    Edit Profile
                </Link>{' '}
                <Button
                    text="Delete Account"
                    className="is-danger is-outlined"
                    onClick={this.deleteProfile}
                />
                <div className="columns">
                    <div className="column">
                        <h3 className="title is-3">Experience</h3>
                        {showExperience}
                        <Link
                            to="/add-experience"
                            className="button is-primary spacer-bottom"
                        >
                            Add Experience
                        </Link>
                        <hr />
                        <h3 className="title is-3">Education</h3>
                        {showEducation}
                        <Link
                            to="/add-education"
                            className="button is-primary spacer-bottom"
                        >
                            Add Education
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userProfileActions: bindActionCreators(userProfileActions, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(DashboardProfileActive)
