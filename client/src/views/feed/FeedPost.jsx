import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { Link } from 'react-router-dom'

import Button from '../../components/elements/Button'
import Card from '../../components/common/Card'
import {
    COMMENT_BUTTON,
    DELETE_BUTTON,
    LIKE_BUTTON_TEXT,
    LIKED_BUTTON_TEXT
} from '../../constants/Content'

function FeedPost({
    auth,
    index,
    isLiked,
    post,
    onClickComment,
    onClickDelete,
    onClickLike,
    onClickUnLike
}) {
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
    const dynamicLike = isLiked ? LIKED_BUTTON_TEXT : LIKE_BUTTON_TEXT

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
                    <p>{format(post.date, 'MM/DD/YYYY - hh:mm A')}</p>
                    <p className="spacer-bottom">{post.text}</p>
                    <div className="field is-grouped">
                        <p className="control">
                            <button
                                className={`button is-small is-info ${
                                    isLiked ? '' : 'is-outlined'
                                }`}
                                onClick={isLiked ? onClickUnLike : onClickLike}
                                id={post._id}
                                to={`/likes/${post._id}`}
                            >
                                {dynamicLike} {post.likes.length}
                            </button>
                        </p>
                        <p className="control">
                            <Link
                                id={post._id}
                                to={`/post/${post._id}`}
                                className="button is-small is-success is-outlined"
                            >
                                {COMMENT_BUTTON} {post.comments.length}
                            </Link>
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
