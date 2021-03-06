import { combineReducers } from 'redux'

import authReducer from './authReducer'
import developerProfileReducer from './developerProfileReducer'
import developerReducer from './developerReducer'
import errorReducer from './errorReducer'
import loadingReducer from './loadingReducer'
import postReducer from './postReducer'
import userProfileReducer from './userProfileReducer'

export default combineReducers({
    auth: authReducer,
    developerProfile: developerProfileReducer,
    developers: developerReducer,
    errors: errorReducer,
    loading: loadingReducer,
    post: postReducer,
    userProfile: userProfileReducer
})
