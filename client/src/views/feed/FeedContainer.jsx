import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as postActions from '../../actions/postActions'

import { getSafe } from '../../utils/utilFunctions'

import format from 'date-fns/format'

import TextAreaCharCount from '../../components/form/TextAreaCharCount'
import CenteredContainer from '../../components/layout/CenteredContainer'
import Button from '../../components/elements/Button'
import Spinner from '../../components/common/Spinner'

import Content from '../../constants/Content'
import isEmpty from '../../validation/is-empty'

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
        this.onPostDelete = this.onPostDelete.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        const { errors } = props

        let derivedState = {}

        if (!isEmpty(errors)) {
            derivedState.errors = { ...errors }
        } else {
            derivedState.errors = {}
        }

        return derivedState
    }

    componentDidMount() {
        const { postActions } = this.props
        postActions.getPosts()
    }

    handleTextUpdate(name, text) {
        this.setState({ [name]: text })
    }

    onFormSubmit(e) {
        e.preventDefault()

        const { auth, postActions } = this.props
        const { newPost } = this.state

        postActions.addPost({
            avatar: auth.user.avatar,
            name: '',
            text: newPost,
            user: ''
        })

        this.setState({ newPost: '' })
    }

    onPostDelete(e) {
        e.preventDefault()
        const { postActions } = this.props
        const { id, dataset } = e.target

        postActions.deletePost(id, dataset.index)
    }

    render() {
        const { errors, newPost } = this.state
        const { auth, loadingStatus, posts } = this.props

        const mappedPosts = posts.map((post, idx) => {
            const showDelete =
                auth.user.id === post.user ? (
                    <Button
                        className="is-small is-danger is-outlined"
                        data-index={idx}
                        id={post._id}
                        onClick={this.onPostDelete}
                        text={Content.DELETE_BUTTON}
                    />
                ) : null

            return (
                <div key={idx} className="box">
                    <div className="columns">
                        <div className="column is-narrow">
                            <img
                                className="circle"
                                src={post.avatar}
                                width="50"
                                height="50"
                            />
                        </div>
                        <div className="column">
                            <p>
                                <strong>{Content.FEED_DATE}:</strong>{' '}
                                {format(post.date, 'MM/DD/YYYY')}
                            </p>
                            <p>
                                <strong>{Content.FEED_COMMENTS}:</strong>{' '}
                                {post.comments.length}
                            </p>
                            <p>
                                <strong>{Content.FEED_LIKES}:</strong>{' '}
                                {post.likes.length}
                            </p>
                            <p className="spacer-bottom">
                                <strong>{Content.FEED_CONTENT}:</strong>
                                <br />
                                {post.text}
                            </p>
                            <div className="field is-grouped">
                                <p className="control">
                                    <Button
                                        className="is-small is-info is-outlined"
                                        data-index={idx}
                                        id={post._id}
                                        onClick={this.onPostDelete}
                                        text={Content.COMMENT_BUTTON}
                                    />
                                </p>
                                <p className="control">{showDelete}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        const showSpinner = loadingStatus ? <Spinner /> : null

        return (
            <section className="section feed-container">
                <div className="columns">
                    <div className="column is-4">
                        <div className="box">
                            <form onSubmit={this.onFormSubmit}>
                                <TextAreaCharCount
                                    errorText={errors.text}
                                    label="Post Something"
                                    maxLength={280}
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

FeedContainer.propTypes = {
    auth: PropTypes.object,
    loadingStatus: PropTypes.bool,
    posts: PropTypes.array
}

function mapStateToProps(state) {
    const { auth, errors, loading, post } = state

    const { status: loadingStatus } = loading
    const { posts } = post

    return {
        auth,
        loadingStatus,
        errors,
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
