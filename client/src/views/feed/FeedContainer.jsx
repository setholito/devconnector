import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as postActions from '../../actions/postActions'

import format from 'date-fns/format'

import TextArea from '../../components/form/TextArea'
import CenteredContainer from '../../components/layout/CenteredContainer'
import Button from '../../components/elements/Button'
import Spinner from '../../components/common/Spinner'

class FeedContainer extends Component {
    constructor() {
        super()

        this.state = {
            errors: {},
            newPost: '',
            posts: []
        }

        this.handleTextUpdate = this.handleTextUpdate.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    handleTextUpdate(name, text) {
        this.setState({ [name]: text })
    }

    onFormSubmit(e) {
        e.preventDefault()
        const { postActions } = this.props
        const { newPost } = this.state

        postActions.addPost({ text: newPost })
    }

    componentDidMount() {
        const { postActions } = this.props

        postActions.getPosts()
    }

    render() {
        const { errors, newPost } = this.state
        const { posts } = this.props

        const mappedPosts = posts.map(post => (
            <div key={post.text} className="box">
                <p>Date: {format(post.date, 'MM/DD/YYYY')}</p>
                <p>Comments: {post.comments.length}</p>
                <p>Likes: {post.likes.length}</p>
                <p>{post.text}</p>
            </div>
        ))

        const showSpinner = posts.length === 0 ? <Spinner /> : null

        return (
            <section className="section feed-container">
                <div className="columns">
                    <div className="column is-4">
                        <div className="box">
                            <form onSubmit={this.onFormSubmit}>
                                <TextArea
                                    errorText={errors.firstName}
                                    label="Post Something"
                                    name="newPost"
                                    onTextChange={this.handleTextUpdate}
                                    value={newPost}
                                />
                                <Button
                                    className="is-primary"
                                    text="Post"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="column is-8">
                        {showSpinner}
                        {mappedPosts}
                    </div>
                </div>
            </section>
        )
    }
}

FeedContainer.defaultProps = {
    // myProp: 'String'
}

FeedContainer.propTypes = {
    // myProp: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    const { posts } = state.post

    return {
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(postActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedContainer)
