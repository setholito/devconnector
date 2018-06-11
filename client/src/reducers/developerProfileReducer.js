import { GET_DEVELOPER_PROFILE } from '../actions/actionTypes'

const initialState = {}

export default function(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_DEVELOPER_PROFILE:
            return { ...state, payload }
        default:
            return state
    }
}
