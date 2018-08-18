import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as userProfileActions from '../../actions/userProfileActions'

import TextInput from '../../components/form/TextInput'
import TextArea from '../../components/form/TextArea'
import Select from '../../components/form/Select'
import CenteredContainer from '../../components/layout/CenteredContainer'
import GoBackLink from '../../components/elements/GoBackLink'

import Content from '../../constants/Content'
import Constants from '../../constants/Constants'

import Button from '../../components/elements/Button'

class UserProfileEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bio: '',
            company: '',
            handle: '',
            location: '',
            skills: '',
            status: '',
            website: '',
            githubusername: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
            youtube: '',
            errors: {}
        }

        this.handleTextChange = this.handleTextChange.bind(this)
        this.sendProfileUpdate = this.sendProfileUpdate.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { errors, userProfile } = nextProps
        const { profile = {} } = userProfile

        let derivedState = {
            handle: profile.handle,
            bio: profile.bio,
            company: profile.company,
            location: profile.location,
            website: profile.website,
            githubusername: profile.githubusername
        }

        if (errors) {
            derivedState.errors = errors
        }

        if (profile && profile.skills) {
            derivedState.skills = profile.skills.join(',')
        }

        // Pull social links out of social object
        if (profile && profile.social) {
            derivedState.facebook = profile.social.facebook
            derivedState.twitter = profile.social.twitter
            derivedState.youtube = profile.social.youtube
            derivedState.linkedin = profile.social.linkedin
            derivedState.instagram = profile.social.instagram
        }

        return derivedState
    }

    componentDidMount() {
        const { userProfileActions } = this.props
        userProfileActions.getCurrentProfile()
    }

    handleTextChange(name, text) {
        this.setState({ [name]: text })
    }

    sendProfileUpdate(e) {
        e.preventDefault()
        const { history, userProfileActions } = this.props
        const {
            bio,
            company,
            facebook,
            githubusername,
            handle,
            instagram,
            linkedin,
            location,
            skills,
            status,
            twitter,
            website,
            youtube
        } = this.state

        const updatedProfile = {
            bio,
            company,
            facebook,
            githubusername,
            handle,
            instagram,
            linkedin,
            location,
            skills,
            status,
            twitter,
            website,
            youtube
        }

        userProfileActions.updateProfile(updatedProfile, history)
    }

    render() {
        const {
            bio,
            company,
            handle,
            location,
            skills,
            status,
            githubusername,
            website,
            facebook,
            twitter,
            instagram,
            youtube,
            linkedin,
            errors
        } = this.state

        return (
            <section className="section create-profile">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {Content.EDIT_PROFILE_HEADING}
                    </h1>
                    <GoBackLink />
                    <div className="box">
                        <form onSubmit={this.sendProfileUpdate}>
                            <TextInput
                                errorText={errors.handle}
                                label="Handle"
                                name="handle"
                                onTextChange={this.handleTextChange}
                                required
                                value={handle}
                            />
                            <TextArea
                                errorText={errors.bio}
                                label="Bio"
                                name="bio"
                                onTextChange={this.handleTextChange}
                                value={bio}
                            />
                            <TextInput
                                errorText={errors.company}
                                label="Company"
                                name="company"
                                onTextChange={this.handleTextChange}
                                value={company}
                            />
                            <TextInput
                                errorText={errors.location}
                                label="Location"
                                name="location"
                                onTextChange={this.handleTextChange}
                                value={location}
                            />
                            <hr />
                            <TextArea
                                errorText={errors.skills}
                                helpText="Must be comma separated."
                                label="Skills"
                                name="skills"
                                onTextChange={this.handleTextChange}
                                required
                                value={skills}
                            />
                            <Select
                                errorText={errors.status}
                                label="Status"
                                name="status"
                                onTextChange={this.handleTextChange}
                                options={Constants.ARRAY_OF_STATUSES}
                                required
                                value={status}
                            />
                            <hr />
                            <TextInput
                                errorText={errors.website}
                                label="Website URL"
                                name="website"
                                onTextChange={this.handleTextChange}
                                value={website}
                            />
                            <TextInput
                                errorText={errors.githubusername}
                                label="GitHub Username"
                                name="githubusername"
                                onTextChange={this.handleTextChange}
                                value={githubusername}
                            />
                            <hr />
                            <TextInput
                                errorText={errors.facebook}
                                label="Facebook"
                                name="facebook"
                                onTextChange={this.handleTextChange}
                                optional
                                value={facebook}
                            />
                            <TextInput
                                errorText={errors.twitter}
                                label="Twitter"
                                name="twitter"
                                onTextChange={this.handleTextChange}
                                optional
                                value={twitter}
                            />
                            <TextInput
                                errorText={errors.instagram}
                                label="Instagram"
                                name="instagram"
                                onTextChange={this.handleTextChange}
                                optional
                                value={instagram}
                            />
                            <TextInput
                                errorText={errors.youtube}
                                label="YouTube"
                                name="youtube"
                                onTextChange={this.handleTextChange}
                                optional
                                value={youtube}
                            />
                            <TextInput
                                errorText={errors.linkedin}
                                label="LinkedIn"
                                name="linkedin"
                                onTextChange={this.handleTextChange}
                                optional
                                value={linkedin}
                            />
                            <hr />
                            <Button
                                className="is-success"
                                text="Update"
                                type="submit"
                            />
                        </form>
                    </div>
                </CenteredContainer>
            </section>
        )
    }
}

UserProfileEdit.propTypes = {
    errors: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { errors, userProfile } = state

    return {
        errors,
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
)(withRouter(UserProfileEdit))
