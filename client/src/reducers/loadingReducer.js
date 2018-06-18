import { LOADING_STATUS_ON, LOADING_STATUS_OFF } from '../actions/actionTypes'

const initialState = {
    status: false
}

export default function(state = initialState, action) {
    const { type } = action

    switch (type) {
        case LOADING_STATUS_ON:
            return { status: true }

        case LOADING_STATUS_OFF:
            return { status: false }

        default:
            return state
    }
}
