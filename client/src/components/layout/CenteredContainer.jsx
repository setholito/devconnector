import React from 'react'

function CenteredContainer({ children }) {
    return (
        <div className="container">
            <div className="columns">
                <div className="column is-6 is-offset-3">{children}</div>
            </div>
        </div>
    )
}

export default CenteredContainer
