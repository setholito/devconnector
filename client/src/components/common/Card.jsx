import React from 'react'
import PropTypes from 'prop-types'

function Card({ cardLinks, children, className, title }) {
    const footerLinks = cardLinks.map((item, idx) => {
        return (
            <a href={item.link} className="card-footer-item">
                {item.text}
            </a>
        )
    })

    return (
        <div className={`card ${className}`}>
            <header className="card-header">
                <p className="card-header-title">{title}</p>
            </header>
            <div className="card-content">
                <div className="content">{children}</div>
            </div>
            <footer className="card-footer">{footerLinks}</footer>
        </div>
    )
}

Card.defaultProps = {
    cardLinks: [],
    className: ''
}

Card.propTypes = {
    cardLinks: PropTypes.array,
    className: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default Card
