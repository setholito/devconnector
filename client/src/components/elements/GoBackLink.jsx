import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Url from '../../constants/Url'

function GoBackLink({ history, to }) {
    return (
        <Link className="button is-text go-back-link" to={to}>
            ← Go Back
        </Link>
    )
}

GoBackLink.defaultProps = {
    to: Url.DASHBOARD
}

GoBackLink.propTypes = {
    to: PropTypes.string.isRequired
}

export default GoBackLink
