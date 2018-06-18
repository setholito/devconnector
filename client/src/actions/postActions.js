import axios from 'axios'
import * as commonActions from './commonActions'
import { ADD_POST, DELETE_POST, GET_ERRORS, GET_POSTS } from './actionTypes'

export function getPosts() {
    return function(dispatch) {
        dispatch(commonActions.loadingStatusOn())
        axios
            .get('/api/posts')
            .then(res => {
                dispatch({ type: GET_POSTS, payload: res.data })
                dispatch(commonActions.clearErrors())
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
            .then(() => dispatch(commonActions.loadingStatusOff()))
    }
}

export function addPost(postData) {
    return function(dispatch) {
        dispatch(commonActions.loadingStatusOn())
        axios
            .post('/api/posts', postData)
            .then(res => {
                dispatch({ type: ADD_POST, payload: res.data })
                dispatch(commonActions.clearErrors())
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
            .then(() => dispatch(commonActions.loadingStatusOff()))
    }
}

export function deletePost(postId, index) {
    return function(dispatch) {
        axios
            .delete(`/api/posts/${postId}`)
            .then(() => {
                dispatch({ type: DELETE_POST, index })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}
