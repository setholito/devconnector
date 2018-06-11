import axios from 'axios'
import { GET_ALL_DEVELOPERS, GET_ERRORS, TOGGLE_LOADING } from './actionTypes'
import Url from '../constants/Url'

export function setProfileLoading() {
    return { type: TOGGLE_LOADING }
}

export function getDevelopers() {
    return function(dispatch) {
        dispatch(setProfileLoading())
        axios
            .get('/api/profile/developers')
            .then(res => {
                dispatch({ type: GET_ALL_DEVELOPERS, payload: res.data })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}
