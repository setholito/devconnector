import {
    CLEAR_ERRORS,
    LOADING_STATUS_ON,
    LOADING_STATUS_OFF
} from './actionTypes'

export function loadingStatusOn() {
    return { type: LOADING_STATUS_ON }
}

export function loadingStatusOff() {
    return { type: LOADING_STATUS_OFF }
}

export function clearErrors() {
    return { type: CLEAR_ERRORS }
}
