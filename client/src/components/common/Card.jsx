import React from 'react'
import PropTypes from 'prop-types'

function Card({ children, className, title }) {
    const filterCardLinks = React.Children.toArray(children).filter(
        item => item.props['card-link'] === 'true'
    )

    const filterChildren = React.Children.toArray(children).filter(
        item => item.props['card-link'] === undefined
    )

    return (
        <div className={`card ${className}`}>
            <header className="card-header">
                <p className="card-header-title">{title}</p>
            </header>
            <div className="card-content">
                <div className="content">{filterChildren}</div>
            </div>
            <footer className="card-footer">{filterCardLinks}</footer>
        </div>
    )
}

Card.defaultProps = {
    className: ''
}

Card.propTypes = {
    cardLinks: PropTypes.array,
    className: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default Card
