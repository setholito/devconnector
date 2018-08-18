import axios from 'axios'
import * as commonActions from './commonActions'
import {
    ADD_POST,
    COMMENT_ON_POST,
    DELETE_POST,
    DELETE_COMMENT,
    GET_ERRORS,
    GET_POST,
    GET_POSTS
} from './actionTypes'

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

export function getPost(id) {
    return function(dispatch) {
        dispatch(commonActions.loadingStatusOn())
        axios
            .get(`/api/posts/${id}`)
            .then(res => {
                dispatch({ type: GET_POST, payload: res.data })
                dispatch(commonActions.clearErrors())
            })
            .catch(err => dispatch({ type: GET_POST, payload: {} }))
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

export function addComment(postData, postId) {
    return function(dispatch) {
        axios
            .post(`/api/posts/${postId}/comment`, postData)
            .then(res => {
                dispatch(commonActions.clearErrors())
                dispatch({ type: COMMENT_ON_POST, payload: res.data })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
            .then(() => dispatch(commonActions.loadingStatusOff()))
    }
}

export function deleteComment(postId, commentId, index) {
    return function(dispatch) {
        axios
            .delete(`/api/posts/${postId}/comment/${commentId}`)
            .then(res => {
                dispatch(commonActions.clearErrors())
                dispatch({ type: DELETE_COMMENT, payload: commentId })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
            .then(() => dispatch(commonActions.loadingStatusOff()))
    }
}

export function likePost(postId) {
    return function(dispatch) {
        axios
            .post(`/api/posts/like/${postId}`)
            .then(res => {
                dispatch(getPosts())
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

export function unLikePost(postId) {
    return function(dispatch) {
        axios
            .post(`/api/posts/unlike/${postId}`)
            .then(res => {
                dispatch(getPosts())
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}

export function deletePost(postId, index) {
    return function(dispatch) {
        axios
            .delete(`/api/posts/${postId}`)
            .then(() => {
                dispatch({ type: DELETE_POST, payload: index })
            })
            .catch(err =>
                dispatch({ type: GET_ERRORS, payload: err.response.data })
            )
    }
}
