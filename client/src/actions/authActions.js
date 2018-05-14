import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import actionTypes from './actionTypes'

export function setCurrentUser(decodedValue) {
    return { type: actionTypes.SET_CURRENT_USER, payload: decodedValue }
}

// REGISTER ==========
export function registerUser(userData, history) {
    return function(dispatch) {
        axios
            .post('/api/users/register', userData)
            .then(res => history.push('/login'))
            .catch(err =>
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: err.response.data
                })
            )
    }
}

// LOGIN ==========
export function loginUser(userData, history) {
    return function(dispatch) {
        axios
            .post('/api/users/login', userData)
            .then(res => {
                // Save to localStorage
                const { token } = res.data

                // Set token to localStorage
                localStorage.setItem('jwtToken', token)

                // Set token to Auth header
                setAuthToken(token)

                // Decode token to get user data
                const decoded = jwtDecode(token)

                // Set current user
                dispatch(setCurrentUser(decoded))
            })
            .catch(err =>
                dispatch({
                    type: actionTypes.GET_ERRORS,
                    payload: err.response.data
                })
            )
    }
}

// LOG OUT ==========
export function logoutUser() {
    return function(dispatch) {
        // Remove token from localStorage
        localStorage.removeItem('jwtToken')
        // Remove auth header for future requests
        setAuthToken(false)
        // Set current user to empty object to set isAuthenticated to false
        dispatch(setCurrentUser({}))
    }
}
