import axios from 'axios'
import { GET_ALL_DEVELOPERS, GET_ERRORS } from './actionTypes'
import * as commonActions from './commonActions'

export function getDevelopers() {
    return function(dispatch) {
        dispatch(commonActions.loadingStatusOn())
        axios
            .get('/api/profile/developers')
            .then(res => {
                dispatch({ type: GET_ALL_DEVELOPERS, payload: res.data })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
            .then(() => dispatch(commonActions.loadingStatusOff()))
    }
}
