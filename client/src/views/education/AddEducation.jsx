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

class AddEducation extends Component {
    constructor() {
        super()

        this.state = {
            current: false,
            degree: '',
            description: '',
            fieldofstudy: '',
            from: '',
            school: '',
            to: '',

            disableToField: false,
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
        const { profileActions, history } = this.props
        const {
            current,
            degree,
            description,
            fieldofstudy,
            from,
            school,
            to
        } = this.state

        const eduData = {
            current,
            degree,
            description,
            fieldofstudy,
            from,
            school,
            to
        }

        profileActions.addEducation(eduData, history)
    }

    handleTextUpdate(name, text) {
        this.setState({ [name]: text })
    }

    onCheckboxClick() {
        const { current, disableToField } = this.state

        this.setState({
            current: !current,
            disableToField: !disableToField
        })
    }

    render() {
        const {
            current,
            degree,
            description,
            disableToField,
            fieldofstudy,
            from,
            school,
            to,
            errors
        } = this.state

        return (
            <section className="section add-experience">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {Content.ADD_EDUCATION_HEADING}
                    </h1>
                    <GoBackLink />
                    <div className="box">
                        <form onSubmit={this.handleSubmit}>
                            <TextInput
                                errorText={errors.school}
                                label="School"
                                name="school"
                                onTextChange={this.handleTextUpdate}
                                required
                                value={school}
                            />
                            <TextInput
                                errorText={errors.fieldofstudy}
                                label="Field of Study"
                                name="fieldofstudy"
                                onTextChange={this.handleTextUpdate}
                                required
                                value={fieldofstudy}
                            />
                            <TextInput
                                errorText={errors.degree}
                                label="Degree"
                                name="degree"
                                onTextChange={this.handleTextUpdate}
                                required
                                value={degree}
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
                                disabled={disableToField}
                                label="To Date"
                                name="to"
                                onTextChange={this.handleTextUpdate}
                                required
                                type="date"
                                value={to}
                            />
                            <Checkbox
                                checked={disableToField}
                                label="Current Student"
                                name="current"
                                onClick={this.onCheckboxClick}
                            />
                            <hr />
                            <Button
                                className="is-primary"
                                text="Add Education"
                                type="submit"
                            />
                        </form>
                    </div>
                </CenteredContainer>
            </section>
        )
    }
}

AddEducation.propTypes = {
    history: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired
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
    withRouter(AddEducation)
)
