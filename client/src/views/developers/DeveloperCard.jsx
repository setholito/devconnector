import React from 'react'
import PropTypes from 'prop-types'

import Card from '../../components/common/Card'

function DeveloperCard({ dev }) {
    return (
        <div className="dashboard-card spacer-bottom">
            <Card title={dev.handle}>
                <div className="columns">
                    <div className="column is-4">
                        <img
                            src={dev.user.avatar}
                            alt={`${dev.handle}'s profile picture'`}
                        />
                    </div>
                    <div className="column is-8">
                        <ul className="unstyled">
                            <li>{dev.company}</li>
                            <li>{dev.name}</li>
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
