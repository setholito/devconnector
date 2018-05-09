import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor() {
        super()

        this.state = {
            isOpen: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu() {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }

    render() {
        const { children } = this.props
        const { isOpen } = this.state

        return (
            <nav
                className="navbar is-fixed-top is-info"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        DevConnector
                    </Link>
                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        onClick={this.toggleMenu}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
                    <div className="navbar-start" />
                    <div className="navbar-end">{children}</div>
                </div>
            </nav>
        )
    }
}

Navbar.defaultProps = {
    // myProp: 'String'
}

Navbar.propTypes = {
    // myProp: PropTypes.string.isRequired
}

export default Navbar
