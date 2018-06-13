import { TOGGLE_LOADING } from '../actions/actionTypes'

const initialState = {
    status: false
}

export default function(state = initialState, action) {
    const { type } = action

    switch (type) {
        case TOGGLE_LOADING:
            return { status: !state.status }

        default:
            return state
    }
}
