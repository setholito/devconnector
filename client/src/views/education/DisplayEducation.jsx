import React, { Component } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import Table from '../../components/elements/Table'
import Row from '../../components/elements/Row'
import Button from '../../components/elements/Button'

class DisplayEducation extends Component {
    render() {
        const { education, deleteEducation } = this.props
        const mappedEducationRows = education.map((edu, idx) => {
            return (
                <Row key={edu.school}>
                    <div>{edu.school}</div>
                    <div>{edu.degree}</div>
                    <div>{edu.fieldofstudy}</div>
                    <div>{format(edu.from, 'MM/DD/YYYY')}</div>
                    <div>{format(edu.to, 'MM/DD/YYYY')}</div>
                    <div>{edu.current}</div>
                    <div>{edu.description}</div>
                    <div>
                        <Button
                            id={edu._id}
                            text="Delete"
                            className="is-danger is-outlined"
                            onClick={deleteEducation}
                        />
                    </div>
                </Row>
            )
        })

        return (
            <div className="display-education">
                <Table>
                    <Row header>
                        <div>School</div>
                        <div>Degree</div>
                        <div>Field of Study</div>
                        <div>From Date</div>
                        <div>To Date</div>
                        <div>Current</div>
                        <div>Description</div>
                        <div>Delete</div>
                    </Row>
                    {mappedEducationRows}
                </Table>
            </div>
        )
    }
}

DisplayEducation.defaultProps = {
    education: []
}

DisplayEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default DisplayEducation
