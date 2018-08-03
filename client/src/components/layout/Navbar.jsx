import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as authActions from '../../actions/authActions'
import * as userProfileActions from '../../actions/userProfileActions'

import Content from '../../constants/Content'
import Url from '../../constants/Url'

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
        this.logoutClick = this.logoutClick.bind(this)
    }

    toggleMenu() {
        const { isOpen } = this.state
        this.setState({ isOpen: !isOpen })
    }

    logoutClick(e) {
        e.preventDefault()
        const { authActions, history, userProfileActions } = this.props

        authActions.logoutUser()
        userProfileActions.clearCurrentProfile()

        history.push(Url.LOGIN)
    }

    render() {
        const { auth } = this.props
        const { isAuthenticated, user } = auth

        const { isOpen } = this.state

        const startSectionLinks = (
            <div className="navbar-start">
                <Link to={Url.DASHBOARD} className="navbar-item">
                    {Content.DASHBOARD_HEADING}
                </Link>
                <Link to={Url.DEVELOPERS} className="navbar-item">
                    {Content.DEVELOPERS_LINK_TEXT}
                </Link>
                <Link to={Url.FEED} className="navbar-item">
                    {Content.FEED_LINK_TEXT}
                </Link>
            </div>
        )

        const authLinks = (
            <div className="navbar-end">
                <Link className="navbar-item" to={Url.USER_PROFILE_DISPLAY}>
                    <img
                        className="circle"
                        src={user.avatar}
                        alt={`${user.name} - Gravatar`}
                        title={`${user.name} - Gravatar`}
                    />
                    {'\xa0'}
                    {Content.PROFILE}
                </Link>
                <a href="" onClick={this.logoutClick} className="navbar-item">
                    {Content.LOGOUT}
                </a>
            </div>
        )

        const guestLinks = (
            <div className="navbar-end">
                <Link to={Url.REGISTER} className="navbar-item">
                    {Content.REGISTER}
                </Link>
                <Link to={Url.LOGIN} className="navbar-item">
                    {Content.LOGIN}
                </Link>
            </div>
        )

        const dynamicLinksStart = isAuthenticated ? startSectionLinks : null
        const dynamicLinksEnd = isAuthenticated ? authLinks : guestLinks

        return (
            <nav
                className="navbar is-fixed-top is-info"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        {Content.SITE_TITLE}
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
                    {dynamicLinksStart}
                    {dynamicLinksEnd}
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { auth } = state

    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userProfileActions: bindActionCreators(userProfileActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Navbar))
