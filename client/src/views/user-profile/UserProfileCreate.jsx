import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as userProfileActions from '../../actions/userProfileActions'

import TextInput from '../../components/form/TextInput'
import TextArea from '../../components/form/TextArea'
import Select from '../../components/form/Select'
import Button from '../../components/elements/Button'
import GoBackLink from '../../components/elements/GoBackLink'

import CenteredContainer from '../../components/layout/CenteredContainer'

import Content from '../../constants/Content'
import Constants from '../../constants/Constants'

class CreateProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displaySocialInputs: false,

            bio: '',
            company: '',
            handle: '',
            location: '',
            skills: '',
            status: '',

            facebook: '',
            githubusername: '',
            instagram: '',
            linkedin: '',
            twitter: '',
            website: '',
            youtube: '',

            errors: {},
            showSocialMediaFlag: false
        }

        this.updateProfileState = this.updateProfileState.bind(this)
        this.sendProfileUpdate = this.sendProfileUpdate.bind(this)
        this.toggleSocialInputs = this.toggleSocialInputs.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { errors } = nextProps
        let derivedState = {}

        if (errors) {
            derivedState.errors = errors
        }

        return derivedState
    }

    updateProfileState(name, value) {
        this.setState({ [name]: value })
    }

    sendProfileUpdate(e) {
        e.preventDefault()
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
        const { history, userProfileActions } = this.props

        const newProfile = {
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

        userProfileActions.createProfile(newProfile, history)
    }

    toggleSocialInputs() {
        this.setState(prevState => ({
            showSocialMediaFlag: !prevState.showSocialMediaFlag
        }))
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
            errors,
            showSocialMediaFlag
        } = this.state

        const socialMediaInputs = (
            <Fragment>
                <hr />
                <TextInput
                    errorText={errors.facebook}
                    label="Facebook"
                    name="facebook"
                    onTextChange={this.updateProfileState}
                    optional
                    value={facebook}
                />
                <TextInput
                    errorText={errors.twitter}
                    label="Twitter"
                    name="twitter"
                    onTextChange={this.updateProfileState}
                    optional
                    value={twitter}
                />
                <TextInput
                    errorText={errors.instagram}
                    label="Instagram"
                    name="instagram"
                    onTextChange={this.updateProfileState}
                    optional
                    value={instagram}
                />
                <TextInput
                    errorText={errors.youtube}
                    label="YouTube"
                    name="youtube"
                    onTextChange={this.updateProfileState}
                    optional
                    value={youtube}
                />
                <TextInput
                    errorText={errors.linkedin}
                    label="LinkedIn"
                    name="linkedin"
                    onTextChange={this.updateProfileState}
                    optional
                    value={linkedin}
                />
            </Fragment>
        )

        const showSocialMediaInputs = showSocialMediaFlag
            ? socialMediaInputs
            : null

        return (
            <section className="section create-profile">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {Content.CREATE_PROFILE_HEADING}
                    </h1>
                    <GoBackLink />
                    <div className="box">
                        <form onSubmit={this.sendProfileUpdate}>
                            <TextInput
                                errorText={errors.handle}
                                label="Handle"
                                name="handle"
                                onTextChange={this.updateProfileState}
                                required
                                value={handle}
                            />
                            <TextArea
                                errorText={errors.bio}
                                label="Bio"
                                name="bio"
                                onTextChange={this.updateProfileState}
                                value={bio}
                            />
                            <TextInput
                                errorText={errors.company}
                                label="Company"
                                name="company"
                                onTextChange={this.updateProfileState}
                                value={company}
                            />
                            <TextInput
                                errorText={errors.location}
                                label="Location"
                                name="location"
                                onTextChange={this.updateProfileState}
                                value={location}
                            />
                            <hr />
                            <TextArea
                                errorText={errors.skills}
                                helpText="Must be comma separated."
                                label="Skills"
                                name="skills"
                                onTextChange={this.updateProfileState}
                                required
                                value={skills}
                            />
                            <Select
                                errorText={errors.status}
                                label="Status"
                                name="status"
                                onTextChange={this.updateProfileState}
                                options={Constants.ARRAY_OF_STATUSES}
                                required
                                value={status}
                            />
                            <hr />
                            <TextInput
                                errorText={errors.website}
                                label="Website URL"
                                name="website"
                                onTextChange={this.updateProfileState}
                                value={website}
                            />
                            <TextInput
                                errorText={errors.githubusername}
                                label="GitHub Username"
                                name="githubusername"
                                onTextChange={this.updateProfileState}
                                value={githubusername}
                            />
                            <Button
                                onClick={this.toggleSocialInputs}
                                text={`${
                                    showSocialMediaFlag ? 'Hide' : 'Show'
                                } Social Inputs`}
                            />
                            {showSocialMediaInputs}
                            <hr />
                            <Button type="submit" className="is-success" />
                        </form>
                    </div>
                </CenteredContainer>
            </section>
        )
    }
}

CreateProfile.propTypes = {
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { errors, profile } = state

    return {
        errors,
        profile
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
)(withRouter(CreateProfile))
