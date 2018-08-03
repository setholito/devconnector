import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userProfileActions from '../../actions/userProfileActions'

import UserProfileCard from './UserProfileCard'
import ListAuto from '../../components/common/ListAuto'
import Section from '../../components/layout/Section'
import SectionSplitter from '../../components/layout/SectionSplitter'

import { getSafe } from '../../utils/utilFunctions'

class UserProfileDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: {
                bio: '',
                company: '',
                education: [],
                experience: [],
                skills: '',
                status: ''
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { userProfile } = nextProps

        let derivedState = {
            ...userProfile
        }

        return derivedState
    }

    componentDidMount() {
        const { userProfileActions } = this.props
        userProfileActions.getCurrentProfile()
    }

    render() {
        const { profile } = this.state
        const { userProfile } = this.props

        const experienceArr = profile.experience.reduce((acc, cur, idx) => {
            const tempArr = []

            tempArr.push(
                {
                    label: 'Title',
                    text: cur.title
                },
                {
                    label: 'Company',
                    text: cur.company
                },
                {
                    label: 'Location',
                    text: cur.location
                }
            )

            acc.push(<ListAuto key={idx} arr={tempArr} />)

            return acc
        }, [])

        const educationArr = profile.education.reduce((acc, cur, idx) => {
            const tempArr = []

            tempArr.push(
                {
                    label: 'School',
                    text: cur.school
                },
                {
                    label: 'Field of Study',
                    text: cur.fieldofstudy
                },
                {
                    label: 'Degree',
                    text: cur.degree
                }
            )

            acc.push(<ListAuto key={idx} arr={tempArr} />)

            return acc
        }, [])

        const avatarUrl = getSafe(() => userProfile.profile.user.avatar)

        return (
            <div>
                <Section>
                    <h1 className="title is-1">Your Profile</h1>
                    <img
                        className="circle"
                        src={avatarUrl}
                        alt="User Gravatar"
                    />
                </Section>
                <SectionSplitter
                    className="display-profile"
                    left={
                        <Fragment>
                            <UserProfileCard title="Bio">
                                {profile.bio}
                            </UserProfileCard>
                            <UserProfileCard title="Company">
                                {profile.company}
                            </UserProfileCard>
                            <UserProfileCard title="Status">
                                {profile.status}
                            </UserProfileCard>
                        </Fragment>
                    }
                    right={
                        <Fragment>
                            <UserProfileCard title="Skills">
                                {profile.skills}
                            </UserProfileCard>
                            <UserProfileCard title="Experience">
                                {experienceArr}
                            </UserProfileCard>
                            <UserProfileCard title="Education">
                                {educationArr}
                            </UserProfileCard>
                        </Fragment>
                    }
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { userProfile } = state
    return {
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
)(UserProfileDisplay)
