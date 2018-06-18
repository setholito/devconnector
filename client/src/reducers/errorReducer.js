import { CLEAR_ERRORS, GET_ERRORS } from '../actions/actionTypes'

const initialState = {}

export default function(state = initialState, action) {
    const { payload, type } = action

    switch (type) {
        case GET_ERRORS:
            return { ...payload }

        case CLEAR_ERRORS:
            return initialState

        default:
            return state
    }
}
