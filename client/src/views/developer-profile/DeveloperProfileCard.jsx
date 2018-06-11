import React from 'react'
import PropTypes from 'prop-types'

import Card from '../../components/common/Card'

function DeveloperProfileCard({ children, title }) {
    return (
        <div className="developer-profile-card spacer-bottom">
            <Card title={title}>{children}</Card>
        </div>
    )
}

DeveloperProfileCard.defaultProps = {
    title: 'Default Title'
}

DeveloperProfileCard.propTypes = {
    title: PropTypes.string.isRequired
}

export default DeveloperProfileCard
