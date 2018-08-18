import {
    ADD_POST,
    COMMENT_ON_POST,
    DELETE_POST,
    DELETE_COMMENT,
    GET_POST,
    GET_POSTS
} from '../actions/actionTypes'

const initialState = {
    posts: [],
    post: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ADD_POST:
            return { ...state, posts: [payload, ...state.posts] }

        case GET_POST:
            return { ...state, post: payload }

        case GET_POSTS:
            return { ...state, posts: payload }

        case COMMENT_ON_POST:
            return { ...state, post: payload }

        case DELETE_POST:
            const filteredPosts = state.posts.filter((post, idx) => {
                return idx !== action.payload
            })
            return { posts: filteredPosts }

        case DELETE_COMMENT:
            const { post } = state
            const filteredComments = state.post.comments.filter(comment => {
                return comment._id !== action.payload
            })

            return { post: { ...post, comments: filteredComments } }

        default:
            return state
    }
}
