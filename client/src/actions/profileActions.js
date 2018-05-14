import axios from 'axios'
import {
    CLEAR_CURRENT_PROFILE,
    GET_PROFILE,
    PROFILE_LOADING
} from './actionTypes'

export function setProfileLoading() {
    return { type: PROFILE_LOADING }
}

export function getCurrentProfile() {
    return function(dispatch) {
        dispatch(setProfileLoading())
        axios
            .get('/api/profile')
            .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
            .catch(err => dispatch({ type: GET_PROFILE, payload: {} }))
    }
}

export function clearCurrentProfile() {
    return { type: CLEAR_CURRENT_PROFILE }
}
