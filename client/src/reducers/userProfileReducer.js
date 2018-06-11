import { CLEAR_CURRENT_PROFILE, GET_USER_PROFILE } from '../actions/actionTypes'

const initialState = {}

export default function(state = initialState, action) {
    const { profile, type } = action
    switch (type) {
        case GET_USER_PROFILE:
            return { ...state, profile }

        case CLEAR_CURRENT_PROFILE:
            return { ...state }

        default:
            return state
    }
}
