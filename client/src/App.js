import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'

import * as authActions from './actions/authActions'
import * as userProfileActions from './actions/userProfileActions'

import PrivateRoute from './components/common/PrivateRoute'
import Url from './constants/Url'

import AuthLogin from './views/auth/AuthLogin'

import UserProfileCreate from './views/user-profile/UserProfileCreate'
import UserProfileDisplay from './views/user-profile/UserProfileDisplay'
import UserProfileEdit from './views/user-profile/UserProfileEdit'

import Dashboard from './views/dashboard/Dashboard'
import EducationAdd from './views/education/EducationAdd'
import ExperienceAdd from './views/experience/ExperienceAdd'

import Footer from './components/layout/Footer'
import Landing from './views/landing/Landing'
import Navbar from './components/layout/Navbar'

import AuthRegister from './views/auth/AuthRegister'

import DeveloperProfileDisplay from './views/developer-profile/DeveloperProfileDisplay'
import Developers from './views/developers/Developers'

import FeedContainer from './views/feed/FeedContainer'

import PostDisplay from './views/post/PostDisplay'

import NotFound from './views/system/NotFound'

import './app.css'

// Check for token
if (localStorage.jwtToken) {
    // Set the auth token header auth
    setAuthToken(localStorage.jwtToken)
    // Decode token and get user info and exp
    const decoded = jwtDecode(localStorage.jwtToken)
    // Set user and isAuthenticated
    store.dispatch(authActions.setCurrentUser(decoded))

    // Check for expired token
    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(authActions.logoutUser())

        // Clear out current profile
        store.dispatch(userProfileActions.clearCurrentProfile())

        // Redirect to loginUser
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main role="main">
                            <Switch>
                                <Route
                                    component={Landing}
                                    exact
                                    path={Url.HOME}
                                />
                                <Route
                                    component={AuthLogin}
                                    exact
                                    path={Url.LOGIN}
                                />
                                <Route
                                    component={AuthRegister}
                                    exact
                                    path={Url.REGISTER}
                                />
                                <Route
                                    component={DeveloperProfileDisplay}
                                    exact
                                    path={Url.USER_PROFILE_BY_HANDLE}
                                />
                                <Route
                                    component={Developers}
                                    exact
                                    path={Url.DEVELOPERS}
                                />
                                <PrivateRoute
                                    component={FeedContainer}
                                    exact
                                    path={Url.FEED}
                                />
                                <PrivateRoute
                                    component={Dashboard}
                                    exact
                                    path={Url.DASHBOARD}
                                />
                                <PrivateRoute
                                    component={UserProfileCreate}
                                    exact
                                    path={Url.USER_PROFILE_CREATE}
                                />
                                <PrivateRoute
                                    component={UserProfileDisplay}
                                    exact
                                    path={Url.USER_PROFILE_DISPLAY}
                                />
                                <PrivateRoute
                                    component={UserProfileEdit}
                                    exact
                                    path={Url.USER_PROFILE_EDIT}
                                />
                                <PrivateRoute
                                    component={EducationAdd}
                                    exact
                                    path={Url.ADD_EDUCATION}
                                />
                                <PrivateRoute
                                    component={ExperienceAdd}
                                    exact
                                    path={Url.ADD_EXPERIENCE}
                                />
                                <PrivateRoute
                                    component={PostDisplay}
                                    exact
                                    path={Url.POST_DISPLAY}
                                />
                                <Route
                                    path={Url.NOT_FOUND}
                                    component={NotFound}
                                />
                            </Switch>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
