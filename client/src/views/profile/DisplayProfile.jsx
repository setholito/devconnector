import React, { Component } from 'react'

class DisplayProfile extends Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <h1 className="title is-1">{match.params.handle}'s Profile</h1>
            </div>
        )
    }
}

export default DisplayProfile
