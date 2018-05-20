import axios from 'axios'
import {
    CLEAR_CURRENT_PROFILE,
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_PROFILE,
    PROFILE_LOADING,
    SET_CURRENT_USER
} from './actionTypes'
import Url from '../constants/Url'

export function setProfileLoading() {
    return { type: PROFILE_LOADING }
}

export function getCurrentProfile() {
    return function(dispatch) {
        dispatch(setProfileLoading())
        axios
            .get('/api/profile')
            .then(res => {
                dispatch({ type: GET_PROFILE, payload: res.data })
            })
            .catch(err => dispatch({ type: GET_PROFILE, payload: {} }))
    }
}

export function clearCurrentProfile() {
    return { type: CLEAR_CURRENT_PROFILE }
}

export function createProfile(profileData, history) {
    return function(dispatch) {
        axios
            .post('/api/profile', profileData)
            .then(res => {
                dispatch({ type: CLEAR_ERRORS })
                history.push(Url.DASHBOARD)
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

export function updateProfile(profileData, history) {
    return function(dispatch) {
        axios
            .post('/api/profile', profileData)
            .then(res => {
                dispatch({ type: CLEAR_ERRORS })
                history.push(Url.DASHBOARD)
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

export function deleteProfileAndAccount(profileData, history) {
    return function(dispatch) {
        axios
            .delete('/api/profile')
            .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}
