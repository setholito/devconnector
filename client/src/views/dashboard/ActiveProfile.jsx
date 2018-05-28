import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import format from 'date-fns/format'

import DisplayExperience from '../experience/DisplayExperience'
import DisplayEducation from '../education/DisplayEducation'

import Card from '../../components/common/Card'
import Button from '../../components/elements/Button'

import * as profileActions from '../../actions/profileActions'

import Url from '../../constants/Url'

class ActiveProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: this.props.profile
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
        const { profileActions } = this.props
        profileActions.deleteExperience(id)
    }

    deleteEducation(e) {
        const { id } = e.target
        const { profileActions } = this.props
        profileActions.deleteEducation(id)
    }

    deleteProfile() {
        const { profileActions } = this.props

        if (window.confirm('Are you sure?')) {
            profileActions.deleteProfileAndAccount()
        }
    }

    render() {
        const { profile } = this.state
        const { profileActions, deleteProfile } = this.props

        const experienceTable = (
            <DisplayExperience
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
            <DisplayEducation
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
                    <Link to={`${Url.DISPLAY_PROFILE}/${profile.handle}`}>
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
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ActiveProfile)
