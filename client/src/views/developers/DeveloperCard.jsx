import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Card from '../../components/common/Card'

function DeveloperCard({ dev }) {
    const mappedSkills = dev.skills.map(skill => (
        <span key={skill} className="tag is-info spacer-right">
            {skill}
        </span>
    ))

    return (
        <div className="dashboard-card spacer-bottom">
            <Card title={dev.handle} cardLinks={[]}>
                <div className="columns">
                    <div className="column is-4">
                        <img
                            src={dev.user.avatar}
                            alt={`${dev.handle}'s profile'`}
                        />
                    </div>
                    <div className="column is-8">
                        <ul className="unstyled">
                            <li>
                                <strong>Company</strong>: {dev.company}
                            </li>
                            <li>
                                <strong>Skills</strong>: {mappedSkills}
                            </li>
                            <li>
                                <strong>Website</strong>: {dev.website}
                            </li>
                            <li>
                                <strong>Location</strong>: {dev.location}
                            </li>
                            <li>
                                <strong>Status</strong>: {dev.status}
                            </li>
                            <li>
                                <Link to={`/profile/handle/${dev.handle}`}>
                                    See Profile >
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}

DeveloperCard.defaultProps = {
    dev: {}
}

DeveloperCard.propTypes = {
    dev: PropTypes.object.isRequired
}

export default DeveloperCard
