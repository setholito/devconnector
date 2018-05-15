import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextInput from '../form/TextInput'
import TextArea from '../form/TextArea'
import Select from '../form/Select'
import CenteredContainer from '../layout/CenteredContainer'
import Content from '../../constants/Content'
import Constants from '../../constants/Constants'
import Button from '../elements/Button'

class CreateProfile extends Component {
    constructor() {
        super()

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

            errors: {}
        }

        this.updateProfileState = this.updateProfileState.bind(this)
        this.sendProfileUpdate = this.sendProfileUpdate.bind(this)
    }

    updateProfileState(id, value) {
        this.setState({ [id]: value })
    }

    sendProfileUpdate() {
        alert('Profile update sent!')
    }

    render() {
        const { errors } = this.state

        return (
            <section className="section create-profile">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {Content.CREATE_PROFILE_TITLE}
                    </h1>
                    <form onSubmit={this.sendProfileUpdate}>
                        <TextInput
                            errorText={errors.handle}
                            id="handle"
                            label="Handle"
                            onTextChange={this.updateProfileState}
                        />
                        <TextArea
                            errorText={errors.bio}
                            helpText="Tell us a little about yourself."
                            id="bio"
                            label="Bio"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.company}
                            id="company"
                            label="Company"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.location}
                            id="location"
                            label="Location"
                            onTextChange={this.updateProfileState}
                        />
                        <hr />
                        <TextArea
                            errorText={errors.skills}
                            id="skills"
                            label="Skills"
                            onTextChange={this.updateProfileState}
                        />
                        <Select
                            errorText={errors.status}
                            id="status"
                            label="Status"
                            options={Constants.ARRAY_OF_STATUSES}
                            onTextChange={this.updateProfileState}
                        />
                        <hr />
                        <TextInput
                            errorText={errors.website}
                            id="website"
                            label="Website URL"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.githubusername}
                            id="githubusername"
                            label="GitHub Username"
                            onTextChange={this.updateProfileState}
                        />
                        <hr />
                        <TextInput
                            errorText={errors.facebook}
                            id="facebook"
                            label="Facebook"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.twitter}
                            id="twitter"
                            label="Twitter"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.instagram}
                            id="instagram"
                            label="Instagram"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.youtube}
                            id="youtube"
                            label="YouTube"
                            onTextChange={this.updateProfileState}
                        />
                        <TextInput
                            errorText={errors.linkedin}
                            id="linkedin"
                            label="LinkedIn"
                            onTextChange={this.updateProfileState}
                        />
                        <Button type="submit" />
                    </form>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile)
