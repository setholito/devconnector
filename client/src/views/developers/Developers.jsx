import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as developerActions from '../../actions/developerActions'

import DeveloperCard from './DeveloperCard'

import Spinner from '../../components/common/Spinner'

class Developers extends Component {
    componentDidMount() {
        const { developerActions } = this.props
        developerActions.getDevelopers()
    }

    render() {
        const { developers, loading } = this.props

        const showLoader = loading.status ? <Spinner /> : null
        const mappedCards = developers.map((dev, idx) => {
            return (
                <div key={idx} className="column is-4">
                    <DeveloperCard dev={dev} />
                </div>
            )
        })

        return (
            <section className="section all-developers">
                <h1 className="title is-1">Developers</h1>
                <div className="columns is-multiline">
                    {showLoader}
                    {mappedCards}
                </div>
            </section>
        )
    }
}

Developers.defaultProps = {
    developers: []
}

Developers.propTypes = {
    developerActions: PropTypes.object.isRequired,
    developers: PropTypes.array.isRequired,
    loading: PropTypes.object
}

function mapStateToProps(state) {
    const { developers, loading } = state

    return {
        developers,
        loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        developerActions: bindActionCreators(developerActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Developers)
