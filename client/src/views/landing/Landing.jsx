import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Content from '../../constants/Content'
import Url from '../../constants/Url'

import Hero from '../../components/layout/Hero'

class SplashPage extends Component {
    componentDidMount() {
        const { history, auth } = this.props
        const { isAuthenticated } = auth

        if (isAuthenticated) {
            history.push(Url.DASHBOARD)
        }
    }

    render() {
        return (
            <div className="splash-page">
                <Hero>
                    <Link to={Url.REGISTER} className="button">
                        <span>{Content.REGISTER}</span>
                    </Link>
                    {'\xa0'}
                    <Link to={Url.LOGIN} className="button">
                        <span>{Content.LOGIN}</span>
                    </Link>
                </Hero>
            </div>
        )
    }
}

SplashPage.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const { auth } = state

    return {
        auth
    }
}

export default connect(mapStateToProps, null)(SplashPage)
