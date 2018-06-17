import axios from 'axios'
import { ADD_POST, GET_ERRORS, GET_POSTS } from './actionTypes'

export function getPosts() {
    return function(dispatch) {
        axios
            .get('/api/posts')
            .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
            .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
    }
}

export function addPost(postData) {
    return function(dispatch) {
        axios
            .post('/api/posts', postData)
            .then(res => dispatch({ type: ADD_POST, payload: res.data }))
            .catch(err => dispatch({ type: GET_ERRORS, payload: err }))
    }
}
