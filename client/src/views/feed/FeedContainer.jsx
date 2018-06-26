import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as postActions from '../../actions/postActions'
import * as userProfileActions from '../../actions/userProfileActions'

import TextAreaCharCount from '../../components/form/TextAreaCharCount'
import SectionSplitter from '../../components/layout/SectionSplitter'
import Spinner from '../../components/common/Spinner'
import Button from '../../components/elements/Button'
import FeedPost from './FeedPost'

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
        this.formSubmit = this.formSubmit.bind(this)
        this.postComment = this.postComment.bind(this)
        this.postDelete = this.postDelete.bind(this)
        this.postLike = this.postLike.bind(this)
        this.postUnLike = this.postUnLike.bind(this)
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
        const { postActions, userProfile, userProfileActions } = this.props
        postActions.getPosts()

        // NEEDS REFACTOR
        if (isEmpty(userProfile)) {
            userProfileActions.getCurrentProfile()
        }
    }

    handleTextUpdate(name, text) {
        this.setState({ [name]: text })
    }

    formSubmit(e) {
        e.preventDefault()

        const { auth, postActions, userProfile } = this.props
        const { newPost } = this.state
        const { avatar, _id } = auth.user
        const { handle } = userProfile.profile

        postActions.addPost({
            avatar,
            handle,
            text: newPost,
            user: _id
        })

        this.setState({ newPost: '' })
    }

    postComment(e) {
        e.preventDefault('Comment!')
    }

    postDelete(e) {
        e.preventDefault()
        const { postActions } = this.props
        const { id, dataset } = e.target

        postActions.deletePost(id, Number(dataset.index))
    }

    postLike(e) {
        e.preventDefault()
        const { id } = e.target
        const { postActions } = this.props

        postActions.likePost(id)
    }

    postUnLike(e) {
        e.preventDefault()
        const { id } = e.target
        const { postActions } = this.props

        postActions.unLikePost(id)
    }

    render() {
        const { errors, newPost } = this.state
        const { auth, loadingStatus, posts } = this.props

        const mappedPosts = posts.map((post, idx) => {
            const postLiked = post.likes.some(like => {
                return like.user === auth.user.id
            })

            return (
                <FeedPost
                    key={post._id}
                    auth={auth}
                    post={post}
                    index={idx}
                    onClickComment={this.postComment}
                    onClickDelete={this.postDelete}
                    onClickLike={this.postLike}
                    onClickUnLike={this.postUnLike}
                    isLiked={postLiked}
                />
            )
        })

        const toggleLoaderMappedCards = loadingStatus ? (
            <Spinner />
        ) : posts.length > 0 ? (
            mappedPosts
        ) : (
            <div className="box">
                <h5 className="title is-5 faded">
                    There are no posts. You should write one.
                </h5>
            </div>
        )

        return (
            <SectionSplitter
                left={
                    <Fragment>
                        <h1 className="title is-1">Feed</h1>
                        <div className="box">
                            <form onSubmit={this.formSubmit}>
                                <TextAreaCharCount
                                    errorText={errors.text}
                                    label="Write a new post:"
                                    maxLength={280}
                                    name="newPost"
                                    onTextChange={this.handleTextUpdate}
                                    value={newPost}
                                />
                                <Button
                                    className="is-primary"
                                    text="Add Post"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </Fragment>
                }
                right={toggleLoaderMappedCards}
            />
        )
    }
}

FeedContainer.propTypes = {
    auth: PropTypes.object,
    loadingStatus: PropTypes.bool,
    posts: PropTypes.array
}

function mapStateToProps(state) {
    const { auth, errors, loading, post, userProfile } = state

    const { status: loadingStatus } = loading
    // NEEDS REFACTOR
    const { posts } = post

    return {
        auth,
        loadingStatus,
        userProfile,
        errors,
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postActions: bindActionCreators(postActions, dispatch),
        userProfileActions: bindActionCreators(userProfileActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedContainer)
