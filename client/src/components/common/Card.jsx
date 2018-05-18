import React from 'react'
import PropTypes from 'prop-types'

function Card({ children, title }) {
    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">{title}</p>
            </header>
            <div className="card-content">
                <div className="content">{children}</div>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item">
                    Update
                </a>
                <a href="#" className="card-footer-item">
                    Share
                </a>
            </footer>
        </div>
    )
}

Card.defaultProps = {
    // myProp: 'String'
}

Card.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default Card
