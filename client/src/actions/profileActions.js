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

// PROFILE ================================

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

// EDUCATION ================================

export function addEducation(eduData, history) {
    return function(dispatch) {
        axios
            .post('/api/profile/education', eduData)
            .then(res => {
                history.push(Url.DASHBOARD)
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

export function deleteEducation(id) {
    return function(dispatch) {
        axios
            .delete(`/api/profile/education/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

// EXPERIENCE ================================

export function addExperience(expData, history) {
    return function(dispatch) {
        axios
            .post('/api/profile/experience', expData)
            .then(res => {
                history.push(Url.DASHBOARD)
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

export function deleteExperience(id) {
    return function(dispatch) {
        axios
            .delete(`/api/profile/experience/${id}`)
            .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

// DELETE PROFILE AND ACCOUNT ================================

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
