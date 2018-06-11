import React from 'react'
import PropTypes from 'prop-types'

import Card from '../../components/common/Card'

function UserProfileCard({ children, title }) {
    return (
        <div className="profile-card spacer-bottom">
            <Card title={title}>{children}</Card>
        </div>
    )
}

UserProfileCard.defaultProps = {
    title: 'Default Title'
}

UserProfileCard.propTypes = {
    title: PropTypes.string.isRequired
}

export default UserProfileCard
