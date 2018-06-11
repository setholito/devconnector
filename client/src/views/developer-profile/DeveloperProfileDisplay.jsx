import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as userProfileActions from '../../actions/userProfileActions'

import DeveloperProfileCard from './DeveloperProfileCard'
import ListAuto from '../../components/common/ListAuto'
import CenteredContainer from '../../components/layout/CenteredContainer'

import { getSafe } from '../../utils/utilFunctions'

class DeveloperProfileDisplay extends Component {
    constructor() {
        super()

        this.state = {
            profile: {
                experience: [],
                education: []
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
        const { userProfileActions, match } = this.props
        userProfileActions.getProfileByHandle(match.params.handle)

        // NEEDS REFACTOR
        // userProfileActions.getGitHubRepos(match.params.handle)
    }

    render() {
        const { match } = this.props
        const { profile } = this.state

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

        const avatarUrl = getSafe(() => profile.user.avatar)

        const gitHubCard = (
            <DeveloperProfileCard title="Repos">The Repos</DeveloperProfileCard>
        )
        const showGitHubRepos = getSafe(() => profile.githubusername)
            ? gitHubCard
            : null

        return (
            <section className="section developer-profile">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {match.params.handle}'s Profile
                    </h1>
                    <img
                        className="circle"
                        src={avatarUrl}
                        alt="User Gravatar Image"
                    />
                    <DeveloperProfileCard title="Bio">
                        {profile.bio}
                    </DeveloperProfileCard>
                    <DeveloperProfileCard title="Company">
                        {profile.company}
                    </DeveloperProfileCard>
                    <DeveloperProfileCard title="Status">
                        {profile.status}
                    </DeveloperProfileCard>
                    <DeveloperProfileCard title="Skills">
                        {profile.skills}
                    </DeveloperProfileCard>
                    <DeveloperProfileCard title="Experience">
                        {experienceArr}
                    </DeveloperProfileCard>
                    <DeveloperProfileCard title="Education">
                        {educationArr}
                    </DeveloperProfileCard>
                    {showGitHubRepos}
                </CenteredContainer>
            </section>
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
)(DeveloperProfileDisplay)
