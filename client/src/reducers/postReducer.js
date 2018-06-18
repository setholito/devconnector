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
            return { ...state, posts: [...state.posts, payload] }
            break

        case GET_POST:
            break

        case GET_POSTS:
            return { ...state, posts: payload }
            break

        case DELETE_POST:
            const filteredPosts = state.posts.filter(
                (post, idx) => idx !== action.index
            )
            return { posts: filteredPosts }
            break

        default:
            return state
    }
}
