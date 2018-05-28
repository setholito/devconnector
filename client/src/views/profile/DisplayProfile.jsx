import React, { Component } from 'react'

import CenteredContainer from '../../components/layout/CenteredContainer'

class DisplayProfile extends Component {
    render() {
        const { match } = this.props

        return (
            <div className="display-profile">
                <CenteredContainer>
                    <h1 className="title is-1">
                        {match.params.handle}'s Profile
                    </h1>
                </CenteredContainer>
            </div>
        )
    }
}

export default DisplayProfile
