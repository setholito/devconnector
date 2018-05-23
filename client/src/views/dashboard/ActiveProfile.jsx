import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import format from 'date-fns/format'

import DetailList from './DetailList'

import Card from '../../components/common/Card'
import Button from '../../components/elements/Button'

import * as profileActions from '../../actions/profileActions'

import Url from '../../constants/Url'

class ActiveProfile extends Component {
    constructor() {
        super()

        this.deleteExperience = this.deleteExperience.bind(this)
        this.deleteEducation = this.deleteEducation.bind(this)
    }

    deleteExperience(e) {
        const { id } = e.target
        this.props.profileActions.deleteExperience(id)
    }

    deleteEducation(e) {
        const { id } = e.target
        this.props.profileActions.deleteEducation(id)
    }

    render() {
        const { profile, profileActions, deleteProfile } = this.props

        let arrayOfExperienceCards = []

        if (profile.experience.length === 0) {
            arrayOfExperienceCards = <h5 className="title is-5 faded">None</h5>
        } else {
            arrayOfExperienceCards = profile.experience.map((exp, idx) => {
                console.log(exp)
                return (
                    <Card
                        className="spacer-bottom"
                        key={idx}
                        title={exp.company}
                    >
                        <DetailList
                            arr={[
                                { 'From Date': format(exp.from, 'MM/DD/YYYY') },
                                { 'To Date': format(exp.to, 'MM/DD/YYYY') },
                                { Description: exp.description || 'None' }
                            ]}
                        />
                        <a
                            id={exp._id}
                            className="card-footer-item"
                            card-link="true"
                        >
                            Edit
                        </a>
                        <a
                            id={exp._id}
                            className="card-footer-item"
                            card-link="true"
                            onClick={this.deleteExperience}
                        >
                            Delete
                        </a>
                    </Card>
                )
            })
        }

        let arrayOfEducationCards = []

        if (profile.education.length == 0) {
            arrayOfEducationCards = <h5 className="title is-5 faded">None</h5>
        } else {
            arrayOfEducationCards = profile.education.map((edu, idx) => {
                return (
                    <Card
                        className="spacer-bottom"
                        key={idx}
                        title={edu.school}
                    >
                        <DetailList
                            arr={[
                                { School: edu.school },
                                { 'Field of Study': edu.fieldofstudy },
                                { Degree: edu.degree },
                                { 'From Date': format(edu.from, 'MM/DD/YYYY') },
                                { 'To Date': format(edu.to, 'MM/DD/YYYY') },
                                { Description: edu.description || 'None' }
                            ]}
                        />
                        <a className="card-footer-item" card-link="true">
                            Edit
                        </a>
                        <a
                            id={edu._id}
                            className="card-footer-item"
                            card-link="true"
                            onClick={this.deleteEducation}
                        >
                            Delete
                        </a>
                    </Card>
                )
            })
        }

        return (
            <div className="control-panel">
                <h5 className="title is-5">
                    Hi{' '}
                    <Link to={`${Url.DISPLAY_PROFILE}/${profile.handle}`}>
                        {profile.handle}
                    </Link>!
                </h5>
                <div className="columns">
                    <div className="column">
                        <h3 className="title is-3">Experience</h3>
                        {arrayOfExperienceCards}
                    </div>
                    <div className="column">
                        <h3 className="title is-3">Education</h3>
                        {arrayOfEducationCards}
                    </div>
                    <div className="column">
                        <h3 className="title is-3">Controls</h3>
                        <div className="box">
                            <Link
                                to="/edit-profile"
                                className="button spacer-bottom is-fullwidth"
                            >
                                Edit Profile
                            </Link>
                            <Link
                                to="/add-experience"
                                className="button spacer-bottom is-fullwidth"
                            >
                                Add Experience
                            </Link>
                            <Link
                                to="/add-education"
                                className="button spacer-bottom is-fullwidth"
                            >
                                Add Education
                            </Link>
                            <Button
                                text="Delete"
                                className="is-danger is-outlined is-fullwidth"
                                onClick={deleteProfile}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveProfile)
