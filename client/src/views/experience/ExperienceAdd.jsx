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

import * as userProfileActions from '../../actions/userProfileActions'

class ExperienceAdd extends Component {
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

    static getDerivedStateFromProps(nextProps, prevState) {
        const { errors } = nextProps

        let derivedState = {}

        if (errors) {
            derivedState.errors = errors
        }

        return derivedState
    }

    handleSubmit(e) {
        e.preventDefault()
        const { userProfileActions, history } = this.props
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

        userProfileActions.addExperience(expData, history)
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

ExperienceAdd.propTypes = {
    errors: PropTypes.object.isRequired,
    userProfile: PropTypes.object.isRequired,
    userProfileActions: PropTypes.object.isRequired
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
)(withRouter(ExperienceAdd))
