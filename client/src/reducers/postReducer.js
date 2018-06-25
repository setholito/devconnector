import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST
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
            return

        case GET_POSTS:
            return { ...state, posts: payload }

        case DELETE_POST:
            const filteredPosts = state.posts.filter((post, idx) => {
                return idx !== action.payload
            })
            return { posts: filteredPosts }

        default:
            return state
    }
}
