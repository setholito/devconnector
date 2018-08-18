import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userProfileActions from '../../actions/userProfileActions'

import DeveloperProfileCard from './DeveloperProfileCard'
import ListAuto from '../../components/common/ListAuto'
import CenteredContainer from '../../components/layout/CenteredContainer'

import { getSafe } from '../../utils/utilFunctions'

class DeveloperProfileDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: {
                experience: [],
                education: []
            },
            repos: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { userProfile } = props

        let derivedState = {
            ...userProfile
        }

        return derivedState
    }

    componentDidMount() {
        const { userProfileActions, match } = this.props
        userProfileActions.getProfileByHandle(match.params.handle)

        // NEEDS REFACTOR - USE ACTION
        const config = {
            handle: match.params.handle,
            clientId: 'f9afc36db9e5d334efff',
            clientSecret: 'bff5a5a90e3d14e8337c8954c557662307fec3d8',
            count: 3,
            sort: 'created: asc'
        }

        fetch(
            `https://api.github.com/users/${config.handle}/repos?per_page=${
                config.count
            }&sort=${config.sort}&client_id=${config.clientId}&client_secret=${
                config.clientSecret
            }`
        )
            .then(res => res.json())
            .then(data => this.setState({ repos: data }))
            .catch(err => console.log(err))
    }

    render() {
        const { match } = this.props
        const { profile, repos } = this.state

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
        let mappedRepos = null

        if (repos.length > 0) {
            mappedRepos = repos.map(repo => (
                <li key={repo.name}>
                    <a href={repo.html_url}>{repo.name}</a>
                </li>
            ))
        }

        const gitHubCard = (
            <DeveloperProfileCard title="Repos">
                <ul className="unstyled">{mappedRepos}</ul>
            </DeveloperProfileCard>
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
                        alt="User Gravatar"
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
