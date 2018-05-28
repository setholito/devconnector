import React, { Component } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import Table from '../../components/elements/Table'
import Row from '../../components/elements/Row'
import Button from '../../components/elements/Button'

class DisplayExperience extends Component {
    render() {
        const { experience, deleteExperience } = this.props
        const mappedExperienceRows = experience.map((exp, idx) => {
            return (
                <Row key={exp.title}>
                    <div>{exp.title}</div>
                    <div>{exp.company}</div>
                    <div>{exp.location}</div>
                    <div>{format(exp.from, 'MM/DD/YYYY')}</div>
                    <div>{format(exp.to, 'MM/DD/YYYY')}</div>
                    <div>{exp.current}</div>
                    <div>{exp.description}</div>
                    <div>
                        <Button
                            id={exp._id}
                            text="Delete"
                            className="is-danger is-outlined"
                            onClick={deleteExperience}
                        />
                    </div>
                </Row>
            )
        })

        return (
            <div className="display-experience">
                <Table>
                    <Row header>
                        <div>Title</div>
                        <div>Company</div>
                        <div>Location</div>
                        <div>From Date</div>
                        <div>To Date</div>
                        <div>Current</div>
                        <div>Description</div>
                        <div>Delete</div>
                    </Row>
                    {mappedExperienceRows}
                </Table>
            </div>
        )
    }
}

DisplayExperience.defaultProps = {
    experience: []
}

DisplayExperience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default DisplayExperience
