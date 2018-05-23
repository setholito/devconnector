import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextInput from '../../components/form/TextInput'
import TextArea from '../../components/form/TextArea'
import Checkbox from '../../components/form/Checkbox'
import Button from '../../components/elements/Button'
import GoBackLink from '../../components/elements/GoBackLink'
import CenteredContainer from '../../components/layout/CenteredContainer'

import Content from '../../constants/Content'

import * as profileActions from '../../actions/profileActions'

class AddExperience extends Component {
    constructor() {
        super()

        this.state = {
            company: '',
            current: false,
            description: '',
            from: '',
            location: '',
            title: '',
            to: '',

            disabled: false,
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextUpdate = this.handleTextUpdate.bind(this)
        this.onCheckboxClick = this.onCheckboxClick.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const { profileActions, history } = this.props
        const {
            company,
            current,
            description,
            from,
            location,
            title,
            to
        } = this.state

        const expData = {
            company,
            current,
            description,
            from,
            location,
            title,
            to
        }

        profileActions.addExperience(expData, history)
    }

    handleTextUpdate(name, text) {
        this.setState({ [name]: text })
    }

    onCheckboxClick() {
        const { current, disabled } = this.state
        this.setState({
            current: !current,
            disabled: !disabled
        })
    }

    render() {
        const {
            company,
            current,
            description,
            disabled,
            errors,
            from,
            location,
            title,
            to
        } = this.state

        return (
            <section className="section add-experience">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {Content.ADD_EXPERIENCE_HEADING}
                    </h1>
                    <GoBackLink />
                    <div className="box">
                        <form onSubmit={this.handleSubmit}>
                            <TextInput
                                errorText={errors.title}
                                label="Title"
                                name="title"
                                onTextChange={this.handleTextUpdate}
                                required
                                value={title}
                            />
                            <TextInput
                                errorText={errors.company}
                                label="Company"
                                name="company"
                                onTextChange={this.handleTextUpdate}
                                required
                                value={company}
                            />
                            <TextInput
                                errorText={errors.location}
                                label="Location"
                                name="location"
                                onTextChange={this.handleTextUpdate}
                                value={location}
                            />
                            <TextArea
                                errorText={errors.description}
                                label="Description"
                                name="description"
                                onTextChange={this.handleTextUpdate}
                                value={description}
                            />
                            <TextInput
                                errorText={errors.from}
                                label="From Date"
                                name="from"
                                onTextChange={this.handleTextUpdate}
                                required
                                type="date"
                                value={from}
                            />
                            <TextInput
                                errorText={errors.to}
                                disabled={disabled}
                                label="To Date"
                                name="to"
                                onTextChange={this.handleTextUpdate}
                                type="date"
                                value={to}
                            />
                            <Checkbox
                                checked={disabled}
                                label="Current Job"
                                name="current"
                                onClick={this.onCheckboxClick}
                            />
                            <hr />
                            <Button
                                className="is-primary"
                                text="Add Experience"
                                type="submit"
                            />
                        </form>
                    </div>
                </CenteredContainer>
            </section>
        )
    }
}

AddExperience.propTypes = {
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object
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
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(AddExperience)
)
