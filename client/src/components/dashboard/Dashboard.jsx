import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as profileActions from '../../actions/profileActions'
import Content from '../../constants/Content'

class Dashboard extends Component {
    componentDidMount() {
        const { profileActions } = this.props
        profileActions.getCurrentProfile()
    }

    render() {
        return (
            <div className="dashboard container">
                <div className="columns">
                    <div className="column is-12">
                        <h1 className="title is-1">{Content.DASHBOARD}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.defaultProps = {
    // myProp: 'String'
}

Dashboard.propTypes = {
    // myProp: PropTypes.string.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)
