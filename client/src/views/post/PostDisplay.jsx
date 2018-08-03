import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as postActions from '../../actions/postActions'
import * as userProfileActions from '../../actions/userProfileActions'

import CenteredContainer from '../../components/layout/CenteredContainer'

import Spinner from '../../components/common/Spinner'

import Button from '../../components/elements/Button'
import GoBackLink from '../../components/elements/GoBackLink'

import TextAreaCharCount from '../../components/form/TextAreaCharCount'

import { FEED } from '../../constants/Url'

import { getSafe } from '../../utils/utilFunctions'

class PostDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {},
            newComment: ''
        }

        this.handleTextUpdate = this.handleTextUpdate.bind(this)
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    componentDidMount() {
        const { postActions, match, userProfileActions } = this.props

        postActions.getPost(match.params.id)
        userProfileActions.getCurrentProfile()
    }

    handleTextUpdate(name, text) {
        this.setState({ [name]: text })
    }

    handleCommentSubmit(e) {
        e.preventDefault()

        const { match, postActions, userProfile } = this.props
        const { newComment } = this.state

        const { profile } = userProfile

        const commentData = {
            avatar: profile.user.avatar,
            handle: profile.handle,
            text: newComment
        }

        postActions.addComment(commentData, match.params.id)
    }

    deleteComment(e) {
        const { id } = e.target
        const { match, postActions } = this.props

        postActions.deleteComment(match.params.id, id)
    }

    render() {
        const { loadingStatus, post } = this.props
        const { errors, newComment } = this.state

        const postComp = (
            <Fragment>
                <p>
                    <strong>{getSafe(() => post.handle)}:</strong>
                </p>
                <p>{getSafe(() => post.text)}</p>
            </Fragment>
        )
        const showSpinner = loadingStatus ? <Spinner /> : postComp

        const listComments = (comments = []) => {
            const mappedComments = comments.map(c => {
                return (
                    <li key={c.text}>
                        <div className="box">
                            <p>
                                <strong>{c.handle}</strong>
                            </p>
                            <p>{c.text}</p>
                            <Button
                                onClick={this.deleteComment}
                                className="is-danger is-small"
                                text="Delete"
                                id={c._id}
                            />
                        </div>
                    </li>
                )
            })

            const showComments =
                comments.length === 0 ? (
                    <h5 className="title is-5 faded">No comments.</h5>
                ) : (
                    mappedComments
                )

            return <ul className="comment-list">{showComments}</ul>
        }

        return (
            <section className="section post-display">
                <CenteredContainer>
                    <h1 className="title h1">Post</h1>
                    <GoBackLink to={FEED} />
                    <div className="box spacer-bottom">{showSpinner}</div>
                    <form onSubmit={this.handleCommentSubmit}>
                        <TextAreaCharCount
                            errorText={errors.text}
                            label="Write a new comment:"
                            maxLength={280}
                            name="newComment"
                            onTextChange={this.handleTextUpdate}
                            value={newComment}
                        />
                        <Button
                            className="is-primary"
                            text="Add Comment"
                            type="submit"
                        />
                    </form>
                    <hr />
                    <h3 className="title is-3">Comments:</h3>
                    {listComments(post.comments)}
                </CenteredContainer>
            </section>
        )
    }
}

PostDisplay.propTypes = {
    auth: PropTypes.object,
    loadingStatus: PropTypes.boolean,
    post: PropTypes.object,
    userProfile: PropTypes.object
}

function mapStateToProps(state) {
    const { auth, userProfile } = state
    const { status: loadingStatus } = state.loading
    const { post } = state.post

    return {
        auth,
        loadingStatus,
        post,
        userProfile
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
)(PostDisplay)
