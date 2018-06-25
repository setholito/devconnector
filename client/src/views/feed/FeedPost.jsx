import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import Button from '../../components/elements/Button'
import Card from '../../components/common/Card'
import {
    COMMENT_BUTTON,
    DELETE_BUTTON,
    FEED_COMMENTS,
    FEED_CONTENT,
    FEED_DATE,
    FEED_LIKES
} from '../../constants/Content'

function FeedPost({ auth, index, post, onClickDelete, onClickComment }) {
    const showDelete =
        auth.user.id === post.user ? (
            <Button
                className="is-small is-danger is-outlined"
                data-index={index}
                id={post._id}
                onClick={onClickDelete}
                text={DELETE_BUTTON}
            />
        ) : null

    return (
        <Card className="spacer-bottom" title={`${post.handle} posted:`}>
            <div className="columns">
                <div className="column is-narrow">
                    <img
                        alt="User Gravatar"
                        className="circle"
                        height="50"
                        src={post.avatar}
                        width="50"
                    />
                </div>
                <div className="column">
                    <p className="spacer-bottom">
                        <strong>{FEED_CONTENT}:</strong>
                        <br />
                        {post.text}
                    </p>
                </div>
                <div className="column is-6">
                    <p>
                        <strong>{FEED_DATE}:</strong>{' '}
                        {format(post.date, 'MM/DD/YYYY')}
                    </p>
                    <p>
                        <strong>{FEED_COMMENTS}:</strong> {post.comments.length}
                    </p>
                    <p>
                        <strong>{FEED_LIKES}:</strong> {post.likes.length}
                    </p>
                    <div className="field is-grouped">
                        <p className="control">
                            <Button
                                className="is-small is-info is-outlined"
                                data-index={index}
                                id={post._id}
                                onClick={onClickComment}
                                text={COMMENT_BUTTON}
                            />
                        </p>
                        <p className="control">{showDelete}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

FeedPost.propTypes = {
    post: PropTypes.object.isRequired
}

export default FeedPost
