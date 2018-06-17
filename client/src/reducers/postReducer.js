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
            console.log('ADD_POST')
            break

        case GET_POST:
            console.log('GET_POST')
            break

        case GET_POSTS:
            return { ...state, posts: payload }
            break

        case DELETE_POST:
            console.log('DELETE_POST')
            break

        default:
            return state
    }
}
