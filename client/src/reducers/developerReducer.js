import { GET_ALL_DEVELOPERS } from '../actions/actionTypes'

const initialState = []

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DEVELOPERS:
            return [...action.payload]

        default:
            return state
    }
}
