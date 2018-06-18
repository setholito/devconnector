import axios from 'axios'
import {
    CLEAR_CURRENT_PROFILE,
    CLEAR_ERRORS,
    GET_ERRORS,
    GET_USER_PROFILE,
    SET_CURRENT_USER
} from './actionTypes'
import * as commonActions from './commonActions'
import Url from '../constants/Url'

// PROFILE ================================

export function getCurrentProfile() {
    return function(dispatch) {
        dispatch(commonActions.loadingStatusOn())
        axios
            .get('/api/profile')
            .then(res => {
                const { data } = res
                dispatch({ type: GET_USER_PROFILE, profile: data })
            })
            .catch(err => dispatch({ type: GET_USER_PROFILE, profile: {} }))
            .then(() => dispatch(commonActions.loadingStatusOff()))
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

// GET PROFILE BY HANDLE ================================

export function getProfileByHandle(handle) {
    return function(dispatch) {
        dispatch(commonActions.loadingStatusOn())
        axios
            .get(`/api/profile/handle/${handle}`)
            .then(res => {
                dispatch({ type: GET_USER_PROFILE, profile: res.data })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
            .then(() => dispatch(commonActions.loadingStatusOff()))
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
                    type: GET_USER_PROFILE,
                    profile: res.data
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
                    type: GET_USER_PROFILE,
                    profile: res.data
                })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

// GITHUB ================================

export function getGitHubRepos(username) {
    return function(dispatch) {
        const config = {
            clientId: 'f9afc36db9e5d334efff',
            clientSecret: 'bff5a5a90e3d14e8337c8954c557662307fec3d8',
            count: 3,
            sort: 'created: asc'
        }

        axios
            .get(
                `https://api.github.com/users/${username}/repos?per_page=${
                    config.count
                }&sort=${config.sort}&client_id=${
                    config.clientId
                }&client_secret=${config.clientSecret}`
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))
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
