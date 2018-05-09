import React from 'react'
import PropTypes from 'prop-types'

function Footer({}) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="content has-text-centered">
                    <p>Super Awesome Footer!</p>
                </div>
            </div>
        </footer>
    )
}

Footer.defaultProps = {
    // myProp: 'String'
}

Footer.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default Footer
