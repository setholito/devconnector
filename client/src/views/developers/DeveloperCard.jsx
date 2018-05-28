import React from 'react'
import PropTypes from 'prop-types'

import Card from '../../components/common/Card'

function DeveloperCard({ dev }) {
    const mappedSkills = dev.skills.map(skill => (
        <span key={skill} className="tag is-info spacer-right">
            {skill}
        </span>
    ))

    console.log(dev.social)
    // const devLinks = Object.keys(dev.social).map(link => dev.social[link])

    return (
        <div className="dashboard-card spacer-bottom">
            <Card title={dev.handle} cardLinks={[]}>
                <div className="columns">
                    <div className="column is-4">
                        <img
                            src={dev.user.avatar}
                            alt={`${dev.handle}'s profile picture'`}
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
